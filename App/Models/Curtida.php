<?php
namespace App\Models;
use MF\Model\Model;
use PDO;

class Curtida extends Model{

    private $id;
    private $idPost;
    private $idUsuarioCurtiu;
    private $idComentario;

       
    public function __get($name)
    { 
         return $this->$name;
    }

    public function __set($name, $value)
    {
        return $this->$name=$value;
    }
 
 

    public function curtir()
    {
         $query="insert into curtidaspostagem (id_postagem,id_usuario_curtiu) values (?,?)";
        $stmt=$this->db->prepare($query);
        $stmt->bindValue(1,$this->__get('idPost'));
        $stmt->bindValue(2,$this->__get('idUsuarioCurtiu'));

        $success=$stmt->execute();

        if($success){
            return true;
          }else{
            die(header(utf8_decode('HTTP/1.0 401 nao foi possivel Curtir o Post.')));

        }

         
    }

        
    public function descurtirComentario(){
        $query="delete from curtidascomentarios where id_comentario=? and id_usuario_curtiu=? limit 1";
        $stmt=$this->db->prepare($query);
        $stmt->bindValue(1,$this->__get('idComentario'));
        $stmt->bindValue(2,$this->__get('idUsuarioCurtiu'));

        $success=$stmt->execute();

        if($success){
            return true;
         }else{
            die(header(utf8_decode('HTTP/1.0 401 nao foi possivel Curtir o Post.')));

        }
    }
    public function curtirComentario()
    {
         $query="insert into curtidascomentarios (id_comentario,id_usuario_curtiu) values (?,?)";
        $stmt=$this->db->prepare($query);
        $stmt->bindValue(1,$this->__get('idComentario'));
        $stmt->bindValue(2,$this->__get('idUsuarioCurtiu'));

        $success=$stmt->execute();

        if($success){
            return true;
          }else{
            die(header(utf8_decode('HTTP/1.0 401 nao foi possivel Curtir o Post.')));

        }

         
    }

        
    public function descurtir(){
        $query="delete from curtidaspostagem where id_postagem=? and id_usuario_curtiu=? limit 1";
        $stmt=$this->db->prepare($query);
        $stmt->bindValue(1,$this->__get('idPost'));
        $stmt->bindValue(2,$this->__get('idUsuarioCurtiu'));

        $success=$stmt->execute();

        if($success){
            return true;
         }else{
            die(header(utf8_decode('HTTP/1.0 401 nao foi possivel Curtir o Post.')));

        }
    }

    public function getTotalCurtida($idPost){
         $query="SELECT count(*) as totCurtidas FROM `curtidaspostagem` WHERE id_postagem= ?";
        $stmt=$this->db->prepare($query);
        $stmt->bindValue(1,$idPost);
 
        $success=$stmt->execute();
      

        if($success){
            return $stmt->fetch(PDO::FETCH_ASSOC)['totCurtidas'];
         }else{
             return 0;
         }
    }
    public function getTotalCurtidaComentario($idComentario){
         $query="SELECT count(*) as totCurtidas FROM `curtidascomentarios` WHERE id_comentario= ?";
        $stmt=$this->db->prepare($query);
        $stmt->bindValue(1,$idComentario);
 
        $success=$stmt->execute();
      

        if($success){
            return $stmt->fetch(PDO::FETCH_ASSOC)['totCurtidas'];
         }else{
             return 0;
         }
    }


    
    public  function verificaCurtida($idPost,$idUsuarioCurtiu){

        $query="select * from curtidaspostagem where (id_postagem=? and id_usuario_curtiu=?) limit 1";
        $stmt=$this->db->prepare($query);
        $stmt->bindValue(1,$idPost);
        $stmt->bindValue(2,$idUsuarioCurtiu);

        $success=$stmt->execute();
        $curtiu=$stmt->fetchAll(PDO::FETCH_ASSOC);


      
        if(count($curtiu)>0){
           return true;
         }else{
           return false;

        }


    }
   function verificacurtidaComentario($idComentario,$idUsuarioCurtiu){
        $query="select * from curtidascomentarios where (id_comentario=? and id_usuario_curtiu=?) limit 1";
        $stmt=$this->db->prepare($query);
        $stmt->bindValue(1,$idComentario);
        $stmt->bindValue(2,$idUsuarioCurtiu);

        $success=$stmt->execute();
        $curtiu=$stmt->fetchAll(PDO::FETCH_ASSOC);


    
        if(count($curtiu)>0){
          return true;
        }else{
          return false;

        }
   }


}