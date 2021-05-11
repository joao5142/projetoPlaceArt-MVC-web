-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 17-Nov-2020 às 20:17
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
  `message` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `imageOrVideo` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `creation` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `chat`
--

INSERT INTO `chat` (`id`, `sender`, `reciever`, `message`, `imageOrVideo`, `creation`) VALUES
(1, 40, 1, 'oi pao', '', '2020-10-02 18:17:36'),
(2, 40, 1, 'oi pao', '', '2020-10-02 18:19:43'),
(3, 40, 1, 'seja bem vinda', '', '2020-10-02 18:23:12'),
(4, 40, 1, 'aaaaaa', '', '2020-10-02 21:52:16'),
(5, 40, 1, 'oiii', '', '2020-10-02 21:53:28'),
(6, 40, 1, 'oi j', '', '2020-10-02 21:55:08'),
(7, 40, 1, 'fala', '', '2020-10-02 22:01:43'),
(8, 40, 1, 'oi', '', '2020-10-02 22:06:14'),
(9, 40, 1, 'aaaa', '', '2020-10-02 22:08:10'),
(10, 40, 1, 'aaa', '', '2020-10-02 22:09:33'),
(11, 40, 1, 'vLK', '', '2020-10-02 22:11:43'),
(12, 40, 1, 'xau', '', '2020-10-02 22:14:03'),
(13, 40, 1, 'oi pao', '', '2020-10-02 22:16:05'),
(14, 40, 1, 'aaaaaaaaaaa', '', '2020-10-02 22:17:01'),
(15, 40, 1, 'oi p', '', '2020-10-02 22:25:20'),
(16, 40, 1, 'aaa', '', '2020-10-02 22:29:10'),
(17, 40, 1, 'sadas', '', '2020-10-02 22:30:20'),
(18, 1, 40, 'oi ana', '', '2020-10-03 14:46:14'),
(19, 1, 40, 'desculpa nao ter visto antes', '', '2020-10-03 14:46:35'),
(20, 40, 1, 'tudo bem', '', '2020-10-03 14:47:23'),
(21, 1, 40, 'voce é linda ', '', '2020-10-03 14:54:51'),
(22, 1, 40, 'voce é linda ', 'joao5142_MESSAGE_539494wp2287808-syndra-wallpapers2.png', '2020-10-03 14:56:07'),
(23, 40, 1, 'voce q é  lindo', '', '2020-10-03 15:04:46'),
(24, 40, 1, 'simm', '', '2020-10-03 15:13:10'),
(25, 40, 1, '', 'analu12_MESSAGE_96511wp2287808-syndra-wallpapers2.png', '2020-10-03 15:13:30'),
(26, 40, 1, '', 'analu12_MESSAGE_360654spirit_blossom_riven___wallpaper_by_nahla17_de1uh90.png', '2020-10-03 15:39:07'),
(27, 40, 1, '', 'analu12_MESSAGE_904614spirit_blossom_yone___wallpaper_by_nahla17_de27dof.png', '2020-10-03 16:27:34'),
(28, 40, 1, 'oi', '', '2020-10-03 16:41:49'),
(29, 40, 8, 'oi eve', '', '2020-10-03 17:04:32'),
(30, 40, 8, 'gostaria de ser seu amigo', '', '2020-10-03 23:31:36'),
(31, 40, 11, 'oi milena', '', '2020-10-03 23:32:06'),
(32, 40, 11, 'tudo bem ?', '', '2020-10-03 23:32:11'),
(33, 40, 6, 'ola maria', '', '2020-10-08 23:40:27'),
(34, 1, 40, 'voce esta bem ?', '', '2020-10-08 23:49:18'),
(35, 40, 1, 'to sim e vc ', '', '2020-10-08 23:50:00'),
(36, 11, 40, 'tudo sim e ctg', '', '2020-10-08 23:52:57'),
(37, 40, 11, 'ta tudo bem , oq ce ta fazendo ?', '', '2020-10-08 23:58:35'),
(38, 40, 11, 'aaaa', '', '2020-10-08 23:59:01'),
(39, 40, 11, 'okai', '', '2020-10-08 23:59:05'),
(40, 40, 11, 'certo', '', '2020-10-08 23:59:48'),
(41, 11, 40, 'certo', '', '2020-10-08 23:59:54'),
(42, 11, 40, 'nao sei', '', '2020-10-09 00:00:10'),
(43, 40, 11, 'aaaa', '', '2020-10-09 00:00:19'),
(44, 40, 11, 'bl', '', '2020-10-09 00:00:26'),
(45, 1, 40, 'oi ana ', '', '2020-10-12 23:09:13'),
(46, 1, 40, 'aqui ta muito ruim', '', '2020-10-12 23:09:23'),
(47, 1, 40, 'de fazer', '', '2020-10-12 23:09:28'),
(48, 1, 40, 'oi', '', '2020-10-12 23:12:46'),
(49, 1, 40, 'oi', '', '2020-10-12 23:12:51'),
(50, 41, 1, 'oi joao', '', '2020-10-13 15:45:39'),
(51, 1, 45, 'oi', '', '2020-10-13 21:40:27'),
(52, 45, 1, 'oi', '', '2020-10-13 21:40:54'),
(53, 1, 45, 'tudo bem ?', '', '2020-10-13 21:41:04'),
(54, 45, 1, 'tudo sim e com vc ?', '', '2020-10-13 21:41:15'),
(55, 45, 1, 'oi aaa', '', '2020-10-15 12:41:32'),
(56, 45, 1, 'oi aa', '', '2020-10-15 12:44:08'),
(57, 45, 1, 'mamamia', '', '2020-10-15 12:46:44'),
(58, 45, 1, 'aaa', '', '2020-10-15 12:48:13'),
(59, 45, 1, 'oi', '', '2020-10-15 12:49:25'),
(60, 45, 1, 'bla', '', '2020-10-15 12:51:33'),
(61, 45, 1, 'ma', '', '2020-10-15 12:53:27'),
(62, 45, 1, 'oi', '', '2020-10-15 12:55:48'),
(63, 45, 1, 'vc é lindo', '', '2020-10-15 12:57:11'),
(64, 1, 45, 'oi sa', '', '2020-10-15 12:58:09'),
(65, 1, 45, 'tudo bem ctg ?', '', '2020-10-15 12:58:24'),
(66, 1, 45, 'vc esta bem ?', '', '2020-10-15 13:09:24'),
(67, 40, 45, 'oi sa', '', '2020-10-15 19:56:38'),
(68, 45, 40, 'oi', '', '2020-10-15 19:57:10'),
(69, 45, 40, 'tudo bem ?', '', '2020-10-15 19:57:22'),
(70, 40, 45, 'tudo sim e ctg ?', '', '2020-10-15 19:57:38'),
(71, 45, 40, 'to bem e vc ?', '', '2020-10-15 19:57:45'),
(72, 40, 45, 'to sim ', '', '2020-10-15 19:57:53'),
(73, 40, 45, 'estou com suad', '', '2020-10-15 19:57:57'),
(74, 45, 40, 'que bom', '', '2020-10-15 19:58:03'),
(75, 45, 40, 'espero q continue assim', '', '2020-10-15 19:58:08'),
(76, 40, 45, 'eu tb ', '', '2020-10-15 19:58:15'),
(77, 45, 40, 'massa', '', '2020-10-15 19:59:43'),
(78, 45, 40, 'vc esta linda ', '', '2020-10-15 19:59:55'),
(79, 45, 40, 'ultimamente', '', '2020-10-15 20:00:03'),
(80, 45, 40, 'sabia ???', '', '2020-10-15 20:00:11'),
(81, 45, 40, 'pois é ', '', '2020-10-15 20:00:16'),
(82, 45, 40, 'ola', '', '2020-10-15 20:01:11'),
(83, 45, 40, 'oi', '', '2020-10-15 20:02:36'),
(84, 45, 40, 'a', '', '2020-10-15 20:07:50'),
(85, 45, 40, 'a', '', '2020-10-15 20:08:16'),
(86, 45, 40, 'vc é linda', '', '2020-10-15 20:08:25'),
(87, 45, 40, 'okaio ?', '', '2020-10-15 20:08:32'),
(88, 45, 40, 'e maraviilhosa', '', '2020-10-15 20:08:37'),
(89, 40, 6, 'tudo bem ?', '', '2020-10-30 16:48:54'),
(90, 40, 2, 'oi evely', '', '2020-11-08 00:19:34');

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
(12, 65, 8, 'é isso', '', '2020-09-25 21:07:04'),
(13, 65, 40, 'xabalu ficou incrivel', '', '2020-09-29 16:59:25'),
(14, 76, 40, 'maravilha ', '', '2020-09-29 17:01:46'),
(15, 76, 40, 'pena q ngm se importa', '', '2020-09-29 17:02:15'),
(16, 54, 40, 'achei lindo msm em', '', '2020-10-01 14:33:15'),
(17, 91, 40, 'oi', '', '2020-11-04 17:14:00'),
(18, 91, 40, 'tudo bem ?', '', '2020-11-04 17:14:06'),
(19, 87, 40, 'oi', '', '2020-11-04 17:28:29');

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
(69, 5, 24, 'que bacanaaa ', '', '2020-09-23 18:46:09'),
(70, 8, 20, 'perfeito', '', '2020-09-27 20:38:50'),
(71, 8, 20, 'adorei', '', '2020-09-27 20:42:42'),
(72, 8, 20, 'entao ta joia', '', '2020-09-27 20:46:06'),
(73, 8, 19, 'amei', '', '2020-09-27 20:46:39'),
(74, 8, 19, 'oi', '', '2020-09-27 20:47:59'),
(75, 8, 19, 'alou', '', '2020-09-27 20:55:07'),
(76, 8, 19, 'ele é sim', '', '2020-09-27 21:04:16'),
(77, 8, 0, 'oi vc é lindo', '', '2020-09-28 12:01:43'),
(78, 8, 15, 'ta lindo ', 'evelyn2_921151evelyn2_501022pexels-elijah-o\'donnell-3894557.jpg', '2020-09-29 01:18:30'),
(79, 8, 18, 'sim amor', 'evelyn2_9942884.mp4', '2020-09-29 01:21:19'),
(80, 40, 19, 'AAAAAAAAAAAA MASSA', '', '2020-09-29 17:02:51'),
(81, 40, 10, 'milena carla esta incrivel', '', '2020-10-01 14:46:39'),
(82, 40, 10, 'parabens por tudo okai', '', '2020-10-01 14:46:50'),
(83, 40, 30, ',muito bom amigo', '', '2020-10-08 23:38:16'),
(84, 40, 30, 'adorei', '', '2020-10-08 23:38:24'),
(85, 40, 33, 'voce tem certeza?', '', '2020-10-08 23:42:50'),
(86, 40, 33, 'aaa', '', '2020-10-08 23:42:58'),
(87, 45, 43, 'incrivel', '', '2020-10-15 11:00:49'),
(88, 45, 10, 'oi', '', '2020-10-15 11:10:38'),
(89, 45, 11, 'lindo ele', '', '2020-10-15 11:10:54'),
(90, 45, 44, 'teste comentario 1', '', '2020-10-30 16:38:27'),
(91, 45, 44, 'teste comentario 2', '', '2020-10-30 16:38:35'),
(92, 40, 41, 'teste comentario', '', '2020-10-30 16:43:00');

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

--
-- Extraindo dados da tabela `conversa`
--

INSERT INTO `conversa` (`id`, `mainUser`, `otherUser`, `unread`, `modification`, `creation`) VALUES
(7, 40, 1, 'y', '2020-10-02 21:17:35', '2020-10-02 18:17:35'),
(8, 1, 40, 'y', '2020-10-02 21:17:36', '2020-10-02 18:17:36'),
(9, 40, 8, 'n', '2020-10-03 20:04:32', '2020-10-03 17:04:32'),
(10, 8, 40, 'y', '2020-10-03 20:04:32', '2020-10-03 17:04:32'),
(11, 40, 11, 'y', '2020-10-04 02:32:05', '2020-10-03 23:32:05'),
(12, 11, 40, 'y', '2020-10-04 02:32:05', '2020-10-03 23:32:05'),
(13, 40, 6, 'n', '2020-10-09 02:40:27', '2020-10-08 23:40:27'),
(14, 6, 40, 'y', '2020-10-09 02:40:27', '2020-10-08 23:40:27'),
(17, 1, 45, 'y', '2020-10-14 00:40:27', '2020-10-13 21:40:27'),
(18, 45, 1, 'y', '2020-10-14 00:40:27', '2020-10-13 21:40:27'),
(19, 40, 45, 'y', '2020-10-15 22:56:38', '2020-10-15 19:56:38'),
(20, 45, 40, 'y', '2020-10-15 22:56:38', '2020-10-15 19:56:38'),
(21, 40, 2, 'n', '2020-11-08 03:19:34', '2020-11-08 00:19:34'),
(22, 2, 40, 'y', '2020-11-08 03:19:34', '2020-11-08 00:19:34');

-- --------------------------------------------------------

--
-- Estrutura da tabela `curtidascomentarios`
--

CREATE TABLE `curtidascomentarios` (
  `id` int(11) NOT NULL,
  `id_comentario` int(11) NOT NULL,
  `id_usuario_curtiu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `curtidascomentarios`
--

INSERT INTO `curtidascomentarios` (`id`, `id_comentario`, `id_usuario_curtiu`) VALUES
(3, 86, 40),
(5, 0, 45),
(6, 91, 40),
(7, 90, 40);

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
(42, 28, 40),
(43, 30, 40),
(44, 30, 8),
(45, 19, 8),
(46, 16, 8),
(47, 18, 8),
(48, 17, 8),
(49, 15, 8),
(50, 14, 8),
(52, 33, 40),
(53, 86, 40),
(54, 44, 40);

-- --------------------------------------------------------

--
-- Estrutura da tabela `denunciarpostagem`
--

CREATE TABLE `denunciarpostagem` (
  `id` int(11) NOT NULL,
  `id_postagem` int(11) NOT NULL,
  `mensagem` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `arquivo` varchar(1000) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `denunciarpostagem`
--

INSERT INTO `denunciarpostagem` (`id`, `id_postagem`, `mensagem`, `arquivo`) VALUES
(1, 44, 'oi', ''),
(2, 44, 'denuncia', '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `galeria`
--

CREATE TABLE `galeria` (
  `id` int(11) NOT NULL,
  `imagem` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `posicao` int(11) NOT NULL,
  `usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `galeria`
--

INSERT INTO `galeria` (`id`, `imagem`, `posicao`, `usuario`) VALUES
(127, 'analu12_256747analu12_640894sabrina12_60454859518b2ba679a.png', 1, 40),
(128, 'mountain1.jpg', 2, 40),
(129, 'mountain2.jpg', 3, 40),
(130, 'analu12_568601sabrina12_626983c-o-annie-origins-16.jpg', 4, 40),
(131, 'analu12_359523analu12_5162631085370.png', 5, 40),
(132, 'mountain3.jpg', 6, 40),
(133, 'img (73).jpg', 1, 42),
(134, 'mountain1.jpg', 2, 42),
(135, 'mountain2.jpg', 3, 42),
(136, 'img (35).jpg', 4, 42),
(137, 'img (18).jpg', 5, 42),
(138, 'mountain3.jpg', 6, 42),
(139, 'img (73).jpg', 1, 46),
(140, 'mountain1.jpg', 2, 46),
(141, 'mountain2.jpg', 3, 46),
(142, 'img (35).jpg', 4, 46),
(143, 'img (18).jpg', 5, 46),
(144, 'mountain3.jpg', 6, 46),
(145, 'img (73).jpg', 1, 2),
(146, 'mountain1.jpg', 2, 2),
(147, 'mountain2.jpg', 3, 2),
(148, 'img (35).jpg', 4, 2),
(149, 'img (18).jpg', 5, 2),
(150, 'mountain3.jpg', 6, 2),
(151, 'img (73).jpg', 1, 8),
(152, 'mountain1.jpg', 2, 8),
(153, 'mountain2.jpg', 3, 8),
(154, 'img (35).jpg', 4, 8),
(155, 'img (18).jpg', 5, 8),
(156, 'mountain3.jpg', 6, 8),
(157, 'img (73).jpg', 1, 44),
(158, 'mountain1.jpg', 2, 44),
(159, 'mountain2.jpg', 3, 44),
(160, 'img (35).jpg', 4, 44),
(161, 'img (18).jpg', 5, 44),
(162, 'mountain3.jpg', 6, 44),
(163, 'img (73).jpg', 1, 5),
(164, 'mountain1.jpg', 2, 5),
(165, 'mountain2.jpg', 3, 5),
(166, 'img (35).jpg', 4, 5),
(167, 'img (18).jpg', 5, 5),
(168, 'mountain3.jpg', 6, 5),
(169, 'img (73).jpg', 1, 1),
(170, 'mountain1.jpg', 2, 1),
(171, 'mountain2.jpg', 3, 1),
(172, 'img (35).jpg', 4, 1),
(173, 'img (18).jpg', 5, 1),
(174, 'mountain3.jpg', 6, 1),
(175, 'img (73).jpg', 1, 3),
(176, 'mountain1.jpg', 2, 3),
(177, 'mountain2.jpg', 3, 3),
(178, 'img (35).jpg', 4, 3),
(179, 'img (18).jpg', 5, 3),
(180, 'mountain3.jpg', 6, 3),
(181, 'img (73).jpg', 1, 47),
(182, 'mountain1.jpg', 2, 47),
(183, 'mountain2.jpg', 3, 47),
(184, 'img (35).jpg', 4, 47),
(185, 'img (18).jpg', 5, 47),
(186, 'mountain3.jpg', 6, 47),
(187, 'img (73).jpg', 1, 48),
(188, 'mountain1.jpg', 2, 48),
(189, 'mountain2.jpg', 3, 48),
(190, 'img (35).jpg', 4, 48),
(191, 'img (18).jpg', 5, 48),
(192, 'mountain3.jpg', 6, 48),
(193, 'img (73).jpg', 1, 9),
(194, 'mountain1.jpg', 2, 9),
(195, 'mountain2.jpg', 3, 9),
(196, 'img (35).jpg', 4, 9),
(197, 'img (18).jpg', 5, 9),
(198, 'mountain3.jpg', 6, 9),
(199, 'img (73).jpg', 1, 7),
(200, 'mountain1.jpg', 2, 7),
(201, 'mountain2.jpg', 3, 7),
(202, 'img (35).jpg', 4, 7),
(203, 'img (18).jpg', 5, 7),
(204, 'mountain3.jpg', 6, 7),
(205, 'img (73).jpg', 1, 4),
(206, 'mountain1.jpg', 2, 4),
(207, 'mountain2.jpg', 3, 4),
(208, 'img (35).jpg', 4, 4),
(209, 'img (18).jpg', 5, 4),
(210, 'mountain3.jpg', 6, 4),
(211, 'img (73).jpg', 1, 6),
(212, 'mountain1.jpg', 2, 6),
(213, 'mountain2.jpg', 3, 6),
(214, 'img (35).jpg', 4, 6),
(215, 'img (18).jpg', 5, 6),
(216, 'mountain3.jpg', 6, 6),
(217, 'img (73).jpg', 1, 10),
(218, 'mountain1.jpg', 2, 10),
(219, 'mountain2.jpg', 3, 10),
(220, 'img (35).jpg', 4, 10),
(221, 'img (18).jpg', 5, 10),
(222, 'mountain3.jpg', 6, 10),
(223, 'img (73).jpg', 1, 11),
(224, 'mountain1.jpg', 2, 11),
(225, 'mountain2.jpg', 3, 11),
(226, 'img (35).jpg', 4, 11),
(227, 'img (18).jpg', 5, 11),
(228, 'mountain3.jpg', 6, 11),
(229, 'img (73).jpg', 1, 43),
(230, 'mountain1.jpg', 2, 43),
(231, 'mountain2.jpg', 3, 43),
(232, 'img (35).jpg', 4, 43),
(233, 'img (18).jpg', 5, 43),
(234, 'mountain3.jpg', 6, 43),
(235, 'img (73).jpg', 1, 45),
(236, 'mountain1.jpg', 2, 45),
(237, 'mountain2.jpg', 3, 45),
(238, 'img (35).jpg', 4, 45),
(239, 'img (18).jpg', 5, 45),
(240, 'mountain3.jpg', 6, 45),
(241, 'img (73).jpg', 1, 49),
(242, 'mountain1.jpg', 2, 49),
(243, 'mountain2.jpg', 3, 49),
(244, 'img (35).jpg', 4, 49),
(245, 'img (18).jpg', 5, 49),
(246, 'mountain3.jpg', 6, 49);

-- --------------------------------------------------------

--
-- Estrutura da tabela `postagens`
--

CREATE TABLE `postagens` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `textoPostagem` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `arquivo` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `data` datetime DEFAULT current_timestamp(),
  `vender` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `postagens`
--

INSERT INTO `postagens` (`id`, `id_usuario`, `textoPostagem`, `arquivo`, `data`, `vender`) VALUES
(1, 4, 'boa noite minha imagem', 'maria12_5124714.jpg', '2020-09-15 22:17:43', 0),
(2, 4, 'fotos tiradas ontem', 'maria12_9951073.jpg', '2020-09-15 22:19:08', 0),
(3, 4, 'achei linda essa foto', 'maria12_6751991.jpg', '2020-09-15 22:19:48', 0),
(4, 8, 'tarde na praia', 'evelyn2_88458218.jpg', '2020-09-16 15:23:39', 0),
(5, 8, 'foto da amiga', 'evelyn2_62142417.jpg', '2020-09-16 15:24:09', 0),
(6, 8, 'meu namo é lindo', 'evelyn2_1279215.jpg', '2020-09-16 15:24:26', 0),
(7, 8, 'adorei essa foto da @maria', 'evelyn2_48128424.jpg', '2020-09-16 15:25:47', 0),
(8, 9, 'oi gente,sigam minha amiga @milena12', 'marcela_9743667.jpg', '2020-09-16 15:27:12', 0),
(9, 9, 'queria q meu dia fosse bom', '', '2020-09-16 15:40:54', 0),
(10, 11, 'sou fotografa e vim mostrar um pouco do meu trabalho', 'milena12_55072920.jpg', '2020-09-16 15:42:54', 0),
(11, 11, 'foto do alan', 'milena12_55318711.jpg', '2020-09-16 15:43:18', 0),
(12, 11, 'projeto de fotos em sp', 'milena12_55025812.jpg', '2020-09-16 15:43:49', 0),
(13, 10, 'sou o matheus e vou mostrar um pouco do meu trabalho, atriz : @maria123', 'matheus123_87829922.jpg', '2020-09-16 15:46:47', 0),
(14, 10, 'ensaio da @fernanda', 'matheus123_13499521.jpg', '2020-09-16 15:47:32', 0),
(15, 10, 'foto do @joao5142', 'matheus123_44377113.jpg', '2020-09-16 15:47:58', 0),
(16, 1, 'foto do bro @marcos', 'joao5142_58688215.jpg', '2020-09-16 16:18:02', 0),
(17, 1, 'oi', 'joao5142_28060025.jpg', '2020-09-16 16:18:20', 0),
(18, 2, 'oi amores', 'evely_3010085.jpg', '2020-09-16 16:19:34', 0),
(20, 2, 'eu faço artes digitais ', '', '2020-09-16 16:23:53', 0),
(21, 5, 'boa tarde,alguem para conversar sobre arte moderna?', '', '2020-09-16 16:25:18', 0),
(23, 40, 'oi sou ana lu', '', '2020-09-16 16:39:23', 0),
(24, 40, 'mais tarde estarei postando alguns desenhos q fiz', '', '2020-09-16 16:39:44', 0),
(25, 40, 'fiz alguns desenhos de league of legends', '', '2020-09-16 16:40:57', 0),
(28, 40, 'video demonstrando minha pintura', 'analu12_4435247.mp4', '2020-09-16 21:13:43', 0),
(30, 1, 'oi repost da imagem', 'joao5142_677067joao5142_1020825.jpg', '2020-09-19 13:28:38', 0),
(31, 40, 'oi faz tempo que nao posto nada', '', '2020-10-01 14:53:09', 0),
(32, 40, 'quero vender minha alma', '', '2020-10-08 01:41:48', 1),
(34, 40, 'uhu', '', '2020-10-08 20:49:45', 1),
(36, 40, '', 'analu12_9078164.mp4', '2020-10-12 20:23:08', 0),
(37, 40, '', 'analu12_4013856.mp4', '2020-10-12 20:25:40', 0),
(38, 40, 'teste 2', '', '2020-10-13 11:12:55', 0),
(39, 40, 'teste 1', '', '2020-10-13 11:13:01', 0),
(40, 40, 'teste 3', '', '2020-10-13 11:13:06', 0),
(41, 40, 'teste 4', '', '2020-10-13 11:13:12', 0),
(43, 45, 'minha arte digital', 'sabrina12_626983c-o-annie-origins-16.jpg', '2020-10-13 21:14:58', 0),
(44, 45, 'feito com photoshop e ilustrator', 'sabrina12_60454859518b2ba679a.png', '2020-10-13 21:15:36', 0),
(46, 40, 'teste postagem', '', '2020-10-30 16:47:39', 1);

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
  `wallpaper` varchar(1000) COLLATE utf8_unicode_ci DEFAULT '1.png',
  `onlineSN` varchar(1) COLLATE utf8_unicode_ci DEFAULT 'n'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `name`, `username`, `email`, `picture`, `online`, `token`, `secure`, `creation`, `password`, `wallpaper`, `onlineSN`) VALUES
(1, 'João Paulo Ferreira Neto', 'joao5142', 'joaopaulo3687@hotmail.com', 'joao5142_1020825.jpg', '2020-11-09 20:34:18', '84deb4943e7b340ff48f1771c94944a13610889b', 2147483647, '2020-08-25 20:56:52', '$2y$10$30sjJSxsa4zPQ.Ey8UujxO3DZ45/P2CE6dSDXA/YHecH/KgV3tF0q', '5.png', 'n'),
(2, 'Evely Silva', 'evely', 'evelysilva@hotmail.com', 'evely_53185.jpg', '2020-08-29 23:09:23', '091ca51d3dccf7ea3137a889e23c66c934694210', 2147483647, '2020-08-29 23:09:23', '$2y$10$2zs/StmZpjo3zCytjXQdIOS8Lo7ugYV3jr/sgDd8n6Dur1DVmMDxW', '1.png', 'n'),
(3, 'Joao Mariano', 'joaomariano123', 'joaomariano2150@hotmail.com', 'user.jpg', '2020-09-05 16:44:30', '8a17e4f1129426e9729e2d5531872339e4ec1cae', 2147483647, '2020-09-05 16:44:30', '$2y$10$9n87mE8.YfpRcYDwxnRAa.SlBZ/TbQTOtfRy/ux95wektgapxr4Z.', '1.png', 'n'),
(4, 'Maria Antonia', 'maria12', 'maria@hotmail.com', 'maria12_999024user1.jpg', '2020-09-06 01:36:42', '104c142aa8d2ac4efab9dd13bad89c8173162928', 2147483647, '2020-09-06 01:36:42', '$2y$10$lKAoF5VEpp22bPPcOEFSaeZKOVGCqEoBBwc4CnZwd47PDm9Mp25q6', '1.png', 'n'),
(5, 'João Victor', 'joao2150', 'joaovictor3636@hotmail.com', 'user3.jpg', '2020-08-25 20:56:52', '84deb4943e7b340ff48f1771c94944a13610889b', 2147483647, '2020-08-25 20:56:52', '$2y$10$30sjJSxsa4zPQ.Ey8UujxO3DZ45/P2CE6dSDXA/YHecH/KgV3tF0q', '1.png', 'n'),
(6, 'Maria elena', 'maria123', 'maria12@hotmail.com', 'pexels-freestocksorg-185517.jpg', '2020-08-25 20:57:35', '894b1ea0fb37cef3ca847c112e5bed8d604824f7', 2147483647, '2020-08-25 20:57:35', '$2y$10$ePEoxZboIJU.Hh43yhqZ4OlruW/FWFc/ET.YkhD0AVDtjc65OjmF6', '1.png', 'n'),
(7, 'Marcos Pereira', 'marcos', 'marcos@hotmail.com', 'user.jpg', '2020-08-29 23:08:35', '36341dd0fd6f07dc4fd509798626f6aa5b58be83', 2147483647, '2020-08-29 23:08:35', '$2y$10$K3DgURYTf3E54qDp.80sueY95bU3UYglpwIEiLXDPdatPlY7OxwLq', '1.png', 'n'),
(8, 'Evelyn Carla', 'evelyn2', 'evelyn2@hotmail.com', 'evelyn2_333137pexels-artem-3660029.jpg', '2020-08-29 23:09:23', '091ca51d3dccf7ea3137a889e23c66c934694210', 2147483647, '2020-08-29 23:09:23', '$2y$10$2zs/StmZpjo3zCytjXQdIOS8Lo7ugYV3jr/sgDd8n6Dur1DVmMDxW', '1.png', 'n'),
(9, 'Marcela franthesca', 'marcela', 'marcela@hotmail.com', 'pexels-anderson-miranda-2682667.jpg', '2020-08-29 23:10:48', '8747f750f99a2b9219633a07030bb9d83dead8fb', 2147483647, '2020-08-29 23:10:48', '$2y$10$osKmMlNxUeOe7Li590QdbOJ1kDzJI4ZMkzevPq7Ga1YOaNNy2w/yy', '1.png', 'n'),
(10, 'Matheus Oliveira', 'matheus123', 'matheus@hotmail.com', 'matheus123_71368.jpg', '2020-08-29 23:11:10', '609d8d941f430fb0899b5f52f9b6cc7ee32a6475', 310342202, '2020-08-29 23:11:10', '$2y$10$fBHjvD0G5pwoqtEHa9XlkOUHwtd2vXsFp9lQDZDFNYRi15saiyNg2', '1.png', 'n'),
(11, 'Milena Carla', 'milena12', 'milena@gmail.com', 'milena12_3742757.jpg', '2020-08-30 00:26:48', '3325301a17191712bf24c826e36edc4314bfc8ae', 2147483647, '2020-08-30 00:26:48', '$2y$10$wkWv6VapVWefDFuidNHnRen8HEBA44N6jbo6ERii/xeQuV.rWpmLC', '1.png', 'n'),
(40, 'Ana Lu', 'analu12', 'analu@hotmail.com', 'analu12_808624pexels-roman-koval-4178779.jpg', '2020-11-17 15:33:13', '4fb5e4750201c73a8fc7a269eb3072be49d12191', 2147483647, '2020-09-16 16:38:13', '$2y$10$3S90mdHOBkuqUZuSKf4Xwemk1DV4Z7y8XdOUsJsoUpO3SkWJiVi3e', '1.png', 's'),
(42, 'celine', 'celine12', 'celine@hotmail.com', 'user.jpg', '2020-10-13 20:39:10', '837e1014fccfbfd69191503b96db9e4e2380e0b1', 2147483647, '2020-10-13 20:39:10', '$2y$10$YB4xhVMvzTv3MmAxcf0ABulwKww5PPtReuMnFih8gV6N9eonQ3tJC', '1.png', 'n'),
(43, 'rebeca', 'rebeca12', 'rebeca@hotmail.com', 'user.jpg', '2020-10-13 20:40:34', 'd104825fe8c125779a36a11d40ca758c335b7f5e', 2147483647, '2020-10-13 20:40:34', '$2y$10$GEPcIaul0/d7R1gy9xN1HOYM2qWilLfK7Aby6ZQHKu7jxkakgicji', '1.png', 'n'),
(44, 'helen', 'helen12', 'helen@hotmail.com', 'user.jpg', '2020-10-13 20:42:42', '6e4b74da4e90a2214c3f685ca30a89d6d1551387', 2147483647, '2020-10-13 20:42:42', '$2y$10$oRv3NWhBYg0iJ3D4.oqGi.SYJS1WDKCBabR37bAH14DNk4DmWbtna', '1.png', 'n'),
(45, 'sabrina', 'sabrina12', 'sabrina@hotmail.com', 'sabrina12_16614924.jpg', '2020-10-13 20:44:40', '8246bb9366ed9cf917e3f89da7ada820d2341c82', 2147483647, '2020-10-13 20:44:40', '$2y$10$dANfYFBk.P2VjCMFK7bW2.29ANyS8p8ePvciayg.9KjomUIlmWbjS', '1.png', 'n'),
(46, 'debora', 'deb12', 'debora@hotmail.com', 'user.jpg', '2020-10-13 20:46:06', '2c8aed72deb984362c9f7160bc23aa65e569f23d', 1676852737, '2020-10-13 20:46:06', '$2y$10$6UVjFp/157Z3qJGULs3c7.C8CB2ZEND/oP0BYC2IY3TMQN4Zuyq3a', '1.png', 'n'),
(47, 'marta', 'ma12', 'marta@hotmail.com', 'user.jpg', '2020-10-13 20:51:14', '403fc6d973499e06e36297b098f1034bd44eaab7', 2147483647, '2020-10-13 20:51:14', '$2y$10$9e3JyF1ymQTQxzfhM5hihec2yR336FakuI74GuIK1/zoAYUClayiK', '1.png', 'n'),
(48, 'macia', 'maci1', 'marcia@hotmail.com', 'user.jpg', '2020-10-13 20:55:52', '13376c008b4c4e0202481bf155536168225942f8', 2147483647, '2020-10-13 20:55:52', '$2y$10$o2p/goI3Wvf0B4mCss.ecuCIZR.I89IX.6aoZ1esTfDrUdXqmQTSu', '1.png', 'n'),
(49, 'carlos', 'carlos41', 'carlos2150@hotmail.com', 'user.jpg', '2020-11-06 22:20:22', '99fe74b5c6772a5c6803442e2a36ff79bfe31ed5', 2147483647, '2020-11-06 22:20:22', '$2y$10$vp0BQoQSiQ/F9X7QrlYMOuZTQ9MscbsPFSbheTwLOlFBEhVjRrGge', '1.png', 'n');

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
(24, 9, 40),
(44, 45, 1),
(45, 45, 8),
(46, 45, 10),
(47, 40, 2),
(48, 40, 10);

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
-- Índices para tabela `denunciarpostagem`
--
ALTER TABLE `denunciarpostagem`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `galeria`
--
ALTER TABLE `galeria`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT de tabela `comentarcomentarios`
--
ALTER TABLE `comentarcomentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de tabela `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT de tabela `conversa`
--
ALTER TABLE `conversa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de tabela `curtidascomentarios`
--
ALTER TABLE `curtidascomentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `curtidaspostagem`
--
ALTER TABLE `curtidaspostagem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de tabela `denunciarpostagem`
--
ALTER TABLE `denunciarpostagem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `galeria`
--
ALTER TABLE `galeria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=247;

--
-- AUTO_INCREMENT de tabela `postagens`
--
ALTER TABLE `postagens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de tabela `usuario_seguindo`
--
ALTER TABLE `usuario_seguindo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
