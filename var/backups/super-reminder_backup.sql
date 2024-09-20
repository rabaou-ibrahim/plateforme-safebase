-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: super-reminder
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (115,'test','test',4),(1,'etsqdsgq','sqgsg',14314),(117,'testt','testt',4),(118,'Mon 1er projet','Projet',5),(119,'le Projet M','Mtest',4),(120,'TPMP','Touche pas à mon poulet',6),(121,'maman','maman',8);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `id_user` int NOT NULL,
  `id_project` int NOT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=109 DEFAULT CHARSET=utf32;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `login` varchar(25) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (4,'test','test','test','$2y$10$GX4hmd1I28cKshvC0mTXTu0pWiTVw0E.BWmzUuFrP6mu9OHYL8mXK'),(3,'ibr','raba','raba','$2y$10$bIqphuo5SdKE2wdpKJ744uradxD4VQubJByDj7meD3QdJuQoLPAWC'),(5,'login','login','login','$2y$10$UVZRLXmGHpfS5L4uwyfYyuF7WMLftbxKN1YpsdCYhLfqYJYOZaMSS'),(6,'Doe','RafaTheKing','John','$2y$10$JDsO2cBtfnVipCSWXhYUUeK8PmZZf8PkDNPtAnl8mALXTh4hu0yba'),(7,'ibr','asd','raba','$2y$10$u9mHEiLgjbyazIQFWaXS1OjNM5BJ6VxNZhyzAo1dUVyzDIHJWvKtG'),(8,'maman','maman','maman','$2y$10$TeJs9MbHuP7Y8HhfYh75vO40NqI/7mKgPRKbubcybQDGVhFL0O4Gy'),(9,'IBRAHIM','rabaou','Rabaou','$2y$10$NzEsvpZDsoiWvTrYMaKMvO/Uz5E4xO8U.hKG2aqIoX.4yeMpzGpT.'),(10,'po','po','po','$2y$10$0PkP1sMEiNS5CTcCe/au7.U/Mzb01fiyxX4sW4ZzO8nIYc98cOt9a'),(11,'TEST23','test3','test23','$2y$10$fKJAiBeb3g3RELuavZAnc.Tas9tKvHaFF.pUHFJN.WtUdus4QVfWm'),(12,'test7','testt','test7','$2y$10$5KmXSrkhzjfjuhLPIc9unusT/xfD/sG2WdM/Huwl9N0KCp2lPfu52'),(13,'monLogin3','firstname3','lastname3','$2y$10$NzPkDQKZeOndxLD7xdpdh.Y2H/MWEdj7j04.G5or2FuoicntVgXeG'),(14,'monLogin4','firstname4','lastname4','$2y$10$NXGsFIRjGLQ43SDtY1gRu..UHRxfyRwsHFTjWR1rzCN7ufl6RYBOa'),(15,'monLogin5','firstname5','lastname5','$2y$10$HsCTzBwLPjVWwAqtdcTwXe33uwplaJDJ9vRpbwuNT7JqK/RUaMFUu');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-21  1:11:00
