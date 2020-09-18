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

		$this->setRoutes($routes);
	}

}

?>