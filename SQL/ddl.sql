/* DB 생성 */
CREATE DATABASE `mapsharing` DEFAULT CHARACTER SET utf8mb4;

/* User */
CREATE TABLE `users` (
  `userIdx` int NOT NULL AUTO_INCREMENT,
  `kakaoId` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `profileImage` varchar(150) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userIdx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Map */
CREATE TABLE `maps` (
  `mapIdx` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `desc` varchar(200) DEFAULT NULL,
  `color` int DEFAULT NULL,
  `open` int DEFAULT NULL,
  PRIMARY KEY (`mapIdx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Place */
CREATE TABLE `places` (
  `placeIdx` int NOT NULL AUTO_INCREMENT,
  `mapIdx` int DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `reserve` int DEFAULT NULL,
  `reservedDay` datetime DEFAULT NULL,
  PRIMARY KEY (`placeIdx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Invite */
CREATE TABLE `invites` (
  `inviteIdx` int NOT NULL AUTO_INCREMENT,
  `mapIdx` int DEFAULT NULL,
  `kakaoId` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`inviteIdx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* Comment */
CREATE TABLE `comments` (
  `commentIdx` int NOT NULL AUTO_INCREMENT,
  `placeIdx` int DEFAULT NULL,
  `kakaoId` varchar(50) DEFAULT NULL,
  `rate` int DEFAULT NULL,
  `content` varchar(100) DEFAULT NULL,
  `regDay` datetime DEFAULT NULL,
  PRIMARY KEY (`commentIdx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;