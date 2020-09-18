<?php

namespace App\Controllers;

//os recursos do miniframework
use MF\Controller\Action;
use MF\Model\Container;

 
class AuthController extends Action {

 
	public function autenticar(){
		$usuario=Container::getModel('usuario');
		$usuario->__set('email',$_POST['email']);
		$usuario->__set('password',$_POST['senha']);
	
	    $usuarioAutenticado=$usuario->autenticar();

	 
	   
         if($usuarioAutenticado){
		 	//prossegue para a timeline
			 header('location:/miniframework/public/timeline');
			  
		 }else{
		 	header('Location:/miniframework/public/?login=error');
		 }
	}

	public function logOut(){
		setcookie('id', null, -1);
		setcookie('token', null, -1);
		setcookie('secure', null, -1);

		session_start();
		session_destroy();
		
		header("location:/miniframework/public/");
	}

}


?>