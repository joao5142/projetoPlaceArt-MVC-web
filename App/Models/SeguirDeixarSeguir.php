<?php
namespace App\Models;

use Exception;
use MF\Model\Model;
use PDO;

  class SeguirDeixarSeguir extends Model{
    private $id_usuario;
    private $id_usuario_seguindo;

    public function __get($name)
    { 
         return $this->$name;
    }

    public function __set($name, $value)
    {
        return $this->$name=$value;
    }

    public function seguir(){
        $query= 'insert into usuario_seguindo (id_usuario,id_usuario_seguindo) values(?,?)';
        $stmt= $this->db->prepare($query);
        $stmt->bindValue(1,$this->__get('id_usuario'));
        $stmt->bindValue(2,$this->__get('id_usuario_seguindo'));
        $stmt->execute();


    }
    public function deixarseguir(){
       $query= 'delete from usuario_seguindo where id_usuario= ? and id_usuario_seguindo = ?';
       $stmt= $this->db->prepare($query);
       $stmt->bindValue(1,$this->__get('id_usuario'));
       $stmt->bindValue(2,$this->__get('id_usuario_seguindo'));
       $stmt->execute();
   }
    public function verificaseguindo(){
       $query= 'select * from usuario_seguindo where id_usuario= ? and id_usuario_seguindo = ? limit 1';
       $stmt= $this->db->prepare($query);
       $stmt->bindValue(1,$this->__get('id_usuario'));
       $stmt->bindValue(2,$this->__get('id_usuario_seguindo'));
       $sucess= $stmt->execute();

       $users=$stmt->fetchAll(PDO::FETCH_ASSOC);

       if(count($users)>=1){
           return true;
       }
       return false;
   }

  }