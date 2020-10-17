<?php

namespace App;

use MF\Init\Bootstrap;

class Route extends Bootstrap {

	protected function initRoutes() {

		$routes['index'] = array(
			'route' => '/',
			'controller' => 'IndexController',
			'action' => 'index'
		);

		$routes['inscreverse'] = array(
			'route' => '/inscreverse',
			'controller' => 'IndexController',
			'action' => 'inscreverse'
		);
		$routes['registrar'] = array(
			'route' => '/registrar',
			'controller' => 'IndexController',
			'action' => 'registrar'
		);
		$routes['autenticar'] = array(
			'route' => '/autenticar',
			'controller' => 'AuthController',
			'action' => 'autenticar'
		);
		$routes['logOut'] = array(
			'route' => '/logOut',
			'controller' => 'AuthController',
			'action' => 'logOut'
		);
		$routes['timeline'] = array(
			'route' => '/timeline',
			'controller' => 'AppController',
			'action' => 'timeline'
		);
		
		$routes['configuracao'] = array(
			'route' => '/configuracao',
			'controller' => 'AppController',
			'action' => 'configuracao'
		);
		$routes['chat'] = array(
			'route' => '/chat',
			'controller' => 'AppController',
			'action' => 'chat'
		);
		$routes['uploadpic'] = array(
			'route' => '/uploadpic',
			'controller' => 'AppController',
			'action' => 'uploadpic'
		);
		$routes['quemseguir'] = array(
			'route' => '/quemseguir',
			'controller' => 'AppController',
			'action' => 'quemseguir'
		);

		$routes['pesquisarpor'] = array(
			'route' => '/pesquisarpor',
			'controller' => 'AppController',
			'action' => 'pesquisarpor'
		);
		$routes['pesquisarpormensagem'] = array(
			'route' => '/pesquisarpormensagem',
			'controller' => 'ChatController',
			'action' => 'pesquisarpormensagem'
		);
		$routes['getconversas'] = array(
			'route' => '/getconversas',
			'controller' => 'ChatController',
			'action' => 'getconversas'
		);
		
		$routes['sendMenssage'] = array(
			'route' => '/sendMenssage',
			'controller' => 'ChatController',
			'action' => 'sendMenssage'
		);
		$routes['getMessagesChat'] = array(
			'route' => '/getMessagesChat',
			'controller' => 'ChatController',
			'action' => 'getMessagesChat'
		);
		$routes['getUsuarioId'] = array(
			'route' => '/getUsuarioId',
			'controller' => 'ChatController',
			'action' => 'getUsuarioId'
		);

		$routes['criarpostagem'] = array(
			'route' => '/criarpostagem',
			'controller' => 'AppController',
			'action' => 'criarpostagem'
		);
		$routes['deletarpostagem'] = array(
			'route' => '/deletarpostagem',
			'controller' => 'AppController',
			'action' => 'deletarpostagem'
		);
		$routes['denunciarpostagem'] = array(
			'route' => '/denunciarpostagem',
			'controller' => 'AppController',
			'action' => 'denunciarpostagem'
		);
		$routes['salvardenuncia'] = array(
			'route' => '/salvardenuncia',
			'controller' => 'ConfiguracaoController',
			'action' => 'salvardenuncia'
		);
		
		$routes['getUltimaMessageChat'] = array(
			'route' => '/getUltimaMessageChat',
			'controller' => 'ChatController',
			'action' => 'getUltimaMessageChat'
		);

		$routes['perfil'] = array(
			'route' => '/perfil',
			'controller' => 'PerfilController',
			'action' => 'perfil'
		); 
		$routes['getPostagensPerfil'] = array(
			'route' => '/getPostagensPerfil',
			'controller' => 'PerfilController',
			'action' => 'getPostagensPerfil'
		); 
		$routes['seguir'] = array(
			'route' => '/seguir',
			'controller' => 'PerfilController',
			'action' => 'seguir'
		); 
		$routes['deixarseguir'] = array(
			'route' => '/deixarseguir',
			'controller' => 'PerfilController',
			'action' => 'deixarseguir'
		); 

		$routes['verificaseguindo'] = array(
			'route' => '/verificaseguindo',
			'controller' => 'PerfilController',
			'action' => 'verificaseguindo'
		); 
		$routes['curtir'] = array(
			'route' => '/curtir',
			'controller' => 'AppController',
			'action' => 'curtir'
		);
		$routes['descurtir'] = array(
			'route' => '/descurtir',
			'controller' => 'AppController',
			'action' => 'descurtir'
		);
		$routes['atualizarWallpaperPerfil'] = array(
			'route' => '/atualizarWallpaperPerfil',
			'controller' => 'PerfilController',
			'action' => 'atualizarWallpaperPerfil'
		);
		$routes['getWallpaperUser'] = array(
			'route' => '/getWallpaperUser',
			'controller' => 'PerfilController',
			'action' => 'getWallpaperUser'
		);
		$routes['salvarcomentario'] = array(
			'route' => '/salvarcomentario',
			'controller' => 'AppController',
			'action' => 'salvarcomentario'
		);
		$routes['getVendasPostagem'] = array(
			'route' => '/getVendasPostagem',
			'controller' => 'AppController',
			'action' => 'getVendasPostagem'
		);
		

		$routes['timing'] = array(
			'route' => '/timing',
			'controller' => 'AppController',
			'action' => 'timing'
		);
		$routes['verificacurtida'] = array(
			'route' => '/verificacurtida',
			'controller' => 'AppController',
			'action' => 'verificacurtida'
		);
		$routes['verificacurtidacomentario'] = array(
			'route' => '/verificacurtidacomentario',
			'controller' => 'AppController',
			'action' => 'verificacurtidacomentario'
		);
		$routes['curtirComentario'] = array(
			'route' => '/curtirComentario',
			'controller' => 'AppController',
			'action' => 'curtirComentario'
		);
		$routes['descurtirComentario'] = array(
			'route' => '/descurtirComentario',
			'controller' => 'AppController',
			'action' => 'descurtirComentario'
		);
		
		
		$routes['getComentarios'] = array(
			'route' => '/getComentarios',
			'controller' => 'AppController',
			'action' => 'getComentarios'
		);
		$routes['getDataString'] = array(
			'route' => '/getDataString',
			'controller' => 'AppController',
			'action' => 'getDataString'
		); 
		$routes['timeline2'] = array(
			'route' => '/timeline2',
			'controller' => 'AppController',
			'action' => 'timeline2'
		); 

		$routes['getTotCurtidas'] = array(
			'route' => '/getTotCurtidas',
			'controller' => 'AppController',
			'action' => 'getTotCurtidas'
		); 
		$routes['getTotComentarios'] = array(
			'route' => '/getTotComentarios',
			'controller' => 'AppController',
			'action' => 'getTotComentarios'
		); 
		$routes['getTotComentarComentarios'] = array(
			'route' => '/getTotComentarComentarios',
			'controller' => 'AppController',
			'action' => 'getTotComentarComentarios'
		); 
		

		$routes['getSeuComentario'] = array(
			'route' => '/getSeuComentario',
			'controller' => 'AppController',
			'action' => 'getSeuComentario'
		); 
		$routes['getComentarComentarios'] = array(
			'route' => '/getComentarComentarios',
			'controller' => 'AppController',
			'action' => 'getComentarComentarios'
		); 
		$routes['getSeuComentarComentario'] = array(
			'route' => '/getSeuComentarComentario',
			'controller' => 'AppController',
			'action' => 'getSeuComentarComentario'
		); 
		$routes['salvarcomentarComentario'] = array(
			'route' => '/salvarcomentarComentario',
			'controller' => 'AppController',
			'action' => 'salvarcomentarComentario'
		); 
		$routes['mensagem'] = array(
			'route' => '/mensagem',
			'controller' => 'MensagemController',
			'action' => 'mensagem'
		); 

		//rotas DE CONFIGURACAO
		$routes['deletarconta'] = array(
			'route' => '/deletarconta',
			'controller' => 'ConfiguracaoController',
			'action' => 'deletarconta'
		);
		$routes['denunciarPostagem'] = array(
			'route' => '/denunciarPostagem',
			'controller' => 'ConfiguracaoController',
			'action' => 'denunciarPostagem'
		);
		$routes['mudarsenha'] = array(
			'route' => '/mudarsenha',
			'controller' => 'ConfiguracaoController',
			'action' => 'mudarsenha'
		);


		

		$this->setRoutes($routes);
	}

}

?>