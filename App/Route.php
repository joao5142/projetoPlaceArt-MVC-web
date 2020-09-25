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

		$routes['criarpostagem'] = array(
			'route' => '/criarpostagem',
			'controller' => 'AppController',
			'action' => 'criarpostagem'
		);

		$routes['perfil'] = array(
			'route' => '/perfil',
			'controller' => 'AppController',
			'action' => 'perfil'
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
			'controller' => 'AppController',
			'action' => 'atualizarWallpaperPerfil'
		);
		$routes['salvarcomentario'] = array(
			'route' => '/salvarcomentario',
			'controller' => 'AppController',
			'action' => 'salvarcomentario'
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

		

		$this->setRoutes($routes);
	}

}

?>