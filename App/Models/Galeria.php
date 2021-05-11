<?php
//recursos
namespace App\Models;

use MF\Model\Container;
use MF\Model\Model;
use PDO;


   class Galeria extends Model{
        private $imagem;
        private $posicao;
        private $usuario;

        public function __get($name)
        { 
            return $this->$name;
        }

        public function __set($name, $value)
        {
            return $this->$name=$value;
        }
        public function alterarImagem(){
            $query="update galeria set imagem = ? where usuario = ? and posicao = ?";
            $stmt=$this->db->prepare($query);
            $stmt->bindValue(1,$this->__get('imagem'));
            $stmt->bindValue(2,$this->__get('usuario'));
            $stmt->bindValue(3,$this->__get('posicao'));
            $succes=$stmt->execute();

            return $succes;
        
        }
        public function getGaleria(){
            $query="select * from galeria where usuario = ? order by  posicao";
            $stmt=$this->db->prepare($query);
            $stmt->bindValue(1,$this->__get('usuario'));
            $stmt->execute();
            $galeria= $stmt->fetchAll(PDO::FETCH_ASSOC);
           ;;;;;;;;;;;;;;;
            return   $galeria;
        }

        public function inserirTodosGaleria(){
               $query="select id from usuario";
               $stmt=$this->db->prepare($query);
               $stmt->execute();
               $listaUsuario= $stmt->fetchAll(PDO::FETCH_ASSOC);

               print_r($listaUsuario);

               foreach ($listaUsuario as $i=> $valor) {
                    $id=$valor['id'];
                   
                    echo $id;
                    echo '</br>';
                    $query="INSERT INTO galeria (imagem, posicao, usuario) VALUES
                    ('img (73).jpg', 1, :id),
                    ('mountain1.jpg', 2, :id),
                    ('mountain2.jpg', 3, :id),
                    ('img (35).jpg', 4, :id),
                    ('img (18).jpg', 5, :id),
                    ('mountain3.jpg', 6, :id)";
    
                    $stmt = $this->db->prepare($query);
                    $stmt->bindValue(':id',$id);
                    $succes=$stmt->execute();
                    if($succes){
                        echo 'sucesso';
                    }else{
                        echo $succes;
                    }

               }

            
            
        }

   }