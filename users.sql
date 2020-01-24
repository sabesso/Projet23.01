-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : shareddb-r.hosting.stackcp.net
-- Généré le :  mar. 21 jan. 2020 à 07:47
-- Version du serveur :  10.2.29-MariaDB-log
-- Version de PHP :  7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `database-313233f07a`
--

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `page_id` int(11) NOT NULL,
  `Username` text CHARACTER SET utf8 NOT NULL,
  `Email` text CHARACTER SET utf8 NOT NULL,
  `Password1` text CHARACTER SET utf8 NOT NULL,
  `Comment` text CHARACTER SET utf8 NOT NULL,
  `ConfirmationEmail` varchar(60) DEFAULT NULL,
  `ConfirmedStatus` tinyint(1) DEFAULT NULL,
  `InscriptionDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `page_id`, `Username`, `Email`, `Password1`, `Comment`, `ConfirmationEmail`, `ConfirmedStatus`, `InscriptionDate`) VALUES
(40, 0, 'kenza', 'iderkenza1@gmail.com', '$2y$12$fcCAtGhdUdTgqUIgiltd7.uy7Aq5VOX6MZnnca91SYoCD8/XNzY8O', '', NULL, 1, '2020-01-20 07:55:02'),
(48, 0, 'said', 'sabesso@hotmail.com', '$2y$12$FPuhlfTInBJfk6VkhJH0beQRYCZyItF3bijSbumJYbztxdgaxekKK', '', NULL, 1, '2020-01-20 21:26:56'),
(49, 0, 'Cannn', 'xxxcann@gmail.com', '$2y$12$3yes82jlSzf/MqfcNPCjWeCh.v3c.Yr39F9LXaqPd8xOL4A7u2VhO', '', 'vZrodPJ0MUsFH9su2yHjaqZfqc8woIPDfqxdoF0CbkaSjI2hIciVMv7mNfx9', 0, '2020-01-20 21:29:02');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
