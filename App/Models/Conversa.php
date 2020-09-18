<?php
//recursos
namespace App\Models;
use MF\Model\Model;
use PDO;

   class Conversa extends Model{
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
            return $this->$name=$value;
        }

        public function inserir()
        {
            
        }

        public function atualizar(){

        }
        public function deletar(){

        }

        public function getById(){

        }
        public function getAll(){

        }

        

   }