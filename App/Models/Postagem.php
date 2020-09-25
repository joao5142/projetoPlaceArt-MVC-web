<?php
namespace App\Models;
use MF\Model\Model;
use PDO;

  class Postagem extends Model{
      private $idPostagem='';
      private $id_usuario;
      private $textoPostagem;
      private $arquivo;
      private $dataPostagem;
      
 

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
        echo 'chegamos em inserir postagem';
        $query="insert into postagens (id_usuario,textoPostagem,arquivo,data) values (?,?,?,now())";
        $stmt=$this->db->prepare($query);
        $stmt->bindValue(1,$this->__get('id_usuario'));
        $stmt->bindValue(2,$this->__get('textoPostagem'));
        if($this->arquivo !=''){
            $stmt->bindValue(3,$this->__get('arquivo'));
        }else{
            $stmt->bindValue(3,'');
        }
      

        $success=$stmt->execute();

        if($success){
            echo 'sucesso ao inserir postagem';
         }else{
            die(header(utf8_decode('HTTP/1.0 401 Nao foi possivel criar Postagem.'+$success)));

        }

         
    }

    public function atualizar(){

    }
    public function deletar(){

    }

    public function getById(){

    }
    public function getAll($offset){
        $query="select p.id as postagemId,u.name,u.picture,p.textoPostagem,p.data,p.arquivo,(SELECT count(*) FROM `curtidaspostagem` WHERE id_postagem=p.id) as curtidas from postagens as p left join usuario as u on u.id=p.id_usuario order by p.data desc limit 10 offset $offset";
        $stmt= $this->db->prepare($query);

        $stmt->execute();
        $postagens = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if(count($postagens)>=1){
            return $postagens;
        }else{
            die(header(utf8_decode('HTTP/1.0 401 Nao foi possivel recuperar as postagens')));
        }


    }

    public function getTotPostagens($idUsuario){
        $tot=0;
        $query="select count(*) as totPostagens from postagens where id_usuario = ?";
        $stmt= $this->db->prepare($query);
        $stmt->bindValue(1,$idUsuario);

        $stmt->execute();
        $tot = $stmt->fetch(PDO::FETCH_ASSOC)['totPostagens'];
        return $tot;
    }

 
  }





?>