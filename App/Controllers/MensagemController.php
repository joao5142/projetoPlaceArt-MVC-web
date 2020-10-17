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
        $user = $usuario->getById();

        $this->view->user_username = $user['name'];
        $this->view->user_picture = $user['picture'];
        $this->view->user_id = $user['id'];
        $this->view->user_username = $user['username'];
        $this->view->totSeguindo = $usuario->getTotSeguindo();
        $this->view->totSeguidores = $usuario->getTotSeguidores();

          $this->render('mensagem');
     }
}