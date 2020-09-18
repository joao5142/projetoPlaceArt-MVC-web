<?php

namespace App\Controllers;

//os recursos do miniframework
use MF\Controller\Action;
use MF\Model\Container;

 
class AppController extends Action {

 
	 public function timeline(){
         session_start();
         //recuperando as postagens e criando uma variavel
         $postagens=Container::getModel('postagem');
         $this->view->postagens=$postagens->getAll();
         $this->view->totalPaginas=1;
         $this->view->paginaAtiva=1;

         //Total de postagem seguindo e seguidores;

         $this->view->totPostagens= $postagens->getTotPostagens($_SESSION['id']);

         //recuperando as usuario e criando uma variavel
         $usuario=Container::getModel('usuario');
         $usuario->__set('id',$_SESSION['id']);
         $user= $usuario->getById();

         $this->view->user_username=$user['name'];     
         $this->view->user_picture=$user['picture'];
         $this->view->user_id=$user['id'];
         $this->view->user_username=$user['username'];
         $this->view->totSeguindo=$usuario->getTotSeguindo();
         $this->view->totSeguidores=$usuario->getTotSeguidores();

        //recuperando quemSeguir e criando uma variavel
        $quemSeguir=  $usuario->getQuemSeguir();

        $this->view->quemSeguir=$quemSeguir;

        $this->render('timeline');
     }

     public function uploadPic(){

        if($_SERVER['REQUEST_METHOD']=='POST'){
             session_start();
            print_r($_FILES);
            //nome aleatorio para imagem
           $imagename= $_SESSION['username']."_".rand(999,999999).$_FILES['imgInp']['name'];
           //onde a imagem ta guardada temporariamente
           $imagetmp=$_FILES['imgInp']['tmp_name'];
           //o caminho para a imagem
           $imagePath="../public/img/user/";
    
           //verifica se o upload foi feito 
           if(is_uploaded_file($imagetmp)){
               //move a imagem para o imagePath e verifica se foi movida
              if(move_uploaded_file($imagetmp,$imagePath.$imagename)){
                  //recebe como parametro o caminho concatenado com o nome
    
                 $usuario=Container::getModel('usuario');
                 $usuario->__set('id',$_SESSION['id']);
                 $success=$usuario->updatePic($imagename);

                 if($success){
                     echo 'imagem atualizada';
                 }else{
                    die(header('HTTP/1.0 401 Erro ao guardar no Banco'));
    
                 }
              }else{
                die(header('HTTP/1.0 401 Erro ao Mover Imagem'));
              }
           }else{
              die(header('HTTP/1.0 401 Erro no Upload'));
           }
    
        }else{
            die(header('HTTP/1.0 401 Faltam Parametros'));
        }
         
     }

     public function quemseguir(){
         $this->render('quemSeguir');
     }

     public function pesquisarpor(){   
         $usuario=Container::getModel('usuario');
         $usuarios= $usuario->getAll($_POST['pesquisarpor'] ,0);
         
         $usuarios= json_encode($usuarios);

         print_r($usuarios);
     }


     public function criarpostagem(){
          echo('estamos em criar postagem');

          if(isset($_POST)){
              print_r($_POST);
          }
          if(isset($_FILES)){
              print_r($_FILES);
          }
          
          session_start();
          $postagem=Container::getModel('postagem');
          $postagem->__set('id_usuario',$_SESSION['id']);
          $postagem->__set('textoPostagem',$_POST['postagemTextArea']);

     
          if(isset($_FILES)){
                $arquivoname= $_SESSION['username']."_".rand(999,999999).$_FILES['imgPostagem']['name'];
                //onde a imagem ta guardada temporariamente
                $arquivotmp=$_FILES['imgPostagem']['tmp_name'];
                //o caminho para a imagem
                $arquivoPath="../public/img/uploads/";
        
                //verifica se o upload foi feito 
                if(is_uploaded_file($arquivotmp)){
                    //move a imagem para o imagePath e verifica se foi movida
                    if(move_uploaded_file($arquivotmp,$arquivoPath.$arquivoname)){
                        $postagem->__set('arquivo',$arquivoname);

                    }
                }
               
        }

        if($_POST['postagemTextArea']!=''){
            $postagem->inserir();
        }
     }

     public function perfil(){
        $this->view->postagens=array();
        $this->view->totalPaginas=1;
        $this->view->paginaAtiva=1;

        $this->view->info_usuario['nome']='Joao Paulo';

        session_start();

        $usuario=Container::getModel('usuario');
        $usuario->__set('id',$_SESSION['id']);

      
        $user= $usuario->getById();

        $this->view->user_picture=$user['picture'];
        $this->view->user_id=$user['id'];
        $this->view->user_username=$user['username'];
         $this->render('perfil');
     }

     public function atualizarWallpaperPerfil(){
         echo 'estamos em atualizar wallpaper perfil';
         print_r($_COOKIE);
         
        
     }

     public function curtir(){
          $curtida= Container::getModel('curtida');
         session_start();


         $curtida->__set('idPost',$_POST['idPostagem']);
         $curtida->__set('idUsuarioCurtiu',$_SESSION['id']);
         $curtida->curtir();
         
         $totalCurtida= $curtida->getTotalCurtida($_POST['idPostagem']);

         echo json_encode($totalCurtida);

     }
     public function descurtir(){
 
        $curtida= Container::getModel('curtida');
        session_start();

        $curtida->__set('idPost',$_POST['idPostagem']);
        $curtida->__set('idUsuarioCurtiu',$_SESSION['id']);
        $curtida->descurtir();

        $totalCurtida= $curtida->getTotalCurtida($_POST['idPostagem']);

        echo json_encode($totalCurtida);

     }

     public function getTotalCurtida(){
        $curtida= Container::getModel('curtida');
        session_start();

        $curtida->__set('idPost',$_POST['idPostagem']);
        $curtida->__set('idUsuarioCurtiu',$_SESSION['id']);
        $totalCurtida= $curtida->getTotalCurtida();

        echo  $totalCurtida;

     }
}
