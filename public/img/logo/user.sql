-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 06-Set-2020 às 15:51
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
-- Banco de dados: `quicktalk`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(70) COLLATE utf8_unicode_ci NOT NULL,
  `picture` varchar(1000) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'user.jpg',
  `online` datetime NOT NULL,
  `token` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `secure` int(11) NOT NULL,
  `creation` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `picture`, `online`, `token`, `secure`, `creation`) VALUES
(3, 'joao5142', 'joaopaulo3687@hotmail.com', '$2y$10$30sjJSxsa4zPQ.Ey8UujxO3DZ45/P2CE6dSDXA/YHecH/KgV3tF0q', 'joao5142_170646de0eqx7-350719e9-2066-41f0-a0bc-ff52fe50b765.png', '2020-08-25 20:56:52', '84deb4943e7b340ff48f1771c94944a13610889b', 2147483647, '2020-08-25 20:56:52'),
(4, 'maria123', 'maria@hotmail.com', '$2y$10$ePEoxZboIJU.Hh43yhqZ4OlruW/FWFc/ET.YkhD0AVDtjc65OjmF6', 'maria123_919501085370.png', '2020-08-25 20:57:35', '894b1ea0fb37cef3ca847c112e5bed8d604824f7', 2147483647, '2020-08-25 20:57:35'),
(5, 'marcos', 'marcos@hotmail.com', '$2y$10$K3DgURYTf3E54qDp.80sueY95bU3UYglpwIEiLXDPdatPlY7OxwLq', 'user.jpg', '2020-08-29 23:08:35', '36341dd0fd6f07dc4fd509798626f6aa5b58be83', 2147483647, '2020-08-29 23:08:35'),
(6, 'evelyn', 'evelyn@hotmail.com', '$2y$10$2zs/StmZpjo3zCytjXQdIOS8Lo7ugYV3jr/sgDd8n6Dur1DVmMDxW', 'evelyn_36159coven_leblanc___wallpaper_by_nahla17_de0ojve.png', '2020-08-29 23:09:23', '091ca51d3dccf7ea3137a889e23c66c934694210', 2147483647, '2020-08-29 23:09:23'),
(7, 'marcela', 'marcela@hotmail.com', '$2y$10$osKmMlNxUeOe7Li590QdbOJ1kDzJI4ZMkzevPq7Ga1YOaNNy2w/yy', 'marcela_566900psyops_sona_by_nahla17_de408n8.png', '2020-08-29 23:10:48', '8747f750f99a2b9219633a07030bb9d83dead8fb', 2147483647, '2020-08-29 23:10:48'),
(8, 'matheus123', 'matheus@hotmail.com', '$2y$10$fBHjvD0G5pwoqtEHa9XlkOUHwtd2vXsFp9lQDZDFNYRi15saiyNg2', 'matheus123_106836spirit_blossom_yone___wallpaper_by_nahla17_de27dof.png', '2020-08-29 23:11:10', '609d8d941f430fb0899b5f52f9b6cc7ee32a6475', 310342202, '2020-08-29 23:11:10'),
(9, 'milena12', 'milena@gmail.com', '$2y$10$wkWv6VapVWefDFuidNHnRen8HEBA44N6jbo6ERii/xeQuV.rWpmLC', 'milena12_344063spirit_blossom_cassiopeia_by_nahla17_de2b4md.png', '2020-08-30 00:26:48', '3325301a17191712bf24c826e36edc4314bfc8ae', 2147483647, '2020-08-30 00:26:48');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
