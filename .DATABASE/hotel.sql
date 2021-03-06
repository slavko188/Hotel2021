/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS `hotel`;
CREATE DATABASE IF NOT EXISTS `hotel` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `hotel`;

DROP TABLE IF EXISTS `administrator`;
CREATE TABLE IF NOT EXISTS `administrator` (
  `administrator_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `password_hash` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `uq_administrator_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `administrator`;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` (`administrator_id`, `username`, `password_hash`) VALUES
	(1, 'milantex', '8FAB6FBD93973BDE5DBCF2DB71BFC18E1182204D382DC140AF37D846C0C09C744C54F14AF637B17B2FA30CFAF78C3E3CCBBDCDFA253ADF8623D594CC99E7766C'),
	(2, 'slavkotex', '353727383646dhdns73628hdu'),
	(3, 'NNemanja', 'F0E4B248BAFAF9650E7732AE836F973B13059E7A2A5C7C89644CDE171222C2FD93DD8E233557E4684765360A07103054A9F2354FB57C32E6FD3F9CBE31DA5A65');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;

DROP TABLE IF EXISTS `feature`;
CREATE TABLE IF NOT EXISTS `feature` (
  `feature_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`feature_id`),
  UNIQUE KEY `uq_feature_name` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `feature`;
/*!40000 ALTER TABLE `feature` DISABLE KEYS */;
INSERT INTO `feature` (`feature_id`, `name`) VALUES
	(5, 'bina'),
	(3, 'gardarober'),
	(2, 'hodnik'),
	(4, 'internet'),
	(6, 'ozvucenje'),
	(7, 'projektor za prezentaciju filma');
/*!40000 ALTER TABLE `feature` ENABLE KEYS */;

DROP TABLE IF EXISTS `hall`;
CREATE TABLE IF NOT EXISTS `hall` (
  `hall_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `surface` decimal(10,2) unsigned NOT NULL DEFAULT '0.00',
  `number_place` smallint(5) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`hall_id`),
  UNIQUE KEY `uq_hall_name` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `hall`;
/*!40000 ALTER TABLE `hall` DISABLE KEYS */;
INSERT INTO `hall` (`hall_id`, `name`, `surface`, `number_place`) VALUES
	(1, 'kongresna sala', 3102.00, 500),
	(2, 'sportska sala', 1000.00, 150);
/*!40000 ALTER TABLE `hall` ENABLE KEYS */;

DROP TABLE IF EXISTS `hall_feature`;
CREATE TABLE IF NOT EXISTS `hall_feature` (
  `hall_feature_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `hall_id` int(10) unsigned NOT NULL DEFAULT '0',
  `feature_id` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`hall_feature_id`) USING BTREE,
  UNIQUE KEY `uq_hall_feature_hall_id_feature_id` (`hall_id`,`feature_id`),
  KEY `fk_hall_feature_feature_id` (`feature_id`),
  CONSTRAINT `fk_hall_feature_feature_id` FOREIGN KEY (`feature_id`) REFERENCES `feature` (`feature_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_hall_feature_hall_id` FOREIGN KEY (`hall_id`) REFERENCES `hall` (`hall_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `hall_feature`;
/*!40000 ALTER TABLE `hall_feature` DISABLE KEYS */;
INSERT INTO `hall_feature` (`hall_feature_id`, `hall_id`, `feature_id`) VALUES
	(1, 1, 5),
	(2, 1, 6),
	(31, 2, 3),
	(3, 2, 6);
/*!40000 ALTER TABLE `hall_feature` ENABLE KEYS */;

DROP TABLE IF EXISTS `photo`;
CREATE TABLE IF NOT EXISTS `photo` (
  `photo_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `image_path` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`photo_id`),
  UNIQUE KEY `uq_photo_image_path` (`image_path`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `photo`;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;

DROP TABLE IF EXISTS `photo_hall`;
CREATE TABLE IF NOT EXISTS `photo_hall` (
  `photo_hall_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `hall_id` int(10) unsigned NOT NULL DEFAULT '0',
  `photo_id` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`photo_hall_id`) USING BTREE,
  UNIQUE KEY `uq_photo_hall_hall_id` (`hall_id`) USING BTREE,
  UNIQUE KEY `uq_photo_hall_photo_id` (`photo_id`) USING BTREE,
  CONSTRAINT `fk_photo_hall_hall_id` FOREIGN KEY (`hall_id`) REFERENCES `hall` (`hall_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_photo_hall_photo_id` FOREIGN KEY (`photo_id`) REFERENCES `photo` (`photo_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `photo_hall`;
/*!40000 ALTER TABLE `photo_hall` DISABLE KEYS */;
/*!40000 ALTER TABLE `photo_hall` ENABLE KEYS */;

DROP TABLE IF EXISTS `photo_room`;
CREATE TABLE IF NOT EXISTS `photo_room` (
  `photo_room_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `room_id` int(10) unsigned NOT NULL DEFAULT '0',
  `photo_id` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`photo_room_id`) USING BTREE,
  UNIQUE KEY `uq_photo_room_room_id` (`room_id`) USING BTREE,
  UNIQUE KEY `uq_photo_room_photo_id` (`photo_id`) USING BTREE,
  CONSTRAINT `fk_photo_room_photo_id` FOREIGN KEY (`photo_id`) REFERENCES `photo` (`photo_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_photo_room_room_id` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `photo_room`;
/*!40000 ALTER TABLE `photo_room` DISABLE KEYS */;
/*!40000 ALTER TABLE `photo_room` ENABLE KEYS */;

DROP TABLE IF EXISTS `room`;
CREATE TABLE IF NOT EXISTS `room` (
  `room_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `room_number` int(10) unsigned NOT NULL DEFAULT '0',
  `type_of_bed` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `number_of_beds` int(15) unsigned NOT NULL DEFAULT '0',
  `floor` int(30) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`room_id`),
  UNIQUE KEY `uq_room_room_number` (`room_number`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `room`;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` (`room_id`, `room_number`, `type_of_bed`, `number_of_beds`, `floor`) VALUES
	(1, 5, 'drveni', 3, 5),
	(2, 6, 'metalni', 2, 8),
	(3, 7, 'drveni', 4, 7),
	(4, 8, 'plasticni', 2, 8),
	(13, 4, 'drveni', 2, 3);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;

DROP TABLE IF EXISTS `room_feature`;
CREATE TABLE IF NOT EXISTS `room_feature` (
  `room_feature_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `room_id` int(10) unsigned NOT NULL DEFAULT '0',
  `feature_id` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`room_feature_id`),
  UNIQUE KEY `uq_room_feature_room_id_feature_id` (`room_id`,`feature_id`) USING BTREE,
  KEY `feature_id` (`feature_id`),
  CONSTRAINT `fk_room_feature_feature_id` FOREIGN KEY (`feature_id`) REFERENCES `feature` (`feature_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_room_feature_room_id` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `room_feature`;
/*!40000 ALTER TABLE `room_feature` DISABLE KEYS */;
INSERT INTO `room_feature` (`room_feature_id`, `room_id`, `feature_id`) VALUES
	(1, 1, 2),
	(3, 2, 3),
	(2, 4, 4);
/*!40000 ALTER TABLE `room_feature` ENABLE KEYS */;

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `forename` varchar(64) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `surname` varchar(64) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `phone_number` varchar(24) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `password_hash` varchar(128) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `postal_address` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_email` (`email`) USING BTREE,
  UNIQUE KEY `uq_user_phone_number` (`phone_number`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_id`, `email`, `forename`, `surname`, `phone_number`, `password_hash`, `postal_address`) VALUES
	(1, 'slavkoroganovic888@gmail.com', 'slavko', 'Roganovic', '069 888999', '9CD4D3F52DD115C4464B690BE843ABBF90DD5CEE289F69D4C8A780B347D96501FAF1E25837C035B38C5AFBE5732AFB91764BB267A736058C8C82FB8D526BFF5B', '');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

DROP TABLE IF EXISTS `user_hall`;
CREATE TABLE IF NOT EXISTS `user_hall` (
  `user_hall_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL DEFAULT '0',
  `hall_id` int(10) unsigned NOT NULL DEFAULT '0',
  `checks_in_at` datetime NOT NULL,
  `checks_out_at` datetime NOT NULL,
  PRIMARY KEY (`user_hall_id`),
  UNIQUE KEY `uq_user_hall_user_id` (`user_id`),
  UNIQUE KEY `uq_user_hall_hall_id` (`hall_id`),
  CONSTRAINT `fk_user_hall_hall_id` FOREIGN KEY (`hall_id`) REFERENCES `hall` (`hall_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_hall_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `user_hall`;
/*!40000 ALTER TABLE `user_hall` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_hall` ENABLE KEYS */;

DROP TABLE IF EXISTS `user_room`;
CREATE TABLE IF NOT EXISTS `user_room` (
  `user_room_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL DEFAULT '0',
  `room_id` int(10) unsigned NOT NULL DEFAULT '0',
  `checks_in_at` datetime NOT NULL,
  `checks_out_at` datetime NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_room_id`),
  UNIQUE KEY `uq_user_room_user_id` (`user_id`) USING BTREE,
  UNIQUE KEY `uq_user_room_room_id` (`room_id`) USING BTREE,
  CONSTRAINT `fk_user_room_room_id` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_user_room_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELETE FROM `user_room`;
/*!40000 ALTER TABLE `user_room` DISABLE KEYS */;
INSERT INTO `user_room` (`user_room_id`, `user_id`, `room_id`, `checks_in_at`, `checks_out_at`, `price`, `created_at`) VALUES
	(1, 1, 1, '2021-04-26 16:10:22', '2021-05-05 16:11:18', 150.00, '2021-04-26 16:11:59');
/*!40000 ALTER TABLE `user_room` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
