<?php
namespace App\Models;
use MF\Model\Model;
use PDO;

  class Comentario extends Model{
      private $id;
      private $id_usuario_comentou;
      private $id_postagem;
      private $textoComentario;
      private $arquivoComentario='';


    public function __get($name)
    { 
         return $this->$name;
    }

    public function __set($name, $value)
    {
        return $this->$name=$value;
    }

    public function inserir()
    {
         $query="insert into comentarios (id_usuario_comentou,id_postagem,textoComentario,arquivoComentario,horaComentario) values (?,?,?,?,now())";
        $stmt=$this->db->prepare($query);
        $stmt->bindValue(1,$this->__get('id_usuario_comentou'));
        $stmt->bindValue(2,$this->__get('id_postagem'));
        $stmt->bindValue(3,$this->__get('textoComentario'));
        if($this->arquivoComentario !=''){
            $stmt->bindValue(4,$this->__get('arquivoComentario'));
        }else{
            $stmt->bindValue(4,'');

        }

        $success=$stmt->execute();

        if($success){
           
         }else{
            die(header(utf8_decode('HTTP/1.0 401 Nao foi possivel criar comentario.'+$success)));

        }

         
    }

    public function atualizar(){

    }
    public function deletar(){

    }

    public function getById(){
        $query="select * from comentarios where (id=?) limit 1";
        $stmt=$this->db->prepare($query);
        $stmt->bindValue(1,$this->__get('id')); 
        $success=$stmt->execute();

        $comentario= $stmt->fetch(\PDO::FETCH_ASSOC);
        return $comentario;

    }
    public function getAll($idPost){
        $query="select comentarios.id,u.name as nomeUsuario,u.picture as pictureUsuario,textoComentario,arquivoComentario,horaComentario from comentarios left join usuario as u on u.id=id_usuario_comentou
        where id_postagem = ?  order by horaComentario desc limit 2";
        $stmt= $this->db->prepare($query);
        $stmt->bindValue(1,$idPost);
        $stmt->execute();
        $comentarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if(count($comentarios)>=1){
            return $comentarios;
        }else{
           return array();
        }


    }
    public function getSeuComentario($idPost){
        $query="select comentarios.id,u.name as nomeUsuario,u.picture as pictureUsuario,textoComentario,arquivoComentario,horaComentario from comentarios left join usuario as u on u.id=id_usuario_comentou
        where id_postagem = ?  order by horaComentario desc limit 1";
        $stmt= $this->db->prepare($query);
        $stmt->bindValue(1,$idPost);
        $stmt->execute();
        $comentarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if(count($comentarios)>=1){
            return $comentarios;
        }else{
           return array();
        }


    }


    public function getAllOffset($idPost,$offset){
    
        $query="select u.name as nomeUsuario,u.picture as pictureUsuario,textoComentario,arquivoComentario,horaComentario from comentarios left join usuario as u on u.id=id_usuario_comentou
        where id_postagem = ?  order by horaComentario desc limit 2 offset $offset";
        $stmt= $this->db->prepare($query);
        $stmt->bindValue(1,$idPost);
        $stmt->execute();
        $comentarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if(count($comentarios)>=1){
            return $comentarios;
        }else{
           return array();
        }


    }


    public function getTotComentarios($idPost){
        $tot=0;
        $query="select count(*) as totComentarios from comentarios where id_postagem = ?";
        $stmt= $this->db->prepare($query);
        $stmt->bindValue(1,$idPost);

        $stmt->execute();
        $tot = $stmt->fetch(PDO::FETCH_ASSOC)['totComentarios'];
        return $tot;
    }

  //função timing
  function timing ($time)
  {
    date_default_timezone_set('America/Sao_Paulo');
      $time = time()-$time; // to get the time since that moment
      $time = ($time<1) ? 1 : $time;
      $tokens = array (
          31536000 => 'ano',
          2592000 => 'mês',
          604800 => 'semana',
          86400 => 'dia',
          3600 => 'hora',
          60 => 'minuto',
          1 => 'segundo'
      );

      foreach ($tokens as $unit => $text) {
          if ($time < $unit) {
              continue;
           }

          $numberOfUnits = floor($time / $unit);
          if ($text == "segundo") {
              return "agora mesmo";
          }
          return $numberOfUnits.' '.$text.(($numberOfUnits>1)?'s':'');
      }

  }


  function timming2($date){
    $agora = new \DateTime();
    $data = new \DateTime($date);

    $difference =$this->format_interval($agora->diff($data));

    return $difference;
    
 
  }

  function format_interval(\DateInterval $interval) {
    $result = "";
    if ($interval->y) { $result = $interval->format("%y anos "); return $result; }
    if ($interval->m) { $result = $interval->format("%m mês "); return $result; }
    if ($interval->d) { $result = $interval->format("%d dias ");  return $result;}
    if ($interval->h) { $result = $interval->format("%h horas "); return $result; }
    if ($interval->i) { $result = $interval->format("%i minutos ");  return $result;}
    if ($interval->s) { $result = $interval->format("%s segundos ");  return $result;}

  
}


 
  }

