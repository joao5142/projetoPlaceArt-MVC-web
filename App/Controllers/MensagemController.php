<?php

namespace App\Controllers;

//os recursos do miniframework
use MF\Controller\Action;
use MF\Model\Container;

 
class MensagemController extends Action {

     public function mensagem(){

        session_start();
        $usuario = Container::getModel('usuario');
        $usuario->__set('id', $_SESSION['id']);
        $usuario->updateonline();
        $user = $usuario->getById();

        date_default_timezone_set('America/Sao_Paulo');
       $comentarios=Container::getModel('comentario');

        $this->view->user_username = $user['name'];
        $this->view->user_picture = $user['picture'];
        $this->view->user_datacriacao = $user['creation'];
        $this->view->user_online =$comentarios->timing(strtotime($user['online']));
        $this->view->user_id = $user['id'];
        $this->view->user_username = $user['username'];
        $this->view->totSeguindo = $usuario->getTotSeguindo();
        $this->view->totSeguidores = $usuario->getTotSeguidores();

        
        $this->render('mensagem');
     }
}