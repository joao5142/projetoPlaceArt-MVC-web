<?php
namespace App\Models;
use MF\Model\Model;
use PDO;

class DenunciaPostagem extends Model{

    private $id;
    private $id_postagem;
    private $mensagem;
    private $arquivo;

       
    public function __get($name)
    { 
         return $this->$name;
    }

    public function __set($name, $value)
    {
        return $this->$name=$value;
    }
 

    public function salvardenuncia(){
        $query="insert into denunciarpostagem (id_postagem,mensagem) values (?,?)";
        $stmt=$this->db->prepare($query);
        $stmt->bindValue(1,$this->__get('id_postagem'));
        $stmt->bindValue(2,$this->__get('mensagem'));

        $success=$stmt->execute();

        if($success){
            return true;
          }else{
            die(header(utf8_decode('HTTP/1.0 401 nao foi possivel denunciar a Postagem.'.$success)));

        }
    }
 

}
