-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-06-2019 a las 13:05:36
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `paris8`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `IDCARRITO` int(3) NOT NULL,
  `CODPRODUCTO` int(6) DEFAULT NULL,
  `IDCLIENTE` int(11) NOT NULL,
  `CANTIDAD` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `IDCATEGORIA` int(6) NOT NULL,
  `NOMBRE` varchar(20) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`IDCATEGORIA`, `NOMBRE`) VALUES
(1, 'carne'),
(2, 'pescado'),
(3, 'entrantes'),
(4, 'postre'),
(6, 'pastas'),
(8, 'bebidas'),
(9, '12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `IDCOMENTARIO` int(3) NOT NULL,
  `IDCLIENTE` int(11) NOT NULL,
  `COMENTARIO` varchar(800) COLLATE utf8_spanish2_ci NOT NULL,
  `FECHA` date NOT NULL,
  `PUNTAJE` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_facturas`
--

CREATE TABLE `detalle_facturas` (
  `ID` int(11) NOT NULL,
  `ID_FACTURA` int(11) NOT NULL,
  `CANTIDAD` int(11) NOT NULL,
  `CODPRODUCTO` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `detalle_facturas`
--

INSERT INTO `detalle_facturas` (`ID`, `ID_FACTURA`, `CANTIDAD`, `CODPRODUCTO`) VALUES
(1, 1, 1, 1),
(3, 2, 1, 1),
(4, 3, 1, 1),
(7, 2, 4, 3),
(8, 2, 5, 7),
(9, 3, 1, 4),
(10, 3, 2, 5),
(11, 3, 4, 11),
(14, 6, 1, 3),
(15, 6, 2, 8),
(16, 8, 1, 1),
(18, 8, 15, 7),
(19, 8, 1, 12),
(20, 9, 2, 11),
(21, 9, 1, 12),
(22, 10, 2, 3),
(23, 6, 2, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `ID` int(11) NOT NULL,
  `NUMERO` varchar(8) COLLATE utf8_spanish2_ci NOT NULL,
  `ID_CLIENTE` varchar(11) COLLATE utf8_spanish2_ci NOT NULL,
  `FECHA` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `facturas`
--

INSERT INTO `facturas` (`ID`, `NUMERO`, `ID_CLIENTE`, `FECHA`) VALUES
(1, 'FE01', '7', '2019-06-05'),
(2, 'FE01643', '13', '2019-06-05'),
(3, 'FE0909', '11', '2019-06-05'),
(6, 'FE01590', '11', '2019-06-05'),
(8, 'FE012', '7', '2019-06-06'),
(9, 'FE0636', '11', '2019-06-06'),
(10, 'FE02583', '11', '2019-06-06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `CODPRODUCTO` int(6) NOT NULL,
  `NOMBRE` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `DESCRIPCION` varchar(3000) COLLATE utf8_spanish2_ci NOT NULL,
  `FOTO` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `PRECIO` double(4,2) NOT NULL,
  `TIPOIVA` int(3) NOT NULL,
  `CATEGORIA` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`CODPRODUCTO`, `NOMBRE`, `DESCRIPCION`, `FOTO`, `PRECIO`, `TIPOIVA`, `CATEGORIA`) VALUES
(1, 'coca cola zero', 'bebida a base de gas', 'cocazero.jpg', 1.50, 5, 8),
(3, 'Anticuchos ', 'Carne de corazon de pollo', 'anticuchos.jpeg', 2.50, 2, 1),
(4, 'Carne con Tomate', 'carne de cerdo con salsa roja de tomate fresco ', 'carnetomate.jpg', 2.50, 5, 1),
(5, 'Ensalada de Atun', 'Ensalada a base de lechuga con pimientos y atun', 'ensaladaAtun.jpg', 5.50, 5, 3),
(6, 'Guacamole', 'Entrada a base de aguacate y verduras', 'guacamole.jpg', 3.00, 2, 3),
(7, 'Ensaladilla', 'Ensalada de patata con lengumbres y mayonesa', 'ensaladilla.jpg', 2.00, 5, 3),
(8, 'Lomo saltado', 'Comida echa de arroz ,patatas y carne frita', 'lomosaltado.jpg', 8.00, 5, 1),
(9, 'Papa Huancaina', 'Papa con crema de aji amarillo y huevo', 'papaHuancaina.jpg', 2.50, 5, 3),
(10, 'Pescado a la plancha', 'Pescado echo a la plancha con legumbres', 'pescadoPlancha.jpg', 6.50, 2, 2),
(11, 'Variado Frito', 'Variado de pescado frito', 'pescadofrito.jpg', 7.00, 8, 2),
(12, 'Tarta de queso', 'Tarta con base de galleta maria y queso', 'tartaqueso.jpg', 5.50, 2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `COD` int(3) NOT NULL,
  `NOMBRE` varchar(10) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`COD`, `NOMBRE`) VALUES
(100, 'admin'),
(101, 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `apellidos` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `clave` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `tipo` int(3) NOT NULL,
  `dni` varchar(9) COLLATE utf8_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellidos`, `clave`, `email`, `tipo`, `dni`) VALUES
(7, 'carolyne', 'fernandez', '437612e345ed8c59db6e905a8dc0d1c6', 'caro@gmail.com', 100, '20503311F'),
(11, 'ERIC ', 'PIERR', '29988429c481f219b8c5ba8c071440e1', 'eric@gmail.com', 101, '20503311F'),
(13, 'MARIO', 'HERRRERA', 'c20ad4d76fe97759aa27a0c99bff6710', 'rigo@mail.com', 101, '20502727k');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`IDCARRITO`),
  ADD KEY `IDCLIENTE` (`IDCLIENTE`),
  ADD KEY `CODPRODUCTO` (`CODPRODUCTO`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`IDCATEGORIA`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`IDCOMENTARIO`),
  ADD KEY `IDCLIENTE` (`IDCLIENTE`);

--
-- Indices de la tabla `detalle_facturas`
--
ALTER TABLE `detalle_facturas`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CODPRODUCTO` (`CODPRODUCTO`),
  ADD KEY `ID_FACTURA` (`ID_FACTURA`);

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`CODPRODUCTO`),
  ADD KEY `CATEGORIA` (`CATEGORIA`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`COD`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipo` (`tipo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `IDCARRITO` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `IDCATEGORIA` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `IDCOMENTARIO` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_facturas`
--
ALTER TABLE `detalle_facturas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `facturas`
--
ALTER TABLE `facturas`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `CODPRODUCTO` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`IDCLIENTE`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`CODPRODUCTO`) REFERENCES `productos` (`CODPRODUCTO`);

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`IDCLIENTE`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `detalle_facturas`
--
ALTER TABLE `detalle_facturas`
  ADD CONSTRAINT `detalle_facturas_ibfk_1` FOREIGN KEY (`CODPRODUCTO`) REFERENCES `productos` (`CODPRODUCTO`),
  ADD CONSTRAINT `detalle_facturas_ibfk_2` FOREIGN KEY (`ID_FACTURA`) REFERENCES `facturas` (`ID`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`CATEGORIA`) REFERENCES `categorias` (`IDCATEGORIA`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`tipo`) REFERENCES `roles` (`COD`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
