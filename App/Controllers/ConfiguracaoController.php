<?php

namespace App\Controllers;

//os recursos do miniframework
use MF\Controller\Action;
use MF\Model\Container;


class ConfiguracaoController extends Action
{

    function deletarconta()
    {
        session_start();
        $usuario = Container::getModel('usuario');
        $usuario->__set('id', $_SESSION['id']);
        $usuario->deletar();

        $postagem= Container::getModel('postagem');
        $postagem->__set('id_usuario',$_SESSION['id']);
        $postagem->deletarByUser();


        $conversa=Container::getModel('conversa');
        $conversa->__set('mainUser',$_SESSION['id']);
        $conversa->deletar();

        $comentarios=Container::getModel('comentario');
        $comentarios->__set('id_usuario_comentou',$_SESSION['id']);
        $comentarios->deletarTodosUser();


    }

    function salvardenuncia(){
        echo 'chegamos em salvar denuncia';
        $denuncia= Container::getModel('denunciapostagem');
        $denuncia->__set('id_postagem',$_POST['idPostagem']);
        $denuncia->__set('mensagem',$_POST['mensagem']);
        $success=$denuncia->salvardenuncia();
        
    }

     
    function mudarsenha()
    {
        print_r($_POST);
        session_start();

        $senhaAtual = $_POST['senhaAtual'];
        $novaSenha = $_POST['novaSenha'];
        $repetirSenha = $_POST['repetirSenha'];

        if (strlen($senhaAtual) < 8 || strlen($repetirSenha) < 8) {
            die(header(utf8_decode('HTTP/1.0 401 As senhas muitos curtas,mínimo 8 caracteres!')));
        } else if ($novaSenha != $repetirSenha) {
            die(header(utf8_decode('HTTP/1.0 401 As senhas não são iguais!')));
        } else {
            $usuario = Container::getModel('usuario');
            $usuario->__set('id', $_SESSION['id']);
            $user = $usuario->getById();

            if (password_verify($senhaAtual, $user['password'])) {
                $usuario->__set('password', $novaSenha);
               echo $usuario->updateSenha();
            } else {
                die(header(utf8_decode('HTTP/1.0 401 A senha atual não condiz com a cadastrada!')));
            }
        }
    }
}
