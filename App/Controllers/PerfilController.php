<?php

namespace App\Controllers;

//os recursos do miniframework
use MF\Controller\Action;
use MF\Model\Container;


class PerfilController extends Action
{

    public function perfil()

    {
 
        session_start();
        //recuperando as postagens e criando uma variavel
        $postagens = Container::getModel('postagem');

        if(isset($_POST['offset'])&& $_POST['offset']!=''){
            $this->view->postagens = $postagens->getAll($_POST['offset']);
        }else{
            $this->view->postagens = $postagens->getAll(0);

        }

       
   

        //Total de postagem seguindo e seguidores;
        $id=0;
        if(isset($_GET['idUsuario']) && $_GET['idUsuario']!=''){
          $id=$_GET['idUsuario'];
         // print_r($_GET);

          $seguindo=Container::getModel('SeguirDeixarSeguir');
          $seguindo->__set('id_usuario',$_SESSION['id']);
          $seguindo->__set('id_usuario_seguindo',$id);
          $this->view->estaSeguindo= $seguindo->verificaseguindo();
          $this->view->meuperfil=false;
          $this->view->userVisitando=$id;
        }else{
             $id=$_SESSION['id'];
             $this->view->meuperfil=true;
        }
        $this->view->totPostagens = $postagens->getTotPostagens($id);

        //recuperando as usuario e criando uma variavel
        $usuario = Container::getModel('usuario');
        $usuario->__set('id', $id);
        $user = $usuario->getById();

        $this->view->user_name = $user['name'];
        $this->view->user_picture = $user['picture'];
        $this->view->user_id = $user['id'];
        $this->view->user_username = $user['username'];
        $this->view->user_wallpaper=$user['wallpaper'];
        $this->view->totSeguindo = $usuario->getTotSeguindo();
        $this->view->totSeguidores = $usuario->getTotSeguidores();

 
        //postagens do usuario
        $postagem =Container::getModel('postagem');
        $postagem->__set('id_usuario',$id);
        $this->view->postagens = $postagem->getById(0);

 
         $this->render('perfil');
    }

    public function seguir(){
        session_start();
        $idUser=$_SESSION['id'];
        $seguir=Container::getModel('SeguirDeixarSeguir');
        $seguir->__set('id_usuario', $idUser);
        $seguir->__set('id_usuario_seguindo',$_POST['idUsuarioSeguindo']);
        $seguir->seguir();
    }

    public function deixarseguir(){
        session_start();
        $idUser=$_SESSION['id'];
        $seguir=Container::getModel('SeguirDeixarSeguir');
        $seguir->__set('id_usuario',$idUser);
        $seguir->__set('id_usuario_seguindo',$_POST['idUsuarioSeguindo']);
        $seguir->deixarseguir();

    }
    public function verificaseguindo(){
        session_start();
        $idUser=$_SESSION['id'];
        $seguir=Container::getModel('SeguirDeixarSeguir');
        $seguir->__set('id_usuario',$idUser);
        $seguir->__set('id_usuario_seguindo',$_POST['idUsuarioSeguindo']);
        
        echo json_encode($seguir->verificaseguindo());
    }

    function getPostagensPerfil(){
        session_start();
        $postagem =Container::getModel('postagem');
        $id=0;
        if(isset($_POST['idUsuario']) && $_POST['idUsuario']!=''){
           $id=$_POST['idUsuario'];
        }else{
            $id=$_SESSION['id'];
        }
        $postagem->__set('id_usuario',$id);
        $postagens=$postagem->getById(0);
        echo json_encode($postagens);
    }

    
    public function atualizarWallpaperPerfil()
    {
        session_start();
        $usuario=Container::getModel('usuario');
        $usuario->__set('id',$_SESSION['id']);
       

         if(!isset($_POST['nomeImagem'])){
                print_r($_FILES);
                if (isset($_FILES) && $_FILES['uploadWallpaper']['error'] == 0) {
                    $arquivoname = $_SESSION['username'] . "_" . rand(999, 999999) . $_FILES['uploadWallpaper']['name'];
                    //onde a imagem ta guardada temporariamente
                    $arquivotmp = $_FILES['uploadWallpaper']['tmp_name'];
                    //o caminho para a imagem
                    $arquivoPath = "../public/img/wallpapers/uploads/";

                    //verifica se o upload foi feito 
                    if (is_uploaded_file($arquivotmp)) {
                        //move a imagem para o imagePath e verifica se foi movida
                        if (move_uploaded_file($arquivotmp, $arquivoPath . $arquivoname)) {
                            $usuario->__set('wallpaper',$arquivoname);
                        }
                    }
                }
        }else{
            $usuario->__set('wallpaper',$_POST['nomeImagem']);

        }

        $usuario->updateWallpaper();
    }

    public function getWallpaperUser(){

    }
}