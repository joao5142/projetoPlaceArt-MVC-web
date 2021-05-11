<?php

namespace App\Controllers;

//os recursos do miniframework
use MF\Controller\Action;
use MF\Model\Container;


class AppController extends Action
{
    public function denunciarpostagem(){
        session_start();
        $postagens = Container::getModel('postagem');

        $this->view->postagemId=$_GET['idPostagem'];
    
        //Total de postagem seguindo e seguidores;
        $this->view->totPostagens = $postagens->getTotPostagens($_SESSION['id']);
        //usuarios

        $usuario = Container::getModel('usuario');
        $usuario->__set('id', $_SESSION['id']);
        $user = $usuario->getById();

        $this->view->user_username = $user['name'];
        $this->view->user_picture = $user['picture'];
        $this->view->user_id = $user['id'];
        $this->view->user_username = $user['username'];
        $this->view->totSeguindo = $usuario->getTotSeguindo();
        $this->view->totSeguidores = $usuario->getTotSeguidores();

        $this->render('denunciarPostagem');
    }
 
    public function timeline()
    {
        session_start();
         //atualiza o online
        $usuario = Container::getModel('usuario');
        $usuario->__set('id', $_SESSION['id']);
        $usuario->updateonline();
        $user = $usuario->getById();
        //recuperando as postagens e criando uma variavel
        $postagens = Container::getModel('postagem');

        if(isset($_POST['offset'])&& $_POST['offset']!=''){
            $this->view->postagens = $postagens->getAll($_POST['offset']);
        }else{
            $this->view->postagens = $postagens->getAll(0);

        }
       
        $this->view->totalPaginas = 1;
        $this->view->paginaAtiva = 1;

        //Total de postagem seguindo e seguidores;

        $this->view->totPostagens = $postagens->getTotPostagens($_SESSION['id']);

        //recuperando as usuario e criando uma variavel
        $usuario = Container::getModel('usuario');
        $usuario->__set('id', $_SESSION['id']);
        $user = $usuario->getById();

        $this->view->user_username = $user['name'];
        $this->view->user_picture = $user['picture'];
        $this->view->user_id = $user['id'];
        $this->view->user_username = $user['username'];
        $this->view->totSeguindo = $usuario->getTotSeguindo();
        $this->view->totSeguidores = $usuario->getTotSeguidores();

        //recuperando quemSeguir e criando uma variavel
        $quemSeguir = $usuario->getQuemSeguir();
        $amigos = $usuario->getAmigos();

        $this->view->quemSeguir = $quemSeguir;
        $this->view->amigos = $amigos;

        $this->render('timeline');
    }

    public function timeline2(){
        $postagens = Container::getModel('postagem');
        $postagensList=$postagens->getAll($_POST['offset']);

        echo json_encode($postagensList);
       
    }
    public function uploadPic()
    {

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            session_start();
            print_r($_FILES);
            //nome aleatorio para imagem
            $imagename = $_SESSION['username'] . "_" . rand(999, 999999) . $_FILES['imgInp']['name'];
            //onde a imagem ta guardada temporariamente
            $imagetmp = $_FILES['imgInp']['tmp_name'];
            //o caminho para a imagem
            $imagePath = "../public/img/user/";

            //verifica se o upload foi feito 
            if (is_uploaded_file($imagetmp)) {
                //move a imagem para o imagePath e verifica se foi movida
                if (move_uploaded_file($imagetmp, $imagePath . $imagename)) {
                    //recebe como parametro o caminho concatenado com o nome

                    $usuario = Container::getModel('usuario');
                    $usuario->__set('id', $_SESSION['id']);
                    $success = $usuario->updatePic($imagename);

                    if ($success) {
                        echo 'imagem atualizada';
                    } else {
                        die(header('HTTP/1.0 401 Erro ao guardar no Banco'));
                    }
                } else {
                    die(header('HTTP/1.0 401 Erro ao Mover Imagem'));
                }
            } else {
                die(header('HTTP/1.0 401 Erro no Upload'));
            }
        } else {
            die(header('HTTP/1.0 401 Faltam Parametros'));
        }
    }

    public function quemseguir()
    {
        session_start();
        $postagens = Container::getModel('postagem');

       
  
        //Total de postagem seguindo e seguidores;
        $this->view->totPostagens = $postagens->getTotPostagens($_SESSION['id']);
        //usuarios

        $usuario = Container::getModel('usuario');
        $usuario->__set('id', $_SESSION['id']);
        $user = $usuario->getById();

        $this->view->user_username = $user['name'];
        $this->view->user_picture = $user['picture'];
        $this->view->user_id = $user['id'];
        $this->view->user_username = $user['username'];
        $this->view->totSeguindo = $usuario->getTotSeguindo();
        $this->view->totSeguidores = $usuario->getTotSeguidores();

        $this->render('quemSeguir');
    }

    public function configuracao(){
        session_start();
        $postagens = Container::getModel('postagem');
        //Total de postagem seguindo e seguidores;
        $this->view->totPostagens = $postagens->getTotPostagens($_SESSION['id']);
        //usuarios

        $usuario = Container::getModel('usuario');
        $usuario->__set('id', $_SESSION['id']);
        $user = $usuario->getById();

        $this->view->user_username = $user['name'];
        $this->view->user_picture = $user['picture'];
        $this->view->user_id = $user['id'];
        $this->view->user_username = $user['username'];
        $this->view->totSeguindo = $usuario->getTotSeguindo();
        $this->view->totSeguidores = $usuario->getTotSeguidores();

        $this->render('configuracao');
    }

    public function pesquisarpor()
    {
        $usuario = Container::getModel('usuario');
        $usuarios = $usuario->getAll($_POST['pesquisarpor'], 0);

        $usuarios = json_encode($usuarios);

        print_r($usuarios);
    }

    public function pesquisarporamigos()
    {
        session_start();

        $usuario = Container::getModel('usuario');
        $usuario->__set('id', $_SESSION['id']);

        $usuarios=null;
        if($_POST['pesquisarpor']==''){
            $usuarios = $usuario->getAmigos();

        }else{
            $usuarios = $usuario->getAmigosOffset($_POST['pesquisarpor']);

        }

        $usuarios = json_encode($usuarios);

        print_r($usuarios);
    }

    public function deletarpostagem(){
        $postagem = Container::getModel('postagem');
        $postagem->__set('idPostagem',$_POST['idPostagem']);
        $sucesso= $postagem->deletar();

        $comentarios=Container::getModel('comentario');
        $comentarios->__set('id_postagem',$_POST['idPostagem']);
        $comentarios-> deletarTodosPostagem();

        echo json_encode($sucesso);
    }

    function compressImage($source_path, $destination_path, $quality) {
        $info = getimagesize($source_path);
    
        if ($info['mime'] == 'image/jpeg') {
            $image = imagecreatefromjpeg($source_path);
        } elseif ($info['mime'] == 'image/png') {
            $image = imagecreatefrompng($source_path);
        }
    
        imagejpeg($image, $destination_path, $quality);
    
        return $destination_path;
    }

    public function criarpostagem()
    {
        echo ('estamos em criar postagem');

        if (isset($_POST)) {
            print_r($_POST);
        }
        if (isset($_FILES)) {
            print_r($_FILES);
        }

        $vender=0;
        if(isset($_POST['postVendas'])){
             $vender=1;
        }else{
             $vender=0;
        }

        
        session_start();
        $postagem = Container::getModel('postagem');
        $postagem->__set('id_usuario', $_SESSION['id']);
        $postagem->__set('textoPostagem', $_POST['postagemTextArea']);
        $postagem->__set('vender',$vender);


        if (isset($_FILES)) {
            $arquivoname = $_SESSION['username'] . "_" . rand(999, 999999) . $_FILES['imgPostagem']['name'];
            //onde a imagem ta guardada temporariamente
            $arquivotmp = $_FILES['imgPostagem']['tmp_name'];
            //o caminho para a imagem
            $arquivoPath = "../public/img/uploads/postagens/";

            //verifica se o upload foi feito 
            if (is_uploaded_file($arquivotmp)) {
                //move a imagem para o imagePath e verifica se foi movida
                if (move_uploaded_file($arquivotmp, $arquivoPath . $arquivoname)) {
                    $postagem->__set('arquivo', $arquivoname);
                }
            }
        }

        if ($_POST['postagemTextArea'] != '' || $postagem->__get('arquivo')!='') {
            $postagem->inserir();
        }
        
    }


    public function curtir()
    {
        $curtida = Container::getModel('curtida');
        session_start();


        $curtida->__set('idPost', $_POST['idPostagem']);
        $curtida->__set('idUsuarioCurtiu', $_SESSION['id']);
        $curtida->curtir();

        $totalCurtida = $curtida->getTotalCurtida($_POST['idPostagem']);

        echo json_encode($totalCurtida);
    }
    public function descurtir()
    {

        $curtida = Container::getModel('curtida');
        session_start();

        $curtida->__set('idPost', $_POST['idPostagem']);
        $curtida->__set('idUsuarioCurtiu', $_SESSION['id']);
        $curtida->descurtir();

        $totalCurtida = $curtida->getTotalCurtida($_POST['idPostagem']);

        echo json_encode($totalCurtida);
    }
    public function curtirComentario()
    {
        $curtida = Container::getModel('curtida');
        session_start();


        $curtida->__set('idComentario', $_POST['idComentario']);
        $curtida->__set('idUsuarioCurtiu', $_SESSION['id']);
        $curtida->curtirComentario();

        $totalCurtida = $curtida->getTotalCurtidaComentario($_POST['idComentario']);

        echo json_encode($totalCurtida);
    }
    public function descurtirComentario()
    {
        $curtida = Container::getModel('curtida');
        session_start();

        $curtida->__set('idComentario', $_POST['idComentario']);
        $curtida->__set('idUsuarioCurtiu', $_SESSION['id']);
        $curtida->descurtirComentario();

        $totalCurtida = $curtida->getTotalCurtidaComentario($_POST['idComentario']);

        echo json_encode($totalCurtida);
    }

   function verificacurtida(){
        $curtida = Container::getModel('curtida');
        session_start();

        $valor= $curtida->verificacurtida($_POST['idPostagem'], $_SESSION['id']);

        echo json_encode($valor);
    }
    function verificacurtidacomentario(){
        $curtida = Container::getModel('curtida');
        session_start();

        $valor= $curtida->verificacurtidaComentario($_POST['idComentario'], $_SESSION['id']);

        echo json_encode($valor);
    }
    function getDataString(){
        date_default_timezone_set('America/Sao_Paulo');

        $comentario=Container::getModel('comentario');
        echo $comentario->timing(strtotime($_POST['data']));

        
    }
    public function getTotalCurtida()
    {
        $curtida = Container::getModel('curtida');
        session_start();

        $curtida->__set('idPost', $_POST['idPostagem']);
        $curtida->__set('idUsuarioCurtiu', $_SESSION['id']);
        $totalCurtida = $curtida->getTotalCurtida();

        echo  $totalCurtida;
    }

    function getComentarios(){
        
        $comentario=Container::getModel('comentario');
        $resultado= $comentario-> getAllOffset($_POST['idPostagem'],$_POST['totComentarios']);

        print_r(json_encode($resultado));
    }
    function getSeuComentario(){
        $comentario=Container::getModel('comentario');
        $resultado= $comentario-> getSeuComentario($_POST['idPostagem']);

        print_r(json_encode($resultado));
    }
    function getTotComentarios(){
        $comentario=Container::getModel('comentario');
        $resultado= $comentario->getTotComentarios($_POST['idPostagem']);

        echo json_encode($resultado);

    }
    function getTotComentarComentarios(){
        $comentario=Container::getModel('ComentarComentarios');
        $resultado= $comentario->getTotComentarios($_POST['idComentario']);

        echo json_encode($resultado);

    }
    function getTotCurtidas(){
        $curtida=Container::getModel('curtida');
        $resultado= $curtida->getTotalCurtida($_POST['idPostagem']);

       echo json_encode($resultado);
    }
    

    function getSeuComentarComentario(){
        $comentario=Container::getModel('ComentarComentarios');
        $resultado= $comentario->getSeuComentario($_POST['idComentario']);

        print_r(json_encode($resultado));
    }
    
    function getComentarComentarios(){
        $comentario=Container::getModel('ComentarComentarios');
        $resultado= $comentario-> getAllOffset($_POST['idComentario'],$_POST['totComentarios']);

        print_r(json_encode($resultado));
    }
    public function salvarcomentario()
    {
        if ($_POST['textSeuComentario'] != '') {
            session_start();

            $comentario = Container::getModel('comentario');
            $comentario->__set('id_usuario_comentou', $_SESSION['id']);
            $comentario->__set('id_postagem', $_POST['idPostagemComentario']);
            $comentario->__set('textoComentario', $_POST['textSeuComentario']);

            if (isset($_FILES) && $_FILES['arquivoComentarioUpload']['error'] == 0) {
                $arquivoname = $_SESSION['username'] . "_" . rand(999, 999999) . $_FILES['arquivoComentarioUpload']['name'];
                //onde a imagem ta guardada temporariamente
                $arquivotmp = $_FILES['arquivoComentarioUpload']['tmp_name'];
                //o caminho para a imagem
                $arquivoPath = "../public/img/uploads/comentarios/";

                //verifica se o upload foi feito 
                if (is_uploaded_file($arquivotmp)) {
                    //move a imagem para o imagePath e verifica se foi movida
                    if (move_uploaded_file($arquivotmp, $arquivoPath . $arquivoname)) {
                        $comentario->__set('arquivoComentario', $arquivoname);
                    }
                }
            }


            $comentario->inserir();
        }


        $usuario=Container::getModel('usuario');
        $usuario->__set('id',$_SESSION['id']);
        $user= $usuario->getUsernamePicture();
        print_r(json_encode($user));
    }

    function salvarcomentarComentario(){
        if ($_POST['textSeuComentarComentario'] != '') {
            session_start();

            $comentario = Container::getModel('ComentarComentarios');
            $comentario->__set('id_usuario_comentou', $_SESSION['id']);
            $comentario->__set('id_comentario', $_POST['idComentarComentario']);
            $comentario->__set('textoComentario', $_POST['textSeuComentarComentario']);

            if (isset($_FILES) && $_FILES['arquivoComentarioUpload']['error'] == 0) {
                $arquivoname = $_SESSION['username'] . "_" . rand(999, 999999) . $_FILES['arquivoComentarioUpload']['name'];
                //onde a imagem ta guardada temporariamente
                $arquivotmp = $_FILES['arquivoComentarioUpload']['tmp_name'];
                //o caminho para a imagem
                $arquivoPath = "../public/img/uploads/comentarios/";

                //verifica se o upload foi feito 
                if (is_uploaded_file($arquivotmp)) {
                    //move a imagem para o imagePath e verifica se foi movida
                    if (move_uploaded_file($arquivotmp, $arquivoPath . $arquivoname)) {
                        $comentario->__set('arquivoComentario', $arquivoname);
                    }
                }
            }


            $comentario->inserir();
        }


        $usuario=Container::getModel('usuario');
        $usuario->__set('id',$_SESSION['id']);
        $user= $usuario->getUsernamePicture();
        print_r(json_encode($user));
    }

    function getVendasPostagem(){
 
        $offset= (isset($_POST['offset'])) ? $_POST['offset']:0;
        $postagem=Container::getModel('postagem');
        $resultado= $postagem->getAllPostVendas($offset);

        echo json_encode($resultado);
    }

   
}
