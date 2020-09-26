-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 26-Set-2020 às 23:25
-- Versão do servidor: 10.4.11-MariaDB
-- versão do PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `artplace`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `sender` int(11) NOT NULL,
  `reciever` int(11) NOT NULL,
  `messsage` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `imageOrVideo` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `creation` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `comentarcomentarios`
--

CREATE TABLE `comentarcomentarios` (
  `id` int(11) NOT NULL,
  `id_comentario` int(11) NOT NULL,
  `id_usuario_comentou` int(11) NOT NULL,
  `textoComentario` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `arquivoComentario` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `horaComentario` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `comentarcomentarios`
--

INSERT INTO `comentarcomentarios` (`id`, `id_comentario`, `id_usuario_comentou`, `textoComentario`, `arquivoComentario`, `horaComentario`) VALUES
(1, 65, 8, 'muito daora', '', '2020-09-24 16:42:03'),
(4, 65, 6, 'sim eu agradeçooo', '', '2020-09-24 16:42:03'),
(5, 65, 5, 'muito bom msmmmm', '', '2020-09-24 16:42:03'),
(6, 65, 4, 'vc foi incrivel', '', '2020-09-24 21:19:50'),
(7, 65, 2, 'tambemmmmmmm amei', '', '2020-09-24 21:20:10'),
(8, 65, 6, 'maravilha', '', '2020-09-24 21:20:37'),
(9, 65, 8, 'BOM', '', '2020-09-25 20:55:16'),
(10, 65, 8, 'geovanna', '', '2020-09-25 21:01:28'),
(11, 65, 8, 'aaaaaaaaaaaa', '', '2020-09-25 21:04:55'),
(12, 65, 8, 'é isso', '', '2020-09-25 21:07:04');

-- --------------------------------------------------------

--
-- Estrutura da tabela `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `id_usuario_comentou` int(11) NOT NULL,
  `id_postagem` int(11) NOT NULL,
  `textoComentario` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `arquivoComentario` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `horaComentario` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `comentarios`
--

INSERT INTO `comentarios` (`id`, `id_usuario_comentou`, `id_postagem`, `textoComentario`, `arquivoComentario`, `horaComentario`) VALUES
(38, 40, 25, 'muito bom', 'analu12_619636evelyn2_590438pexels-freestocksorg-185517.jpg', '2020-09-20 20:43:18'),
(39, 40, 26, 'eu tb', 'analu12_500495evelyn2_333137pexels-artem-3660029.jpg', '2020-09-20 20:54:38'),
(40, 40, 26, 'ola', 'analu12_902449evelyn2_590438pexels-freestocksorg-185517.jpg', '2020-09-20 21:27:29'),
(41, 40, 26, 'oi', 'analu12_856267pexels-daria-sannikova-3375417.jpg', '2020-09-20 21:28:38'),
(42, 40, 26, 'teste', 'analu12_3363015.mp4', '2020-09-20 21:29:01'),
(43, 40, 15, 'teste', 'analu12_29666pexels-sharon-mccutcheon-1209843.jpg', '2020-09-20 21:30:11'),
(44, 40, 26, 'oi', '', '2020-09-20 22:40:39'),
(45, 40, 25, 'ola', 'analu12_24746816.jpg', '2020-09-21 00:20:20'),
(46, 40, 28, 'oi', '', '2020-09-21 14:28:15'),
(47, 6, 28, 'ficou lindo', '', '2020-09-21 14:32:05'),
(48, 8, 30, 'oi', '', '2020-09-21 22:06:17'),
(49, 8, 30, 'ola', '', '2020-09-21 22:06:31'),
(50, 40, 30, 'olaaa', '', '2020-09-21 22:16:20'),
(51, 8, 30, 'aaaaa', '', '2020-09-22 14:48:03'),
(52, 8, 30, 'oi', '', '2020-09-22 14:49:19'),
(53, 8, 30, 'ola', '', '2020-09-22 15:03:15'),
(54, 8, 30, 'helou', '', '2020-09-22 15:08:17'),
(55, 8, 28, 'ola', '', '2020-09-22 15:08:41'),
(56, 8, 26, 'legal', '', '2020-09-22 15:18:37'),
(57, 8, 26, 'parabens', '', '2020-09-22 15:19:37'),
(58, 8, 26, 'ola', '', '2020-09-22 15:20:43'),
(59, 8, 19, 'oi', '', '2020-09-23 15:14:41'),
(60, 8, 27, 'oi', '', '2020-09-23 15:39:03'),
(61, 8, 24, 'quero ver', '', '2020-09-23 15:40:18'),
(62, 8, 24, 'relou', '', '2020-09-23 15:47:25'),
(63, 8, 24, 'me mostra', '', '2020-09-23 15:50:40'),
(64, 8, 24, 'gostaria de ver', '', '2020-09-23 15:58:00'),
(65, 8, 25, 'curti bastante', '', '2020-09-23 16:11:26'),
(66, 8, 24, 'AAAAAAAAAAAAA me manda', '', '2020-09-23 16:19:07'),
(67, 8, 24, 'eu amei muitooo', '', '2020-09-23 16:24:38'),
(68, 8, 24, 'MERDA ME MANDA', '', '2020-09-23 16:29:07'),
(69, 5, 24, 'que bacanaaa ', '', '2020-09-23 18:46:09');

-- --------------------------------------------------------

--
-- Estrutura da tabela `conversa`
--

CREATE TABLE `conversa` (
  `id` int(11) NOT NULL,
  `mainUser` int(11) NOT NULL,
  `otherUser` int(11) NOT NULL,
  `unread` varchar(1) COLLATE utf8_unicode_ci DEFAULT 'n',
  `modification` timestamp NOT NULL DEFAULT current_timestamp(),
  `creation` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `curtidascomentarios`
--

CREATE TABLE `curtidascomentarios` (
  `id` int(11) NOT NULL,
  `id_comentario` int(11) NOT NULL,
  `id_usuario_curtiu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `curtidaspostagem`
--

CREATE TABLE `curtidaspostagem` (
  `id` int(11) NOT NULL,
  `id_postagem` int(11) NOT NULL,
  `id_usuario_curtiu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `curtidaspostagem`
--

INSERT INTO `curtidaspostagem` (`id`, `id_postagem`, `id_usuario_curtiu`) VALUES
(1, 1, 2),
(4, 1, 3),
(5, 1, 5),
(7, 6, 1),
(8, 6, 7),
(9, 25, 1),
(21, 25, 40),
(22, 1, 40),
(23, 24, 40),
(24, 22, 40),
(26, 21, 40),
(40, 40, 40),
(42, 28, 40),
(43, 30, 40),
(44, 30, 8);

-- --------------------------------------------------------

--
-- Estrutura da tabela `postagens`
--

CREATE TABLE `postagens` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `textoPostagem` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `arquivo` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `data` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `postagens`
--

INSERT INTO `postagens` (`id`, `id_usuario`, `textoPostagem`, `arquivo`, `data`) VALUES
(1, 4, 'boa noite minha imagem', 'maria12_5124714.jpg', '2020-09-15 22:17:43'),
(2, 4, 'fotos tiradas ontem', 'maria12_9951073.jpg', '2020-09-15 22:19:08'),
(3, 4, 'achei linda essa foto', 'maria12_6751991.jpg', '2020-09-15 22:19:48'),
(4, 8, 'tarde na praia', 'evelyn2_88458218.jpg', '2020-09-16 15:23:39'),
(5, 8, 'foto da amiga', 'evelyn2_62142417.jpg', '2020-09-16 15:24:09'),
(6, 8, 'meu namo é lindo', 'evelyn2_1279215.jpg', '2020-09-16 15:24:26'),
(7, 8, 'adorei essa foto da @maria', 'evelyn2_48128424.jpg', '2020-09-16 15:25:47'),
(8, 9, 'oi gente,sigam minha amiga @milena12', 'marcela_9743667.jpg', '2020-09-16 15:27:12'),
(9, 9, 'queria q meu dia fosse bom', '', '2020-09-16 15:40:54'),
(10, 11, 'sou fotografa e vim mostrar um pouco do meu trabalho', 'milena12_55072920.jpg', '2020-09-16 15:42:54'),
(11, 11, 'foto do alan', 'milena12_55318711.jpg', '2020-09-16 15:43:18'),
(12, 11, 'projeto de fotos em sp', 'milena12_55025812.jpg', '2020-09-16 15:43:49'),
(13, 10, 'sou o matheus e vou mostrar um pouco do meu trabalho, atriz : @maria123', 'matheus123_87829922.jpg', '2020-09-16 15:46:47'),
(14, 10, 'ensaio da @fernanda', 'matheus123_13499521.jpg', '2020-09-16 15:47:32'),
(15, 10, 'foto do @joao5142', 'matheus123_44377113.jpg', '2020-09-16 15:47:58'),
(16, 1, 'foto do bro @marcos', 'joao5142_58688215.jpg', '2020-09-16 16:18:02'),
(17, 1, 'oi', 'joao5142_28060025.jpg', '2020-09-16 16:18:20'),
(18, 2, 'oi amores', 'evely_3010085.jpg', '2020-09-16 16:19:34'),
(19, 2, 'meu namo é lindo', 'evely_52793714.jpg', '2020-09-16 16:20:16'),
(20, 2, 'eu faço artes digitais ', '', '2020-09-16 16:23:53'),
(21, 5, 'boa tarde,alguem para conversar sobre arte moderna?', '', '2020-09-16 16:25:18'),
(22, 5, 'gostaria de fazer amizade ', '', '2020-09-16 16:25:30'),
(23, 40, 'oi sou ana lu', '', '2020-09-16 16:39:23'),
(24, 40, 'mais tarde estarei postando alguns desenhos q fiz', '', '2020-09-16 16:39:44'),
(25, 40, 'fiz alguns desenhos de league of legends', '', '2020-09-16 16:40:57'),
(26, 40, 'sou nova aqui', '', '2020-09-16 16:43:05'),
(27, 40, 'oi', '', '2020-09-16 16:45:25'),
(28, 40, 'video demonstrando minha pintura', 'analu12_4435247.mp4', '2020-09-16 21:13:43'),
(30, 1, 'oi repost da imagem', 'joao5142_677067joao5142_1020825.jpg', '2020-09-19 13:28:38');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `picture` varchar(1000) COLLATE utf8_unicode_ci DEFAULT 'user.jpg',
  `online` datetime DEFAULT NULL,
  `token` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `secure` int(11) NOT NULL,
  `creation` datetime DEFAULT NULL,
  `password` varchar(70) COLLATE utf8_unicode_ci DEFAULT NULL,
  `wallpaper` varchar(1000) COLLATE utf8_unicode_ci DEFAULT '1.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `name`, `username`, `email`, `picture`, `online`, `token`, `secure`, `creation`, `password`, `wallpaper`) VALUES
(1, 'João Paulo Ferreira Neto', 'joao5142', 'joaopaulo3687@hotmail.com', 'joao5142_1020825.jpg', '2020-08-25 20:56:52', '84deb4943e7b340ff48f1771c94944a13610889b', 2147483647, '2020-08-25 20:56:52', '$2y$10$30sjJSxsa4zPQ.Ey8UujxO3DZ45/P2CE6dSDXA/YHecH/KgV3tF0q', '1.png'),
(2, 'Evely Silva', 'evely', 'evelysilva@hotmail.com', 'evely_53185.jpg', '2020-08-29 23:09:23', '091ca51d3dccf7ea3137a889e23c66c934694210', 2147483647, '2020-08-29 23:09:23', '$2y$10$2zs/StmZpjo3zCytjXQdIOS8Lo7ugYV3jr/sgDd8n6Dur1DVmMDxW', '1.png'),
(3, 'Joao Mariano', 'joaomariano123', 'joaomariano2150@hotmail.com', 'user.jpg', '2020-09-05 16:44:30', '8a17e4f1129426e9729e2d5531872339e4ec1cae', 2147483647, '2020-09-05 16:44:30', '$2y$10$9n87mE8.YfpRcYDwxnRAa.SlBZ/TbQTOtfRy/ux95wektgapxr4Z.', '1.png'),
(4, 'Maria Antonia', 'maria12', 'maria@hotmail.com', 'maria12_999024user1.jpg', '2020-09-06 01:36:42', '104c142aa8d2ac4efab9dd13bad89c8173162928', 2147483647, '2020-09-06 01:36:42', '$2y$10$lKAoF5VEpp22bPPcOEFSaeZKOVGCqEoBBwc4CnZwd47PDm9Mp25q6', '1.png'),
(5, 'João Victor', 'joao2150', 'joaovictor3636@hotmail.com', 'user3.jpg', '2020-08-25 20:56:52', '84deb4943e7b340ff48f1771c94944a13610889b', 2147483647, '2020-08-25 20:56:52', '$2y$10$30sjJSxsa4zPQ.Ey8UujxO3DZ45/P2CE6dSDXA/YHecH/KgV3tF0q', '1.png'),
(6, 'Maria elena', 'maria123', 'maria12@hotmail.com', 'pexels-freestocksorg-185517.jpg', '2020-08-25 20:57:35', '894b1ea0fb37cef3ca847c112e5bed8d604824f7', 2147483647, '2020-08-25 20:57:35', '$2y$10$ePEoxZboIJU.Hh43yhqZ4OlruW/FWFc/ET.YkhD0AVDtjc65OjmF6', '1.png'),
(7, 'Marcos Pereira', 'marcos', 'marcos@hotmail.com', 'user.jpg', '2020-08-29 23:08:35', '36341dd0fd6f07dc4fd509798626f6aa5b58be83', 2147483647, '2020-08-29 23:08:35', '$2y$10$K3DgURYTf3E54qDp.80sueY95bU3UYglpwIEiLXDPdatPlY7OxwLq', '1.png'),
(8, 'Evelyn Carla', 'evelyn2', 'evelyn2@hotmail.com', 'evelyn2_333137pexels-artem-3660029.jpg', '2020-08-29 23:09:23', '091ca51d3dccf7ea3137a889e23c66c934694210', 2147483647, '2020-08-29 23:09:23', '$2y$10$2zs/StmZpjo3zCytjXQdIOS8Lo7ugYV3jr/sgDd8n6Dur1DVmMDxW', '1.png'),
(9, 'Marcela franthesca', 'marcela', 'marcela@hotmail.com', 'pexels-anderson-miranda-2682667.jpg', '2020-08-29 23:10:48', '8747f750f99a2b9219633a07030bb9d83dead8fb', 2147483647, '2020-08-29 23:10:48', '$2y$10$osKmMlNxUeOe7Li590QdbOJ1kDzJI4ZMkzevPq7Ga1YOaNNy2w/yy', '1.png'),
(10, 'Matheus Oliveira', 'matheus123', 'matheus@hotmail.com', 'matheus123_71368.jpg', '2020-08-29 23:11:10', '609d8d941f430fb0899b5f52f9b6cc7ee32a6475', 310342202, '2020-08-29 23:11:10', '$2y$10$fBHjvD0G5pwoqtEHa9XlkOUHwtd2vXsFp9lQDZDFNYRi15saiyNg2', '1.png'),
(11, 'Milena Carla', 'milena12', 'milena@gmail.com', 'milena12_3742757.jpg', '2020-08-30 00:26:48', '3325301a17191712bf24c826e36edc4314bfc8ae', 2147483647, '2020-08-30 00:26:48', '$2y$10$wkWv6VapVWefDFuidNHnRen8HEBA44N6jbo6ERii/xeQuV.rWpmLC', '1.png'),
(40, 'Ana Lu', 'analu12', 'analu@hotmail.com', 'analu12_808624pexels-roman-koval-4178779.jpg', '2020-09-16 16:38:13', '4fb5e4750201c73a8fc7a269eb3072be49d12191', 2147483647, '2020-09-16 16:38:13', '$2y$10$wpKPn/Q694lf/ktUK27Dpu9KC8ROYSpY44Yje8SKIXYBSjDrkYqx6', '1.png');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario_seguindo`
--

CREATE TABLE `usuario_seguindo` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_usuario_seguindo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `usuario_seguindo`
--

INSERT INTO `usuario_seguindo` (`id`, `id_usuario`, `id_usuario_seguindo`) VALUES
(1, 40, 8),
(4, 40, 1),
(5, 2, 40),
(6, 8, 40),
(7, 3, 40),
(8, 7, 40),
(9, 9, 40),
(20, 5, 40),
(21, 8, 40),
(22, 3, 40),
(23, 7, 40),
(24, 9, 40);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `comentarcomentarios`
--
ALTER TABLE `comentarcomentarios`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `conversa`
--
ALTER TABLE `conversa`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `curtidascomentarios`
--
ALTER TABLE `curtidascomentarios`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `curtidaspostagem`
--
ALTER TABLE `curtidaspostagem`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `postagens`
--
ALTER TABLE `postagens`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices para tabela `usuario_seguindo`
--
ALTER TABLE `usuario_seguindo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `comentarcomentarios`
--
ALTER TABLE `comentarcomentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT de tabela `conversa`
--
ALTER TABLE `conversa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `curtidascomentarios`
--
ALTER TABLE `curtidascomentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `curtidaspostagem`
--
ALTER TABLE `curtidaspostagem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de tabela `postagens`
--
ALTER TABLE `postagens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de tabela `usuario_seguindo`
--
ALTER TABLE `usuario_seguindo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
