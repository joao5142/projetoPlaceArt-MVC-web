<?php
//recursos
namespace App\Models;
use MF\Model\Model;
use PDO;


   class Chat extends Model{
        private int  $id;
        private int $sender;
        private int  $reciever;
        private string  $message;
        private string $imageOrVideo;
        private string $creation;
    

        public function __construct()
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

        public function autenticar(){
            
        }

   }