<?php

namespace App\Controllers;

//os recursos do miniframework
use MF\Controller\Action;
use MF\Model\Container;


class ChatController extends Action
{

    function sendMenssage(){
        $chat =Container::getModel('chat');
       $chat->criarChat();
    }

    function getMessagesChat(){
        
        $chat =Container::getModel('chat');
        $chat->__set('reciever',$_POST['otherUser']);
        echo json_encode($chat->getAll());
    }

    function getUsuarioId(){
        session_start();
        echo json_encode($_SESSION['id']);
    }
    function getusuario(){
        $usuario = Container::getModel('usuario');
        $usuario->__set('id',$_POST['id']);
        echo json_encode($usuario->getById());
    }
   function getUltimaMessageChat(){
        $chat =Container::getModel('chat');
        $chat->__set('reciever',$_POST['otherUser']);
        echo json_encode($chat->getUltimaMensagem());
   }
    
    public function pesquisarpormensagem()
    {
        $usuario = Container::getModel('usuario');
        $usuarios = $usuario->getAll($_POST['pesquisarpor'], 0);

        $usuarios = json_encode($usuarios);

        print_r($usuarios);
    }
  
    function getconversas(){
        $conversa=Container::getModel('conversa');
        $conversa->__set('mainUser',$_POST['mainUser']);
        $list=$conversa->getAll();

        echo json_encode($list);

    }

}