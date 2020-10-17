<?php
namespace App\Models;

use Exception;
use MF\Model\Model;
use PDO;

  class Postagem extends Model{
      private $idPostagem='';
      private $id_usuario;
      private $textoPostagem;
      private $arquivo;
      private $dataPostagem;
      private $vender=0;
      
 

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
        try{

       
        echo 'chegamos em inserir postagem';
        $query="insert into postagens (id_usuario,textoPostagem,arquivo,data,vender) values (?,?,?,now(),?)";
        $stmt=$this->db->prepare($query);
        $stmt->bindValue(1,$this->__get('id_usuario'));
        $stmt->bindValue(2,$this->__get('textoPostagem'));
        if($this->__get('arquivo') !=''){
            $stmt->bindValue(3,$this->__get('arquivo'));
        }else{
            $stmt->bindValue(3,'');
        }
      
        $stmt->bindValue(4,$this->__get('vender'));

        $success=$stmt->execute();

        if($success){
            echo 'sucesso ao inserir postagem';
         }else{
             echo'erroInserir postagem';
             die(header(utf8_decode('HTTP/1.0 401 Nao foi possivel criar Postagem.'+$success)));

        }

    }catch(Exception $e){
        echo $e;
    }

         
    }

    public function atualizar(){

    }
    public function deletar(){
        $query="delete from postagens where id= ?";
        $stmt=$this->db->prepare($query);
        $stmt->bindValue(1,$this->__get('idPostagem'));
        $success=$stmt->execute();

        return $success;

    }
    public function deletarByUser(){
        $query="delete from postagens where id_usuario= ?";
        $stmt=$this->db->prepare($query);
        $stmt->bindValue(1,$this->__get('id_usuario'));
        $success=$stmt->execute();

        return $success;

    }

    public function getById($offset){
        $query="select p.id as postagemId,u.id as usuarioId,u.name,u.picture,p.textoPostagem,p.data,p.arquivo,(SELECT count(*) FROM `curtidaspostagem` WHERE id_postagem=p.id) as curtidas from postagens as p left join usuario as u on u.id=p.id_usuario where u.id= ? order by p.data desc limit 10 offset $offset";
        $stmt= $this->db->prepare($query);
        $stmt->bindValue(1,$this->__get('id_usuario'));

        $stmt->execute();
        $postagens = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if(count($postagens)>=1){
            return $postagens;
        }else{
            return array();
            die(header(utf8_decode('HTTP/1.0 401 Nao foi possivel recuperar as postagens')));
        }

    }
    public function getAll($offset){
        $query="select p.id as postagemId,u.id as usuarioId,u.name,u.picture,p.textoPostagem,p.data,p.arquivo,(SELECT count(*) FROM `curtidaspostagem` WHERE id_postagem=p.id) as curtidas from postagens as p left join usuario as u on u.id=p.id_usuario where vender = 0 order by p.data desc limit 10 offset $offset";
        $stmt= $this->db->prepare($query);

        $stmt->execute();
        $postagens = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if(count($postagens)>=1){
            return $postagens;
        }else{
            die(header(utf8_decode('HTTP/1.0 401 Nao foi possivel recuperar as postagens')));
        }


    }
    public function getAllPostVendas($offset){
        $query="select p.id as postagemId,u.name,u.picture,p.textoPostagem,p.data,p.arquivo,(SELECT count(*) FROM `curtidaspostagem` WHERE id_postagem=p.id) as curtidas from postagens as p left join usuario as u on u.id=p.id_usuario where vender = 1 order by p.data desc limit 10 offset $offset";
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