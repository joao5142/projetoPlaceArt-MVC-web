<?php

namespace App\Models;
use MF\Model\Model;
use PDO;

class Usuario extends Model
{
     private   $id;
     private   $username;
     private   $name;
     private   $email;
     private   $password;
     private   $picture;
     private   $token;
     private   $secure;
     private   $creation;
     private   $rpPass;


     public function __get($attr)
     {
          return $this->$attr;
     }

     public function __set($attr, $value)
     {
          return $this->$attr = $value;
     }

     public function validarCadastro(){
          print_r($this);
          if($this->__get('password')!=$this->__get('rpPass')){
               die(header(utf8_decode('HTTP/1.0 401  Senhas não são iguais.')));

          }else if ($this->__get('name') == "" || $this->__get('username') == "" || $this->__get('email') == "") {
               die(header(utf8_decode('HTTP/1.0 401 Campos Invalidos')));
          }else {
               $user = $this->getByUserNameOrEmail();

               if (count($user)>=1) {
                    die(header(utf8_decode('HTTP/1.0 401 Username ou Email já está cadastrado!Por favor tente Novamente.')));
               }

               
          }

     }
     public function inserir()
     {
          $this->validarCadastro();

          //se passar continua com o cadastro

          $password=password_hash($this->__get('password'),PASSWORD_DEFAULT);
          $token=bin2hex(openssl_random_pseudo_bytes(20));
          $secure= rand(1000000,9999999999);

          $query='insert into usuario 
           (name,username,email,password,token,secure,picture,creation,online)   
           values(?,?,?,?,?,?,default,now(),now())';

          $stmt=$this->db->prepare($query);
          $stmt->bindValue(1,$this->__get('name'));
          $stmt->bindValue(2,$this->__get('username'));
          $stmt->bindValue(3,$this->__get('email'));
          $stmt->bindValue(4,$password);
          $stmt->bindValue(5,$token);
          $stmt->bindValue(6,$secure);

          $success=$stmt->execute();

          if($success){
               return true;
          }


     }

     public function atualizar()
     {
     }
     public function deletar()
     {
     }
     public function getUsernamePicture(){
          $query="select name,picture from usuario where (id=?) limit 1";
          $stmt=$this->db->prepare($query);
          $stmt->bindValue(1,$this->__get('id')); 
          $success=$stmt->execute();

          $user= $stmt->fetch(\PDO::FETCH_ASSOC);
          return $user;
     }

     public function getById()
     {
          $query="select * from usuario where (id=?) limit 1";
          $stmt=$this->db->prepare($query);
          $stmt->bindValue(1,$this->__get('id')); 
          $success=$stmt->execute();

          $user= $stmt->fetch(\PDO::FETCH_ASSOC);
          return $user;
     }
     public function getQuemSeguir(){
          $offset = rand(0,11);
          $query="select u.name,u.picture from usuario as u  limit 4 offset $offset";
          $stmt= $this->db->prepare($query);
  
          $stmt->execute();
          $postagens = $stmt->fetchAll(PDO::FETCH_ASSOC);
  
          if(count($postagens)>=1){
              return $postagens;
          }else{
              die(header(utf8_decode('HTTP/1.0 401 Nao foi quem seguir')));
          }
      }

     public function getByUserNameOrEmail()
     {
          $query = "select * from usuario where username= ? or email=? limit 1";
          $stmt=$this->db->prepare($query);
          $stmt->bindValue(1, $this->__get('username'));
          $stmt->bindValue(2, $this->__get('email'));
          $stmt->execute();

          return $stmt->fetchAll(\PDO::FETCH_ASSOC);
     }

     public function getAll($valor,$offset)
     {
          if($valor==""){
               $valor="-340929";
          }
          $query="select * from usuario where name like '$valor%' limit 4 offset $offset";
          $stmt=$this->db->prepare($query);
          $success=$stmt->execute();

          $usuarios= $stmt->fetchAll(\PDO::FETCH_ASSOC);

      
          return $usuarios;
          

     }

     public function autenticar()
     {
          
          $email=$this->__get('email');
          $senha=$this->__get('password');

          if($email==""|| $senha ==""){
               return false;
          }else {
               echo 'entrou no select';
               $query="select * from usuario where email=? limit 1";
               $stmt=$this->db->prepare($query);
               $stmt->bindValue(1,$email);
               $success=$stmt->execute();

               $user= $stmt->fetch(\PDO::FETCH_ASSOC);

                
              
               if((isset($user['id']) && $user['id']!="") && password_verify($senha,$user['password'])){
                         session_start();
                         $_SESSION['id']=$user['id'];
                         $_SESSION['username']=$user['username'];

                         setcookie("id",$user['id'],time()+(10*365*24*60*60));
                         setcookie("token",$user['token'],time()+(10*365*24*60*60));
                         setcookie("secure",$user['secure'],time()+(10*365*24*60*60));
                         
                         return true;

                          
               }else{
                    return false;
               }
          
          }
     }

  

     public function updatePic($imagename){
          $query='update usuario set picture = ? where id = ?';
          $stmt=$this->db->prepare($query);
          $stmt->bindValue(1,$imagename);
          $stmt->bindValue(2,$this->__get('id'));
          $success=$stmt->execute();

          return $success;

     }

     public function getByName($value){
          $query='select name,username,picture,online,creation from usuario where name like =?';
          $stmt=$this->db->prepare($query);
          $stmt->bindValue(1,$value."%");
          $stmt->bindValue(2,$this->__get('id'));
          $success=$stmt->execute();

          return $success;

     }

     public function getTotSeguindo(){
          $totSeguindo=0;
          $query='select count(*) as totSeguindo from usuario_seguindo where id_usuario = ?';
          $stmt=$this->db->prepare($query);
          $stmt->bindValue(1,$this->__get('id'));
          $success=$stmt->execute();
          $totSeguindo=$stmt->fetch(PDO::FETCH_ASSOC)['totSeguindo'];

          return $totSeguindo;


     }
     public function getTotSeguidores(){
          $totSeguidores=0;
          $query='select count(*) as totSeguidores from usuario_seguindo where id_usuario_seguindo = ?';
          $stmt=$this->db->prepare($query);
          $stmt->bindValue(1,$this->__get('id'));
          $success=$stmt->execute();
          $totSeguidores=$stmt->fetch(PDO::FETCH_ASSOC)['totSeguidores'];

          return $totSeguidores;
     }
}
