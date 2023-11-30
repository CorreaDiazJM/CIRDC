-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 30-11-2023 a las 05:27:37
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `CIRDC`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Comentarios`
--

CREATE TABLE `Comentarios` (
  `id_com` int(32) NOT NULL,
  `comentario_com` varchar(200) NOT NULL,
  `id_doc_com` int(32) NOT NULL,
  `id_usu_com` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Comentarios`
--

INSERT INTO `Comentarios` (`id_com`, `comentario_com`, `id_doc_com`, `id_usu_com`) VALUES
(1, 'asdf', 23, 11),
(2, 'asdf', 23, 11),
(3, 'fd', 23, 11),
(4, 'f', 23, 11),
(5, 's', 23, 11),
(6, 'avcx', 23, 11),
(7, 'adrew', 23, 11),
(25, ' dfs asd', 23, 11),
(26, 'dfsd df', 23, 11),
(27, '435ggd', 23, 11),
(28, '4fg dfg43', 23, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Compras`
--

CREATE TABLE `Compras` (
  `id_com` int(32) NOT NULL,
  `cantidad_com` int(20) NOT NULL,
  `id_comprador_com` int(32) NOT NULL,
  `id_ven_com` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Compras`
--

INSERT INTO `Compras` (`id_com`, `cantidad_com`, `id_comprador_com`, `id_ven_com`) VALUES
(1, 1, 11, 3),
(2, 1, 11, 1),
(3, 1, 11, 1),
(4, 1, 11, 4),
(5, 1, 11, 4),
(6, 1, 11, 4),
(7, 1, 11, 4),
(8, 1, 11, 4),
(9, 1, 11, 4),
(10, 1, 11, 4),
(11, 1, 11, 4),
(12, 1, 11, 4),
(13, 1, 11, 4),
(14, 1, 11, 3),
(15, 1, 11, 3),
(16, 1, 11, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Documentos`
--

CREATE TABLE `Documentos` (
  `id_doc` int(32) NOT NULL,
  `titulo_doc` varchar(65) NOT NULL,
  `contenido_doc` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Documentos`
--

INSERT INTO `Documentos` (`id_doc`, `titulo_doc`, `contenido_doc`) VALUES
(23, 'abc', 'abc'),
(24, 'nuevo', ' esto es un nuevo documento'),
(25, 'prueba', 'oatrañ asdf sdfsñkfjasfñkasjfñaksdfjasñfjañdsfjañsdfjasñdjfasñdfjasñkfdj');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Roles`
--

CREATE TABLE `Roles` (
  `id_rol` int(32) NOT NULL,
  `rol_rol` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Roles`
--

INSERT INTO `Roles` (`id_rol`, `rol_rol`) VALUES
(1, 'Administrador'),
(6, 'Nivel 1'),
(5, 'Nivel 2'),
(4, 'Nivel 3'),
(3, 'Nivel 4'),
(2, 'Nivel 5');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Rol_Documento`
--

CREATE TABLE `Rol_Documento` (
  `id_roldoc` int(32) NOT NULL,
  `id_rol_roldoc` int(32) NOT NULL,
  `id_doc_roldoc` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Rol_Documento`
--

INSERT INTO `Rol_Documento` (`id_roldoc`, `id_rol_roldoc`, `id_doc_roldoc`) VALUES
(21, 6, 23),
(22, 1, 24),
(23, 6, 25);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuarios`
--

CREATE TABLE `Usuarios` (
  `id_usu` int(32) NOT NULL,
  `nombre_usu` varchar(30) NOT NULL,
  `apellido_usu` varchar(30) NOT NULL,
  `usuario_usu` varchar(40) NOT NULL,
  `password_usu` varchar(100) NOT NULL,
  `id_rol_usu` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Usuarios`
--

INSERT INTO `Usuarios` (`id_usu`, `nombre_usu`, `apellido_usu`, `usuario_usu`, `password_usu`, `id_rol_usu`) VALUES
(6, 'José', 'Correa', 'jose121correa', '$2b$10$aS3LM.E1IM4OhSIT5w1vju..C0ibhNLrXrozixx9c3cMpz9.7vA8a', 6),
(11, 'Impostor 1', 'Correa', 'jose', '$2b$10$H0lXChhgQKepW7oIiEXWxe7wuRNuHuY5DH4C5w3a1CZ/Dnym8lG1q', 5),
(17, 'Admin', 'Correa', 'admin', '$2b$10$iqtKrqhKdyoT.zFDnuVuzeKZviostS1gO3R4WtXbD91Ns15H6sOgC', 1),
(18, 'José', 'García', 'jsgarcia', '$2b$10$eERG5Ix6AMMH8vqhq.KHF.w6tDjFe12YmlCLNvxl9lW303FytrphC', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuario_Documento`
--

CREATE TABLE `Usuario_Documento` (
  `id_usudoc` int(32) NOT NULL,
  `id_usu_usudoc` int(32) NOT NULL,
  `id_doc_usudoc` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Usuario_Documento`
--

INSERT INTO `Usuario_Documento` (`id_usudoc`, `id_usu_usudoc`, `id_doc_usudoc`) VALUES
(18, 6, 23),
(19, 17, 24),
(20, 18, 25);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Ventas`
--

CREATE TABLE `Ventas` (
  `id_ven` int(32) NOT NULL,
  `producto_ven` varchar(200) NOT NULL,
  `cantidad_ven` int(20) NOT NULL,
  `id_usu_ven` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Ventas`
--

INSERT INTO `Ventas` (`id_ven`, `producto_ven`, `cantidad_ven`, `id_usu_ven`) VALUES
(1, 'cabezas', 20, 6),
(3, 'scsc', 7, 6),
(4, 'dasdsa', 35, 6),
(5, 'cabezas', 17, 17),
(6, 'scsc', 49, 11);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Comentarios`
--
ALTER TABLE `Comentarios`
  ADD PRIMARY KEY (`id_com`),
  ADD KEY `id_doc_com` (`id_doc_com`),
  ADD KEY `id_usu_com` (`id_usu_com`);

--
-- Indices de la tabla `Compras`
--
ALTER TABLE `Compras`
  ADD PRIMARY KEY (`id_com`),
  ADD KEY `id_comprador_com` (`id_comprador_com`),
  ADD KEY `id_ven_com` (`id_ven_com`);

--
-- Indices de la tabla `Documentos`
--
ALTER TABLE `Documentos`
  ADD PRIMARY KEY (`id_doc`);

--
-- Indices de la tabla `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`id_rol`),
  ADD UNIQUE KEY `rol_rol` (`rol_rol`);

--
-- Indices de la tabla `Rol_Documento`
--
ALTER TABLE `Rol_Documento`
  ADD PRIMARY KEY (`id_roldoc`),
  ADD KEY `id_rol_roldoc` (`id_rol_roldoc`),
  ADD KEY `id_doc_roldoc` (`id_doc_roldoc`);

--
-- Indices de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`id_usu`),
  ADD UNIQUE KEY `usuario_usu` (`usuario_usu`),
  ADD KEY `id_rol_usu` (`id_rol_usu`);

--
-- Indices de la tabla `Usuario_Documento`
--
ALTER TABLE `Usuario_Documento`
  ADD PRIMARY KEY (`id_usudoc`),
  ADD KEY `id_usu_usudoc` (`id_usu_usudoc`),
  ADD KEY `id_doc_usudoc` (`id_doc_usudoc`);

--
-- Indices de la tabla `Ventas`
--
ALTER TABLE `Ventas`
  ADD PRIMARY KEY (`id_ven`),
  ADD KEY `id_usu_ven` (`id_usu_ven`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Comentarios`
--
ALTER TABLE `Comentarios`
  MODIFY `id_com` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `Compras`
--
ALTER TABLE `Compras`
  MODIFY `id_com` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `Documentos`
--
ALTER TABLE `Documentos`
  MODIFY `id_doc` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `Roles`
--
ALTER TABLE `Roles`
  MODIFY `id_rol` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `Rol_Documento`
--
ALTER TABLE `Rol_Documento`
  MODIFY `id_roldoc` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `id_usu` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `Usuario_Documento`
--
ALTER TABLE `Usuario_Documento`
  MODIFY `id_usudoc` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `Ventas`
--
ALTER TABLE `Ventas`
  MODIFY `id_ven` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Comentarios`
--
ALTER TABLE `Comentarios`
  ADD CONSTRAINT `Comentarios_ibfk_1` FOREIGN KEY (`id_doc_com`) REFERENCES `Documentos` (`id_doc`) ON DELETE CASCADE,
  ADD CONSTRAINT `Comentarios_ibfk_2` FOREIGN KEY (`id_usu_com`) REFERENCES `Usuarios` (`id_usu`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Compras`
--
ALTER TABLE `Compras`
  ADD CONSTRAINT `Compras_ibfk_1` FOREIGN KEY (`id_comprador_com`) REFERENCES `Usuarios` (`id_usu`),
  ADD CONSTRAINT `Compras_ibfk_2` FOREIGN KEY (`id_ven_com`) REFERENCES `Ventas` (`id_ven`);

--
-- Filtros para la tabla `Rol_Documento`
--
ALTER TABLE `Rol_Documento`
  ADD CONSTRAINT `Rol_Documento_ibfk_1` FOREIGN KEY (`id_rol_roldoc`) REFERENCES `Roles` (`id_rol`),
  ADD CONSTRAINT `Rol_Documento_ibfk_2` FOREIGN KEY (`id_doc_roldoc`) REFERENCES `Documentos` (`id_doc`);

--
-- Filtros para la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD CONSTRAINT `Usuarios_ibfk_1` FOREIGN KEY (`id_rol_usu`) REFERENCES `Roles` (`id_rol`);

--
-- Filtros para la tabla `Usuario_Documento`
--
ALTER TABLE `Usuario_Documento`
  ADD CONSTRAINT `Usuario_Documento_ibfk_1` FOREIGN KEY (`id_usu_usudoc`) REFERENCES `Usuarios` (`id_usu`) ON DELETE CASCADE,
  ADD CONSTRAINT `Usuario_Documento_ibfk_2` FOREIGN KEY (`id_doc_usudoc`) REFERENCES `Documentos` (`id_doc`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Ventas`
--
ALTER TABLE `Ventas`
  ADD CONSTRAINT `Ventas_ibfk_1` FOREIGN KEY (`id_usu_ven`) REFERENCES `Usuarios` (`id_usu`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
