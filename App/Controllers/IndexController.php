<?php

namespace App\Controllers;

//os recursos do miniframework
use MF\Controller\Action;
use MF\Model\Container;

 
class IndexController extends Action {

	public function index() {
		$usuario= ['username'=>'joaopaulo123','nome'=>"Joao paulo",'email'=>'joaoPaulo3687@hotmail.com','senha'=>'5142357'];
		$this->view->usuario=$usuario;
		$this->view->errorCadastro=false;
	    $this->view->login='sucesso';
	    $this->render('index');
	}

	// public function inscreverse() {
	// 	$usuario= ['nome'=>"Joao paulo",'email'=>'joaoPaulo3687@hotmail.com','senha'=>'5142357'];
	// 	$this->view->usuario=$usuario;
	// 	$this->view->errorCadastro=false;
	// 	$this->render('inscreverse');
	// }

	public function registrar(){
 		$usuario= Container::getModel('usuario');
		$usuario->__set('name',$_POST['nome']);
		$usuario->__set('username',$_POST['username']);
		$usuario->__set('rpPass',$_POST['rpSenha']);	 
		$usuario->__set('password',$_POST['senha']);
		$usuario->__set('email',$_POST['email']);

		$usuario->inserir();


	}

}


?>