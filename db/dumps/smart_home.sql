-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-server:3306
-- Generation Time: Dec 11, 2023 at 12:02 AM
-- Server version: 5.7.43
-- PHP Version: 8.2.8

CREATE DATABASE IF NOT EXISTS smart_home;

USE smart_home;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smart_home`
--

-- --------------------------------------------------------

--
-- Table structure for table `Devices`
--

CREATE TABLE `Devices` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `description` varchar(128) NOT NULL,
  `state` tinyint(1) NOT NULL,
  `type` int(11) NOT NULL,
  `binario` tinyint(1) NOT NULL,
  `initial_value` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Devices`
--

INSERT INTO `Devices` (`id`, `name`, `description`, `state`, `type`, `binario`, `initial_value`, `id_user`) VALUES
(1, 'Lampara 1', 'Luz living', 1, 0, 0, 69, 1),
(2, 'Lampara 2', 'Luz cocina', 0, 0, 0, 80, 1),
(3, 'Velador', 'Velador living', 1, 0, 0, 0, 1),
(4, 'Persiana 1', 'Persiana living', 1, 1, 0, 0, 1),
(5, 'Persiana 2', 'Persiana de la cocina', 1, 1, 0, 0, 1),
(6, 'Persiana 3', 'Persiana balcon', 0, 1, 0, 0, 1),
(7, 'Lampara 1', 'Lampara entrada', 0, 0, 0, 0, 2),
(8, 'Lampara 2', 'Lampara cocina', 1, 0, 0, 0, 2),
(9, 'Cortina 1', 'Cortina Living', 1, 1, 0, 50, 2),
(10, 'Ventilador 1', 'Ventilador habitacion', 0, 2, 0, 0, 2),
(11, 'TV 1', 'TV Living', 1, 3, 1, 0, 2),
(12, 'Garage 1', 'Garage principal', 0, 5, 1, 0, 3),
(13, 'TV 1', 'TV habitacion', 1, 3, 1, 0, 3),
(14, 'Lampara 1', 'Lampara Cocina', 0, 0, 0, 70, 3),
(15, 'Cortina 1', 'Cortina habitacion', 1, 1, 0, 0, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Tipos_dispositivos`
--

CREATE TABLE `Tipos_dispositivos` (
  `id_tipo` int(11) NOT NULL,
  `descripcion` varchar(64) NOT NULL,
  `binario` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Tipos_dispositivos`
--

INSERT INTO `Tipos_dispositivos` (`id_tipo`, `descripcion`, `binario`) VALUES
(0, 'Lampara', 1),
(1, 'Persiana', 1),
(2, 'Ventilador', 1),
(3, 'Television', 0),
(5, 'Garage', 0);

-- --------------------------------------------------------

--
-- Table structure for table `Usuarios`
--

CREATE TABLE `Usuarios` (
  `id_user` int(11) NOT NULL,
  `user` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `supervisor` tinyint(1) NOT NULL,
  `nombre` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Usuarios`
--

INSERT INTO `Usuarios` (`id_user`, `user`, `password`, `supervisor`, `nombre`) VALUES
(1, 'pablo.salas', 'password', 1, 'Pablo Salas'),
(2, 'matias.ramos', 'password', 0, 'Matias Ramos'),
(3, 'alfred.pennyworth', 'password', 0, 'Alfred Pennyworth');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Devices`
--
ALTER TABLE `Devices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Tipos_dispositivos`
--
ALTER TABLE `Tipos_dispositivos`
  ADD PRIMARY KEY (`id_tipo`);

--
-- Indexes for table `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Devices`
--
ALTER TABLE `Devices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `Tipos_dispositivos`
--
ALTER TABLE `Tipos_dispositivos`
  MODIFY `id_tipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;