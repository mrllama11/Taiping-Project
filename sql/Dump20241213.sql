-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: taipingdata
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agent_form_info`
--

DROP TABLE IF EXISTS agent_form_info;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE agent_form_info (
  Id int NOT NULL AUTO_INCREMENT,
  Title varchar(100) DEFAULT NULL,
  Customer_name varchar(255) DEFAULT NULL,
  Customer_Email varchar(255) DEFAULT NULL,
  Customer_Phone_Number varchar(15) DEFAULT NULL,
  Customer_Address varchar(255) DEFAULT NULL,
  Customer_KTP varchar(16) DEFAULT NULL,
  Customer_NPWP varchar(20) DEFAULT NULL,
  Customer_AAUI_Number varchar(30) DEFAULT NULL,
  Target_Certification varchar(50) DEFAULT NULL,
  Customer_Bank_Name varchar(30) DEFAULT NULL,
  Customer_Bank_Account_Number varchar(30) DEFAULT NULL,
  Customer_References varchar(30) DEFAULT NULL,
  Agent_Role varchar(100) DEFAULT NULL,
  Office_Location varchar(50) DEFAULT NULL,
  Photo_Url varchar(2083) DEFAULT NULL,
  KTP_Url varchar(2083) DEFAULT NULL,
  NPWP_Url varchar(2083) DEFAULT NULL,
  AAUI_Url varchar(2083) DEFAULT NULL,
  Bukutabungan_Url varchar(2083) DEFAULT NULL,
  OtherCerti_Url varchar(2083) DEFAULT NULL,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (Id)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agent_form_info`
--

LOCK TABLES agent_form_info WRITE;
/*!40000 ALTER TABLE agent_form_info DISABLE KEYS s*/;
INSERT INTO agent_form_info VALUES (1,'Mr','Xiao Bin','xiaobin.jkt99@gmail.com','081218331689','Jalan Petojo VIY II NO 45','3000238218903281','1223525763','22368945','AGENT','BANK CENTRAL ASIA','452376942','Aguz Wirano','Financial Consultant','Head Office(Jakarta)',NULL,NULL,NULL,NULL,NULL,NULL,'2024-12-11 08:32:32','2024-12-11 08:32:32'),(2,'Mr','Xiao Bin','xiaobin.jkt99@gmail.com','081218331689','Jalan Petojo VIY II NO 45','3000238218903281','1223525763','22368945','AGENT','BANK CENTRAL ASIA','452376942','Aguz Wirano','Financial Consultant','Head Office(Jakarta)',NULL,NULL,NULL,NULL,NULL,NULL,'2024-12-11 08:41:57','2024-12-11 08:41:57'),(3,'Mr','Xiao Bin','xiaobin.jkt99@gmail.com','081218331689','Jalan Petojo VIY II NO 45','3000238218903281','1223525763','22368945','AGENT','BANK CENTRAL ASIA','452376942','Aguz Wirano','Financial Consultant','Head Office(Jakarta)',NULL,NULL,NULL,NULL,NULL,NULL,'2024-12-11 08:43:49','2024-12-11 08:43:49'),(4,'Mr','Xiao Bin','xiaonim.jkt99@gmail.com','081218331689','jakarta RAYA','2300031000219903','123547854','22363312','Agent','Bank CIMB ','48568931','Xiao Bin','Financial Consultant','Head Office(Jakarta)',NULL,NULL,NULL,NULL,NULL,NULL,'2024-12-12 06:24:36','2024-12-12 06:24:36'),(5,'Mr','Xiao Bin','xiao.jrtd@gmail.com','024585274896','jakarta','123458654235974','45872369499521','5874542','Agent','Bank OCBC','55896242','Xiao Bin','Financial Consultant','Head Office(Jakarta)','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733988597/zp9jeycj2boszbxlipmk.png','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733988598/gco6gpotxbzi4rhjfxzn.png','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733988600/p7aymn3gpj9zk7pjxp7z.png','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733988600/xtrxpxx0rzck48eyemib.jpg','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733988601/erfvkm8b244n7zlfdup0.jpg','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733988602/kd7zt85zxm8ar3voyoqu.png','2024-12-12 07:30:02','2024-12-12 07:30:02'),(6,'PT','China Taiping Insurance Indonesia','ChinataipinginsuranceID@gmail.com','0216984145','gedung perkantoran the tower, gatot subroto, jakarta Selatan','4578512861425','445785645','4481122785','Agent','BANK BSI','444583138','bambang Pamungkas','Financial Consultant','Head Office(Jakarta)','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733991511/vmdapm1fpodrgmoj3cgu.jpg','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733991513/ecaxy0yxc6xzldyfr97m.png','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733991515/wq0bqpmkrycvxlvorv1e.jpg','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733991514/mgtedm4yusvvggjnj6a2.png','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733991516/q9f7xvmr5bgwc1osllor.jpg','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733991517/w8fyojl45fcwhodnkxhg.png','2024-12-12 08:18:37','2024-12-12 08:18:37'),(7,'PT','China Taiping Insurance Indonesia','ChinataipinginsuranceID@gmail.com','0216984145','gedung perkantoran the tower, gatot subroto, jakarta Selatan','4578512861425','445785645','4481122785','Agent','BANK BSI','444583138','bambang Pamungkas','Financial Consultant','Head Office(Jakarta)',NULL,NULL,'https://res.cloudinary.com/dpmlgxksm/image/upload/v1733991745/lrs4sftq2rovemwsxax6.jpg','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733991744/ouoqsafoxzldijitsivd.png',NULL,NULL,'2024-12-12 08:22:25','2024-12-12 08:22:25'),(8,'Mr','Bambang','','','','','','','','','','','Financial Consultant','Head Office(Jakarta)','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733992249/rtgwsqllpo5scgmegdg0.png','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733992251/opnzfzdb7qimzjtjxhvg.png','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733992252/vojvqf78uxqg5zxwmnk5.png',NULL,'https://res.cloudinary.com/dpmlgxksm/image/upload/v1733992254/gcoodfqmnfs9q492eoh6.jpg',NULL,'2024-12-12 08:30:53','2024-12-12 08:30:53'),(9,'Mr','Bambang','','','','','','','','','','','Financial Consultant','Head Office(Jakarta)','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733992290/zfiaepr42ix7jhdqckjz.png','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733992291/drzaw9viwlooboz8lslh.png',NULL,NULL,'https://res.cloudinary.com/dpmlgxksm/image/upload/v1733992292/wugd8r5gd07xnp8btjvg.jpg',NULL,'2024-12-12 08:31:32','2024-12-12 08:31:32'),(10,'Mr','Bambang','','','','','','','','','','','Financial Consultant','Head Office(Jakarta)','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733992439/osnhusbyozgtfsnlibuz.png','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733992441/wc8aphlgbzs70snkxo0r.png','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733992442/qq3oufpqj2j9jm8olkf6.pdf',NULL,NULL,NULL,'2024-12-12 08:34:01','2024-12-12 08:34:01'),(11,'Mr','Bambang','','','','','','','','','','','Financial Consultant','Head Office(Jakarta)','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733993657/hd5pnxa0gdv1xdia7pki.pdf','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733993658/u3evye2866uyoyyuqcye.png','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733993659/pbufi4wdr8bzi97tij0v.png',NULL,'https://res.cloudinary.com/dpmlgxksm/image/upload/v1733993660/bv9dol0sscwghz1p3pgi.pdf',NULL,'2024-12-12 08:54:20','2024-12-12 08:54:20'),(12,'PT','BambangJAYA 23','bambangan@gmail.com','0875649213589','JAKARTA','4458666521','7789954755','44857965','Agent','BANK Mandiri','88546545','LOKIYA','Financial Consultant','Head Office(Jakarta)','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733994464/aq1d9zfivnymlc3hggvz.pdf','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733994469/enyua3e9brvbivrthqxk.pdf','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733994483/h7mf3cvhhvrvevgsjfnx.png','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733994470/v0fz44hvpexjermx6sje.jpg','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733994488/px3a6inunpdzmlkyhiqr.pdf','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733994489/wgfe4xqvsxfgmyojmzrb.jpg','2024-12-12 09:08:09','2024-12-12 09:08:09'),(13,'Mr','Roberto wijaya','RobertWijaya@gmail.com','084579645231','Senen Jakpus','300014586551845','55448774','559986','Agent','Bank Maybank','44487545','Xiao Bin','Agency Director','Head Office(Jakarta)','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733995041/h25rg0v5y5fnmyewl5tf.jpg','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733995064/klnsi40xrlnid97ao8nn.png','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733995070/th03brbkbywr68yf9mlx.jpg','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733995069/mi91cwtwpdpshrgmwqoo.pdf','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733995072/kralxmdmro3zbzeqiwxf.jpg','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733995076/kzpsjrxdoyczqujjkr6h.jpg','2024-12-12 09:17:56','2024-12-12 09:17:56'),(14,'Mrs','Dewi cantik','Dewijakarta22@gmail.com','08457965423','Jalan Yos Sudarso no 209','30002457542475','8978545','554585','Reins agent','Bank UOB','39786214','Agus','Agency Director','6','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733995754/l9xo4bmkcncrk0ngfvcg.png','https://res.cloudinary.com/dpmlgxksm/raw/upload/v1733995755/skevzovwrq10mgxpdutz','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733995756/w56jl3xxjcst8l2ablsh.png',NULL,'https://res.cloudinary.com/dpmlgxksm/image/upload/v1733995757/l1bolczxtsphzxwxz4ki.pdf',NULL,'2024-12-12 09:29:17','2024-12-12 09:29:17'),(15,'Mr','Bambang','','','','','','','','','','','Financial Consultant','Kedoya',NULL,NULL,NULL,NULL,'https://res.cloudinary.com/dpmlgxksm/image/upload/v1733996082/unsvpduzkotyrqs7arhr.pdf',NULL,'2024-12-12 09:34:43','2024-12-12 09:34:43'),(16,'Mr','Bambang','','','','','','','','','','','Financial Consultant','Head Office(Jakarta)',NULL,NULL,'https://res.cloudinary.com/dpmlgxksm/image/upload/v1733996298/u3gxr3pubyctyatz1scx.pdf',NULL,NULL,NULL,'2024-12-12 09:38:18','2024-12-12 09:38:18'),(17,'Mr','Bambang','','','','','','','','','','','Agency Director','Surabaya','https://res.cloudinary.com/dpmlgxksm/image/upload/v1733996396/io3ovohtvhbcs5ad88ou.pdf',NULL,NULL,NULL,NULL,NULL,'2024-12-12 09:39:56','2024-12-12 09:39:56'),(18,'Mr','Bambang','','','','','','','','','','','Agency Director','Kedoya',NULL,NULL,NULL,'https://res.cloudinary.com/dpmlgxksm/image/upload/v1733996537/yiguh86zartzcqkvvool.pdf',NULL,NULL,'2024-12-12 09:42:17','2024-12-12 09:42:17'),(19,'Mr','Bambang','','','','','','','','','','','Financial Consultant','Head Office(Jakarta)',NULL,NULL,NULL,NULL,'https://res.cloudinary.com/dpmlgxksm/image/upload/v1733996737/crtxv2o3hkd2gjuxdm6u.pdf',NULL,'2024-12-12 09:45:37','2024-12-12 09:45:37'),(20,'Mr','Bambang','','','','','','','','','','','Agency Director','Yogyakarta',NULL,NULL,NULL,NULL,'https://res.cloudinary.com/dpmlgxksm/image/upload/v1733996857/cyginqvov7x4bnbnrxsc.jpg',NULL,'2024-12-12 09:47:37','2024-12-12 09:47:37');
/*!40000 ALTER TABLE agent_form_info ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dataemail`
--

DROP TABLE IF EXISTS dataemail;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE dataemail (
  ID varchar(100) DEFAULT NULL,
  email varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dataemail`
--

LOCK TABLES dataemail WRITE;
/*!40000 ALTER TABLE dataemail DISABLE KEYS */;
/*!40000 ALTER TABLE dataemail ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `extension_cover`
--

DROP TABLE IF EXISTS extension_cover;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE extension_cover (
  extension_id bigint unsigned NOT NULL AUTO_INCREMENT,
  coverage_type varchar(255) DEFAULT NULL,
  region_id int DEFAULT NULL,
  rate_comprehensive decimal(5,5) DEFAULT NULL,
  rate_tlo decimal(5,5) DEFAULT NULL,
  PRIMARY KEY (extension_id),
  UNIQUE KEY extension_id (extension_id),
  KEY region_id (region_id),
  CONSTRAINT extension_cover_ibfk_1 FOREIGN KEY (region_id) REFERENCES region (id)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extension_cover`
--

LOCK TABLES extension_cover WRITE;
/*!40000 ALTER TABLE extension_cover DISABLE KEYS */;
INSERT INTO extension_cover VALUES (1,'Personal Accident for passengser ',NULL,0.00100,0.00100),(2,'Personal Accident for driver ',NULL,0.00500,0.00500),(3,'Banjir & Topan ',1,0.00075,0.00050),(4,'Banjir & Topan ',2,0.00010,0.00075),(5,'Banjir & Topan ',3,0.00075,0.00050),(6,'Gempa & Tsunami ',1,0.00120,0.00085),(7,'Gempa & Tsunami ',2,0.00100,0.00075),(8,'Gempa & Tsunami ',3,0.00075,0.00050),(9,'Huru Hara ',NULL,0.00050,0.00035),(10,'Terorisme & Sabotase ',NULL,0.00050,0.00035),(11,'Personal Accident for passengser ',NULL,0.00100,0.00100),(12,'Personal Accident for driver ',NULL,0.00500,0.00500),(13,'Banjir & Topan ',1,0.00075,0.00050),(14,'Banjir & Topan ',2,0.00010,0.00075),(15,'Banjir & Topan ',3,0.00075,0.00050),(16,'Gempa & Tsunami ',1,0.00120,0.00085),(17,'Gempa & Tsunami ',2,0.00100,0.00075),(18,'Gempa & Tsunami ',3,0.00075,0.00050),(19,'Huru Hara ',NULL,0.00050,0.00035),(20,'Terorisme & Sabotase ',NULL,0.00050,0.00035),(21,'Personal Accident for passengser ',NULL,0.00100,0.00100),(22,'Personal Accident for driver ',NULL,0.00500,0.00500),(23,'Banjir & Topan ',1,0.00075,0.00050),(24,'Banjir & Topan ',2,0.00010,0.00075),(25,'Banjir & Topan ',3,0.00075,0.00050),(26,'Gempa & Tsunami ',1,0.00120,0.00085),(27,'Gempa & Tsunami ',2,0.00100,0.00075),(28,'Gempa & Tsunami ',3,0.00075,0.00050),(29,'Huru Hara ',NULL,0.00050,0.00035),(30,'Terorisme & Sabotase ',NULL,0.00050,0.00035),(31,'Personal Accident for passengser ',NULL,0.00100,0.00100),(32,'Personal Accident for driver ',NULL,0.00500,0.00500),(33,'Banjir & Topan ',1,0.00075,0.00050),(34,'Banjir & Topan ',2,0.00010,0.00075),(35,'Banjir & Topan ',3,0.00075,0.00050),(36,'Gempa & Tsunami ',1,0.00120,0.00085),(37,'Gempa & Tsunami ',2,0.00100,0.00075),(38,'Gempa & Tsunami ',3,0.00075,0.00050),(39,'Huru Hara ',NULL,0.00050,0.00035),(40,'Terorisme & Sabotase ',NULL,0.00050,0.00035);
/*!40000 ALTER TABLE extension_cover ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newsletter_subscribers`
--

DROP TABLE IF EXISTS newsletter_subscribers;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE newsletter_subscribers (
  ID varchar(100) DEFAULT (uuid()),
  email varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newsletter_subscribers`
--

LOCK TABLES newsletter_subscribers WRITE;
/*!40000 ALTER TABLE newsletter_subscribers DISABLE KEYS */;
INSERT INTO newsletter_subscribers VALUES ('0a497d24-85e0-11ef-902f-e4a8df88a580','oto9877.bhs.id@gmail.com'),('e709e4c9-85e1-11ef-902f-e4a8df88a580','ctii@gmail.com'),('4e954092-85e2-11ef-902f-e4a8df88a580','halodoc.org@gmail.com'),('67181697-85f1-11ef-902f-e4a8df88a580','testingourproduct@gmail.com'),('0927f83f-85f2-11ef-902f-e4a8df88a580','cashinsurance@gmail.com'),('391ebf6b-85f2-11ef-902f-e4a8df88a580','fireinsurance@gmail.com'),('62dc3690-85f2-11ef-902f-e4a8df88a580','liabilityinsurance@gmail.com'),('984f0328-85f2-11ef-902f-e4a8df88a580','marineinsurance@gmail.com'),('c4c37f18-85f2-11ef-902f-e4a8df88a580','motorinsurance33@yahoo.c'),('edb82451-85f2-11ef-902f-e4a8df88a580','overserasAHAH//..-0900@gmail.com'),('1a32b2d8-85f3-11ef-902f-e4a8df88a580','personalaccinsurance556677%%^^%^^@_gmeial.comm'),('3a92f374-85f3-11ef-902f-e4a8df88a580','proallrisk@gmail.cpom,'),('8a628578-8605-11ef-902f-e4a8df88a580','newheadoffice@gmail.com'),('b6f1893a-8605-11ef-902f-e4a8df88a580','CTPIacchivements@yahoo.com'),('da781f92-8605-11ef-902f-e4a8df88a580','visionandmission@hotmail.com'),('1b219104-8606-11ef-902f-e4a8df88a580','compannyprofile@gmail.com'),('4ab6de1e-8606-11ef-902f-e4a8df88a580','branchesctii@gmail.com'),('92ce94f3-8606-11ef-902f-e4a8df88a580','careerwithusctii@gmail.com'),('4609e3e4-860f-11ef-902f-e4a8df88a580','test@example.com'),('d3594489-861b-11ef-902f-e4a8df88a580','hahahh@gmail.com'),('d1ed5b96-8772-11ef-8891-e4a8df88a580','testing11102024@testing.com'),('2e6ec9e0-8775-11ef-8891-e4a8df88a580','tesingBIN@gmail.com'),('91ac946a-8775-11ef-8891-e4a8df88a580','TESING@gmail.com'),('a65539af-9b28-11ef-8891-e4a8df88a580','xiaobin@gmail.com'),('c9932d16-9b28-11ef-8891-e4a8df88a580','hahahah@gmail.com'),('dd1e9430-9b28-11ef-8891-e4a8df88a580','hahahahahah@gmail.com'),('ef644301-9b28-11ef-8891-e4a8df88a580','hehehehhe@gmail.com'),('1631ba48-9b29-11ef-8891-e4a8df88a580','uuuuu@gmail.com'),('e224b97a-9b41-11ef-8891-e4a8df88a580','xiaobinnn@yahoo.com'),('ed50ec60-9b41-11ef-8891-e4a8df88a580','jjjjjj23@gmail.com'),('14dbed46-9b42-11ef-8891-e4a8df88a580','hahahahah@gmail.com'),('2cd84367-9b42-11ef-8891-e4a8df88a580','testing123@gmail.com'),('4c743910-9b42-11ef-8891-e4a8df88a580','heheheheheheheheh@gmail.com'),('97009ab1-9b42-11ef-8891-e4a8df88a580','jobwelldone@gmail.com'),('f7ea175c-9b42-11ef-8891-e4a8df88a580','heheheh@yahoo.com'),('40840fa7-9b46-11ef-8891-e4a8df88a580','hehehehhenews@gmail..com'),('a4e03850-9b46-11ef-8891-e4a8df88a580','ourproduct@gmail.com'),('074090db-9b4c-11ef-8891-e4a8df88a580','55555gogo@gmail.com'),('4fc09bdc-b21a-11ef-ad39-e4a8df88a580','jojo@gmail.com'),('32c118bd-b37e-11ef-8cff-e4a8df88a580','hahahahahah@gmail.com'),('39db0fc6-b37e-11ef-8cff-e4a8df88a580','xiao12@gmail.com'),('9d3e4f3b-b37e-11ef-8cff-e4a8df88a580','testingsendingemailaddress@gmail.com');
/*!40000 ALTER TABLE newsletter_subscribers ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `premium_rate_comprehensive`
--

DROP TABLE IF EXISTS premium_rate_comprehensive;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE premium_rate_comprehensive (
  id int NOT NULL AUTO_INCREMENT,
  vehicle_category_id int DEFAULT NULL,
  region_id int DEFAULT NULL,
  year_0_5 decimal(5,4) DEFAULT NULL,
  year_6 decimal(5,4) DEFAULT NULL,
  year_7 decimal(5,4) DEFAULT NULL,
  year_8 decimal(5,4) DEFAULT NULL,
  year_9 decimal(5,4) DEFAULT NULL,
  year_10 decimal(5,4) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY vehicle_category_id (vehicle_category_id),
  KEY region_id (region_id),
  CONSTRAINT premium_rate_comprehensive_ibfk_1 FOREIGN KEY (vehicle_category_id) REFERENCES vehicle_category (id),
  CONSTRAINT premium_rate_comprehensive_ibfk_2 FOREIGN KEY (region_id) REFERENCES region (id)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `premium_rate_comprehensive`
--

LOCK TABLES premium_rate_comprehensive WRITE;
/*!40000 ALTER TABLE premium_rate_comprehensive DISABLE KEYS */;
INSERT INTO premium_rate_comprehensive VALUES (1,1,1,0.0382,0.0401,0.0420,0.0439,0.0458,0.0478),(2,1,2,0.0326,0.0342,0.0359,0.0375,0.0391,0.0408),(3,1,3,0.0253,0.0266,0.0278,0.0291,0.0304,0.0316),(4,2,1,0.0267,0.0280,0.0294,0.0307,0.0320,0.0334),(5,2,2,0.0247,0.0259,0.0272,0.0284,0.0296,0.0309),(6,2,3,0.0269,0.0282,0.0296,0.0309,0.0323,0.0336),(7,3,1,0.0218,0.0229,0.0240,0.0251,0.0262,0.0273),(8,3,2,0.0208,0.0218,0.0229,0.0239,0.0250,0.0260),(9,3,3,0.0179,0.0188,0.0197,0.0206,0.0215,0.0224),(10,4,1,0.0120,0.0126,0.0132,0.0138,0.0144,0.0150),(11,4,2,0.0120,0.0126,0.0132,0.0138,0.0144,0.0150),(12,4,3,0.0114,0.0120,0.0125,0.0131,0.0137,0.0143),(13,5,1,0.0105,0.0110,0.0116,0.0121,0.0126,0.0131),(14,5,2,0.0105,0.0110,0.0116,0.0121,0.0126,0.0131),(15,5,3,0.0105,0.0110,0.0116,0.0121,0.0126,0.0131),(16,6,1,0.0242,0.0116,0.0126,0.0258,0.0126,0.0131),(17,6,2,0.0239,0.0244,0.0250,0.0255,0.0260,0.0265),(18,6,3,0.0223,0.0228,0.0234,0.0239,0.0244,0.0249);
/*!40000 ALTER TABLE premium_rate_comprehensive ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `premium_rate_tlo`
--

DROP TABLE IF EXISTS premium_rate_tlo;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE premium_rate_tlo (
  id int NOT NULL AUTO_INCREMENT,
  vehicle_category_id int DEFAULT NULL,
  region_id int DEFAULT NULL,
  rate decimal(5,4) DEFAULT NULL,
  PRIMARY KEY (id),
  KEY vehicle_category_id (vehicle_category_id),
  KEY region_id (region_id),
  CONSTRAINT premium_rate_tlo_ibfk_1 FOREIGN KEY (vehicle_category_id) REFERENCES vehicle_category (id),
  CONSTRAINT premium_rate_tlo_ibfk_2 FOREIGN KEY (region_id) REFERENCES region (id)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `premium_rate_tlo`
--

LOCK TABLES premium_rate_tlo WRITE;
/*!40000 ALTER TABLE premium_rate_tlo DISABLE KEYS */;
INSERT INTO premium_rate_tlo VALUES (1,1,1,0.0047),(2,1,2,0.0065),(3,1,3,0.0051),(4,2,1,0.0063),(5,2,2,0.0044),(6,2,3,0.0044),(7,3,1,0.0041),(8,3,2,0.0038),(9,3,3,0.0029),(10,4,1,0.0025),(11,4,2,0.0025),(12,4,3,0.0023),(13,5,1,0.0020),(14,5,2,0.0020),(15,5,3,0.0020),(16,6,1,0.0088),(17,6,2,0.0168),(18,6,3,0.0081);
/*!40000 ALTER TABLE premium_rate_tlo ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS region;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE region (
  id int NOT NULL AUTO_INCREMENT,
  region_name varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--

LOCK TABLES region WRITE;
/*!40000 ALTER TABLE region DISABLE KEYS */;
INSERT INTO region VALUES (1,'Wilayah 1'),(2,'Wilayah 2'),(3,'Wilayah 3');
/*!40000 ALTER TABLE region ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tahunkendaraan`
--

DROP TABLE IF EXISTS tahunkendaraan;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE tahunkendaraan (
  ID varchar(100) NOT NULL,
  years varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tahunkendaraan`
--

LOCK TABLES tahunkendaraan WRITE;
/*!40000 ALTER TABLE tahunkendaraan DISABLE KEYS */;
INSERT INTO tahunkendaraan VALUES ('1','2010'),('2','2011'),('3','2012'),('4','2013'),('5','2014'),('6','2015'),('7','2016'),('8','2017'),('9','2018'),('10','2019'),('11','2020'),('12','2021'),('13','2022'),('14','2023'),('15','2024');
/*!40000 ALTER TABLE tahunkendaraan ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle_category`
--

DROP TABLE IF EXISTS vehicle_category;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE vehicle_category (
  id int NOT NULL AUTO_INCREMENT,
  category_name varchar(255) DEFAULT NULL,
  vehicle_type varchar(255) DEFAULT NULL,
  vehicle_cover_min varchar(255) DEFAULT NULL,
  vehicle_cover_max varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle_category`
--

LOCK TABLES vehicle_category WRITE;
/*!40000 ALTER TABLE vehicle_category DISABLE KEYS */;
INSERT INTO vehicle_category VALUES (1,'kategori 1','Non Bus & Non Truk','0','125000000'),(2,'kategori 2','Non Bus & Non Truk','125000001','200000000'),(3,'kategori 3','Non Bus & Non Truk','200000001','400000000'),(4,'kategori 4','Non Bus & Non Truk','400000001','800000000'),(5,'kategori 5','Non Bus & Non Truk','800000001','5000000000'),(6,'kategori 6','Pick Up / Truck / Box','0','5000000000');
/*!40000 ALTER TABLE vehicle_category ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wilayah`
--

DROP TABLE IF EXISTS wilayah;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE wilayah (
  wilayah_id char(2) NOT NULL,
  region_id int DEFAULT NULL,
  area varchar(255) DEFAULT NULL,
  PRIMARY KEY (wilayah_id),
  KEY region_id (region_id),
  CONSTRAINT wilayah_ibfk_1 FOREIGN KEY (region_id) REFERENCES region (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wilayah`
--

LOCK TABLES wilayah WRITE;
/*!40000 ALTER TABLE wilayah DISABLE KEYS */;
INSERT INTO wilayah VALUES ('A',2,'Banten'),('AA',3,'Kedu, Purworejo, Temanggung, Magelang, Wonosobo, Kebnumen'),('AB',3,'Yogyakarta'),('AD',3,'Surakarta, Boyolali, Klaten, Wonogiri, Sukoharjo, Karanganyar, Sragen'),('AE',3,'Madiun ,Ngawi, Pacitan, Ponorogo, Magetan'),('AG',3,'Kediri, Tulungagung, Blitar,Trenggalek,Nganjuk'),('B',2,'Jakarta'),('BA',1,'Pantai Barat Sumatra'),('BB',1,'Tapanuli'),('BD',1,'Bengkulu'),('BE',1,'Lampung'),('BG',1,'Palembang'),('BH',1,'Jambi'),('BK',1,'Sumatra Timur'),('BL',1,'Aceh'),('BM',1,'Riau'),('BN',1,'Bangka Belitung'),('BP',1,'Kepulauan Riau'),('D',2,'Bandung'),('DA',3,'Kalimantan Selatan'),('DB',3,'Manado'),('DC',3,'Sulawesi Barat'),('DD',3,'Sulawesi'),('DE',3,'Maluku'),('DG',3,'Ternate'),('DH',3,'Timor'),('DK',3,'Bali'),('DL',3,'Sitaro,Talaud,Sangihe'),('DM',3,'Gorontalo'),('DN',3,'Sulawesi Tengah'),('DR',3,'Lombok'),('DT',3,'Sulawesi Tenggara'),('E',2,'Cirebon , Majalengka, Indramayu, Kuningan'),('EA',3,'Sumbawa,Bima,Dompu,Sumbawa Barat'),('EB',3,'Alor,Lembata,Sikka,Ende,Ngada,Flores Timur,Flores,Manggarai,Manggarai Barat'),('ED',3,'Sumba Timur , Sumba Barat'),('G',3,'Pekalongan, Brebes, Pemalang , Batang, Tegal'),('H',3,'Semarang, Salatiga, Kendal, Demak'),('K',3,'Rembang, Cepu, Pati , Kudus, Jepara, Grobongann, Rembang, Blora'),('KB',3,'Kalimantan Barat'),('KH',3,'Kalimantan Tengah'),('KT',3,'Kalimantan Timur'),('KU',3,'Kalimantan Utara'),('L',3,'Surabaya'),('M',3,'Madura'),('N',3,'Pasuruan, Malang, Batu, Probolinggo, Lumajang'),('P',3,'Besuki, Banyuwangi, Besuki, Bondowoso, Jember, Situbondo'),('PA',3,'Papua'),('PB',3,'Papua Barat'),('R',3,'Banyumas, Cilacap, Purbalingga'),('S',3,'Jombang, Bojonegoro,Lamongan,Mojokerto'),('T',2,'Karawang, Subang, Purwakarta'),('W',3,'Gresik,Sidoarjo'),('Z',2,'Banjar, Garut,Ciamis,Tasikmalaya');
/*!40000 ALTER TABLE wilayah ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-13  9:12:08
