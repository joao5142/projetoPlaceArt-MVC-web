<?php
//recursos
namespace App\Models;

use MF\Model\Model;
use PDO;

class Conversa extends Model
{
     private int  $id;
     private int $mainUser;
     private string $unread;
     private string  $email;
     private string $modification;
     private string $creation;


     public function __get($name)
     {
          return $this->$name;
     }

     public function __set($name, $value)
     {
          return $this->$name = $value;
     }

     public function inserir($mainUser,$otherUser)
     {

          $query = "select * from  conversa where (mainUser=? and otherUser= ?) limit 1";
          $stmt = $this->db->prepare($query);
          $stmt->bindValue(1, $mainUser);
          $stmt->bindValue(2, $otherUser);
          $success = $stmt->execute();

          $conversas = $stmt->fetchAll(PDO::FETCH_ASSOC);

          if (count($conversas) < 1) {
               $createChat = $this->db->prepare("INSERT INTO  conversa (mainUser,otherUser,unread,creation) values (?,?,'n',NOW())");
               $createChat->bindValue(1, $mainUser);
               $createChat->bindValue(2, $otherUser);
               $success1 = $createChat->execute();

               $createChat2 = $this->db->prepare("INSERT INTO conversa (mainUser,otherUser,unread,creation) values (?,?,'y',NOW())");
               $createChat2->bindValue(1, $otherUser);
               $createChat2->bindValue(2, $mainUser);
               $success = $createChat2->execute();

               if (!$success && !$success1) {
                    die(header('HTTP/1.0 401 Ocorreu um error ao criar a mensagem'));
               }
          } else {
               $update =$this->db->prepare("update conversa set unread = 'y' where (mainUser = ? and otherUser =?)");
               $update->bindValue(1, $otherUser);
               $update->bindValue(2, $mainUser);
               $update->execute();

               $success = $update->execute();

               if (!$success) {
                    die(header('HTTP/1.0 401 Ocorreu um error ao atualizar a mensagem 74'));
               }
          }
     }

     public function atualizar()
     {
     }
     public function deletar()
     {
          $query="delete from conversa where mainUser= ?";
          $stmt=$this->db->prepare($query);
          $stmt->bindValue(1,$this->__get('mainUser'));
          $success=$stmt->execute();
  
          return $success;
     }

     public function getById()
     {
     }

  
     public function getAll()
     {
          $query="select u.id,u.username,u.picture,c.unread from conversa as c left join usuario as u on u.id=otherUser where mainUser=?";
          $stmt = $this->db->prepare($query);
          $stmt->bindValue(1, $this->__get('mainUser'));
          $stmt->execute();
          $conversas= $stmt->fetchAll(PDO::FETCH_ASSOC);
          return $conversas;
     }
}
