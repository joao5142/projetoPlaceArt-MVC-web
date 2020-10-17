<?php
//recursos
namespace App\Models;

use MF\Model\Container;
use MF\Model\Model;
use PDO;


   class Chat extends Model{
        private int  $id;
        private int  $sender;
        private int  $reciever;
        private string $message;
        private string $imageOrVideo;
        private string $creation;
    

        public function construct()
        {
            
        }

        public function __get($name)
        { 
             return $this->$name;
        }

        public function __set($name, $value)
        {
            return $this->$name=$value;
        }

        public function criarChat()  {
        
          session_start();
     
    if(isset($_POST['message']) && isset($_POST['otherUser'])){

     $image="";
    if($_FILES['image']['error']<=0 && $_POST['otherUser'] != ""){
                    //nome aleatorio para imagem
            $image= $_SESSION['username']."_MESSAGE_".rand(999,999999).$_FILES['image']['name'];
            //onde a imagem ta guardada temporariamente
            $imagetmp=$_FILES['image']['tmp_name'];
            //o caminho para a imagem
            $imagePath="../public/img/uploads/conversas/";

            //verifica se o upload foi feito 
            if(is_uploaded_file($imagetmp)){
                //move a imagem para o imagePath e verifica se foi movida
                if(move_uploaded_file($imagetmp,$imagePath.$image)){
                    //recebe como parametro o caminho  com o nome

                   
                }else{
                    die(header('HTTP/1.0 401 Erro ao Mover Imagem'));
                }
            }else{
                die(header('HTTP/1.0 401 Erro no Upload'));
            }

      }else if($_POST['message']=="" && $_POST['otherUser'] != ""){
         die(header('HTTP/1.0 401 Escreva Uma menssagem'));
      }

 
    $conversa=Container::getModel('conversa');
    $conversa->inserir($_SESSION['id'],$_POST['otherUser']);

    $createChat=$this->db->prepare("INSERT INTO chat (`sender`,`reciever`,`message`,`imageOrVideo`,`creation`) values (?,?,?,?,NOW())");
    $createChat->bindValue(1,$_SESSION['id']);
    $createChat->bindValue(2,$_POST['otherUser']);
    $createChat->bindValue(3,$_POST['message']);
    $createChat->bindValue(4,$image);
    $success=$createChat->execute();

    if(!$success){
        die(header('HTTP/1.0 401 Ocorreu um error ao enviar a mensagem linha 87'));

    }



    }else{
        die(header('HTTP/1.0 401 Falta de parametros na chamada'));

    }

            
}

        public function atualizar(){

        }
        public function deletar(){

        }

        public function getById(){

        }
        public function getAll(){
               
            session_start();
            $stmt=$this->db->prepare("select id as idMensagem,sender,imageOrVideo,message from chat where (sender = :userid and reciever =:uid) or (reciever = :userid and sender =:uid) order by id");
            $stmt->bindValue(':userid',$this->__get('reciever'));
            $stmt->bindValue(':uid',$_SESSION['id']);
            
            $sucess=  $stmt->execute();
            $result=  $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
   
          
            
    

        }

        public function getUltimaMensagem(){
            session_start();
            $stmt=$this->db->prepare("select id as idMensagem,sender,imageOrVideo,message from chat where (sender = :userid and reciever =:uid) or (reciever = :userid and sender =:uid)order by chat.creation desc limit 1");
            $stmt->bindValue(':userid',$this->__get('reciever'));
            $stmt->bindValue(':uid',$_SESSION['id']);
            
            $sucess=  $stmt->execute();
            $result=  $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
   
       }

        public function autenticar(){
            
        }

   }