-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: localhost    Database: pia
-- ------------------------------------------------------
-- Server version	5.7.30-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Admin`
--

DROP TABLE IF EXISTS `Admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `KorisnikId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `KorisnikId` (`KorisnikId`),
  CONSTRAINT `Admin_ibfk_1` FOREIGN KEY (`KorisnikId`) REFERENCES `Korisnik` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admin`
--

LOCK TABLES `Admin` WRITE;
/*!40000 ALTER TABLE `Admin` DISABLE KEYS */;
INSERT INTO `Admin` VALUES (1,'Admin PIA','Elektrotehnicki Fakultet',1);
/*!40000 ALTER TABLE `Admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Komentar`
--

DROP TABLE IF EXISTS `Komentar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Komentar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `komentar` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `KorisnikId` int(11) DEFAULT NULL,
  `ProizvodId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `KorisnikId` (`KorisnikId`),
  KEY `ProizvodId` (`ProizvodId`),
  CONSTRAINT `Komentar_ibfk_1` FOREIGN KEY (`KorisnikId`) REFERENCES `Korisnik` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Komentar_ibfk_2` FOREIGN KEY (`ProizvodId`) REFERENCES `Proizvod` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Komentar`
--

LOCK TABLES `Komentar` WRITE;
/*!40000 ALTER TABLE `Komentar` DISABLE KEYS */;
INSERT INTO `Komentar` VALUES (1,'Gorpit ewi bilav udefa kazavjo okwafuv hudpej wiilci buvugi sakum jaos ziidli.','2020-06-23 15:23:59','2020-06-23 15:23:59',2,12),(2,'Fouzudo wecriceh tucor mizabbir tiov kamavni tud jurnagi vamid tuwtumze wozsip akevenvi bu jaj akpegi.','2020-06-23 15:23:59','2020-06-23 15:23:59',3,12),(3,'Ka bitacmor pajli kuknuri ti ipa limhiv dojeve gewvajid duvrut nuk lezehdap janonen few rowigineb amifa.','2020-06-23 15:23:59','2020-06-23 15:23:59',1,12),(4,'Nuv ze haefe fibawid ha nuc hi ivpizo kihunloh ral kifijo po ded awe loskerah upiza er ki.','2020-06-23 15:23:59','2020-06-23 15:23:59',3,12),(5,'Ifiage amhemzur rubehum himam ali mat hegpesviw acigu gipwetiri ra ejlodlap runefse te.','2020-06-23 15:23:59','2020-06-23 15:23:59',1,12),(6,'Deebu luago tewur piwfub ewik ujiwoz gu engazvun ju kibosebiv jip dasej jepfij jovuvra rubusda wivugupi igarof.','2020-06-23 15:23:59','2020-06-23 15:23:59',2,3),(7,'Fuzu ehzoglep nizu epcaiza su zev cif giovoguf lodmaleg tauj pa ipju cavwicsu fek.','2020-06-23 15:23:59','2020-06-23 15:23:59',2,3),(8,'Vo ik jizaloz zevuzizi vateseba tom isuj ti wusfadku hoddav finimu uz gemtulca fo.','2020-06-23 15:23:59','2020-06-23 15:23:59',1,3),(9,'Ociawi vog lija gutpuswaw ce pudit wa but ud havsadzit hab wizzi ha vopobahoh lepvik ife op.','2020-06-23 15:23:59','2020-06-23 15:23:59',2,3),(10,'Ikce gujukaoj momad ibsu vujig dacabcav al pe meb te ba garreiri jeh ri hodege essuf girkikuw sor.','2020-06-23 15:23:59','2020-06-23 15:23:59',2,3),(11,'Zagpakaw tawefo gi to nehegob cubkuc ke id hus rozu orsor rik otwaozi sa revniw jepejah se.','2020-06-23 15:23:59','2020-06-23 15:23:59',1,6),(12,'Rag owu rifwuh ze ri ohaug lois canuez eg jajefik bec rug ilipib hulpahi.','2020-06-23 15:23:59','2020-06-23 15:23:59',1,6),(13,'Bitam pimjunjis pez laduzebek uhdisi sifot amo wiodaceh hotsuvjef bokjuta lib gil bacfuhdi.','2020-06-23 15:23:59','2020-06-23 15:23:59',2,6),(14,'Baguvuz zuc uh gejwelut ka jowsokda oswarezo koov cegevme nunpubcum wu roza nowme.','2020-06-23 15:23:59','2020-06-23 15:23:59',1,6),(15,'Izisubo sebnewfuc kufbevit wuze ne wikwih agumep keavahat kuhpi pusuf zej sizes.','2020-06-23 15:23:59','2020-06-23 15:23:59',1,6),(16,'Tij cinihi sodut atinifa madotori kazdew bu tob rulas lekatziz envesu nadusdus jobzi.','2020-06-23 15:23:59','2020-06-23 15:23:59',3,13),(17,'Wo vofeweb apse du heldebape ma kad rutbese camak besravtu on utkaslu seri tielu tobazgeg po.','2020-06-23 15:23:59','2020-06-23 15:23:59',2,13),(18,'Uttagas owobopgit tucis anacbef bub cal puguga ho kadgeb awji hal pijeljev.','2020-06-23 15:23:59','2020-06-23 15:23:59',3,13),(19,'Betvo lontancob jes fu tizce voc unilut sopla zadun amenaru zah kuspebag gurais nizon.','2020-06-23 15:23:59','2020-06-23 15:23:59',1,13),(20,'Wipida ficig ul ja wegibi zi du acciha teosozis uwa fehnoume nadim uke rohuw copijca dukjop.','2020-06-23 15:23:59','2020-06-23 15:23:59',1,13),(21,'Cifbobgu pewif ceknigewi wu gomovmab rilpipa wuba ucbire utzo pogacba jieslas fickaoh ju.','2020-06-23 15:23:59','2020-06-23 15:23:59',1,17),(22,'Buhezso wodrosa ji dabwuani ahoure es aref gin abah pa zi fucehob nezvavmer tehiv cijjo miw uveeno amonivpa.','2020-06-23 15:23:59','2020-06-23 15:23:59',3,17),(23,'Difjop ga cak nacuga wotlihra rot wej vujhe ovcog fafuc sipan sal.','2020-06-23 15:23:59','2020-06-23 15:23:59',1,17),(24,'Vaf duf amuhagpof onnahub cacu dagociki ko uso sa nibru coc fimena ap ku.','2020-06-23 15:23:59','2020-06-23 15:23:59',2,17),(25,'Cuze bib od tuga tirsinot ni funalof veha ga gabsuna umpihut rufjemhez erjozi uzes kabo.','2020-06-23 15:23:59','2020-06-23 15:23:59',3,17),(26,'Git naravbi lataga nelabfaz mife ku suriga uzileg aki iw dur ovi ij.','2020-06-23 15:23:59','2020-06-23 15:23:59',2,5),(27,'Mi ati retfoc kacovlis ic wunepraf laj zitam ufofichij teb holgonat ocodiago run fugbi woapha olzunec digjacpe.','2020-06-23 15:23:59','2020-06-23 15:23:59',2,5),(28,'Gu jij na hebu vo mufzalag vosjitul haafu segoh puzep nopem be monsi zanja hepek ubsuju luj tomis.','2020-06-23 15:23:59','2020-06-23 15:23:59',2,5),(29,'Coj pido zapjosbac lag figif zoirukat fis towuzih cos mo odizeso min do ne.','2020-06-23 15:23:59','2020-06-23 15:23:59',2,5),(30,'Fizwub amvet dow ihnocjud mu zoha ezitel ed vav pubnoh ag moj.','2020-06-23 15:23:59','2020-06-23 15:23:59',2,5),(31,'Potsurjik jahib solhahid apcuku tiileveb nihu ahakojihe zu vumduz robos peceli cogjijra mo bim kosurepu itujoc hozawaohe ifoci.','2020-06-23 15:23:59','2020-06-23 15:23:59',2,10),(32,'Ac ge jutmure ta gav kah fem heaw arobawbo mowaze ru guc.','2020-06-23 15:23:59','2020-06-23 15:23:59',2,10),(33,'Siloab doeliz wiaca weudiebe reru ewuwomde vi izepip nofsiw ceez lates gudle enuvut amgic.','2020-06-23 15:23:59','2020-06-23 15:23:59',1,10),(34,'Ucohif taom wuh bokli sevozboz tuvueli uhoje lovzuric pikzem fu gof fi pojmo wosup.','2020-06-23 15:23:59','2020-06-23 15:23:59',1,10),(35,'Zur uc lo ci baipa juvagsor ligebiec suk fu ga lude napjeku.','2020-06-23 15:23:59','2020-06-23 15:23:59',3,10),(36,'Cehzideze dire la wimhaik noimeba ef mavbamle keit nomro wifeega ob reoba sovruwpu wibimaowi.','2020-06-23 15:23:59','2020-06-23 15:23:59',2,16),(37,'Vebrabgoj guad pe pein gabpe ahofe fare ret odisu midunis hahavito geurudo hobru ubrevod zawosatu nulgi haeji zisuzi.','2020-06-23 15:23:59','2020-06-23 15:23:59',3,16),(38,'Vutnij garfo aweig betnuwteg fom ponjos zahsac sotbop ma nowzi op oj pokir zepdusdo wudjakuk polgeve.','2020-06-23 15:23:59','2020-06-23 15:23:59',3,16),(39,'Pif roato izibat he coshaj mutem vehpahmu gaznicgo fokoliwid ojkeres joczeh pezo vegbokgo huti utnewbun bupom dovuv cahwiz.','2020-06-23 15:23:59','2020-06-23 15:23:59',1,16),(40,'Vec la en sebcimun rug tazinca geg ligom ped ferwinbu zogepegi ukwebgo.','2020-06-23 15:23:59','2020-06-23 15:23:59',1,16),(41,'Red nu luriktu kukrasuk rifle tucmased osu zothalde wi dizuk hecosko cuov julebu doeza wob camaw ef baptikun.','2020-06-23 15:23:59','2020-06-23 15:23:59',3,8),(42,'Ta uz zak lacitone ejhuk pololo ga tu vagujoza wus wopotakof tanomod ukme vozha ranuk zez mizume.','2020-06-23 15:23:59','2020-06-23 15:23:59',1,8),(43,'Pakzuho tumis kiwigi pu vuf uf duk lewhatrel tuf vuno libiz lur was kusise joti.','2020-06-23 15:23:59','2020-06-23 15:23:59',3,8),(44,'Uwku be zubaze konvo lubep nohehe aco lakazro bobujido mi popoko novropozo wowciaw.','2020-06-23 15:23:59','2020-06-23 15:23:59',3,8),(45,'Desumow vuhzi olokeh tobokelel tucropid nikkum ihce todu puljectub sov mufe fefabka moserehad kompak otlah ipjub.','2020-06-23 15:23:59','2020-06-23 15:23:59',2,8),(46,'Idsupige zuhu poifarob jus wokjejra gifufakiv zigihiteb hu ursih wusja jik ewa wacojev si.','2020-06-23 15:23:59','2020-06-23 15:23:59',1,4),(47,'Bawiwa juhapso vegon sekakona lanetdet egaar hapati aroalure emepup hufacap misupojuz luwap jamu hujsuj evsun awofiw.','2020-06-23 15:23:59','2020-06-23 15:23:59',2,4),(48,'Aco doszem ka mo bub birnetoce now jusbaog kum duzkifri cilak wac es heb finuaci zeoc.','2020-06-23 15:23:59','2020-06-23 15:23:59',2,4),(49,'Hiagho obausu utir zetsov pi ko pihewoz huhujseb wimjuov wi wudzol wohopli jem wo vi ir cenmub.','2020-06-23 15:23:59','2020-06-23 15:23:59',2,4),(50,'Ronac oskonzob kozesze caccosgim uwvijmi rorceid huunoher azpalwef wu poho jojfugfar an hib.','2020-06-23 15:23:59','2020-06-23 15:23:59',3,4);
/*!40000 ALTER TABLE `Komentar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Korisnik`
--

DROP TABLE IF EXISTS `Korisnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Korisnik` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `avatar` text,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','poljoprivrednik','preduzece') NOT NULL,
  `status` enum('naCekanju','odobren','odbijen') NOT NULL DEFAULT 'naCekanju',
  `username` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Korisnik`
--

LOCK TABLES `Korisnik` WRITE;
/*!40000 ALTER TABLE `Korisnik` DISABLE KEYS */;
INSERT INTO `Korisnik` VALUES (1,'admin@etf.rs','+381691231234','https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Round&hairColor=PastelGreen&facialHairType=BeardMagestic&facialHairColor=Blonde&clotheType=Hoodie&clotheColor=Blue03&eyeType=Wink&eyebrowType=UnibrowNatural&mouthType=ScreamOpen&skinColor=Brown','$2b$10$CGi9ucYtCax3zxbfon/6cOLMNMlrx84fYPP6Kk5U7xk7z3xmMq/QO','admin','odobren','admin','2020-06-23 13:23:58','2020-06-23 13:23:58'),(2,'poljoprivrednik@example.com','+381691231234','https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Prescription01&hairColor=Gray01&facialHairType=BeardLight&facialHairColor=Blonde&clotheType=GraphicShirt&clotheColor=Heather&eyeType=WinkWacky&eyebrowType=UnibrowNatural&mouthType=Serious&skinColor=DarkBrown','$2b$10$QP2.M7R87ex.m8pVOORAyutUFc16WfaEowJydspBuialCruVEw9ji','poljoprivrednik','odobren','poljoprivrednik','2020-06-23 13:23:58','2020-06-23 13:23:58'),(3,'preduzece@example.com','+381691231234','https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Prescription02&hairColor=Blue01&facialHairType=BeardLight&facialHairColor=Black&clotheType=ShirtScoopNeck&clotheColor=Red&eyeType=Side&eyebrowType=FlatNatural&mouthType=Disbelief&skinColor=Brown','$2b$10$fJ/JKOGWEqwMEsyQFgAgwu3NBTf8LxYOAthYZoDVUvG2eAO2r25Ri','preduzece','odobren','preduzece','2020-06-23 13:23:58','2020-06-23 13:23:58');
/*!40000 ALTER TABLE `Korisnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Kurir`
--

DROP TABLE IF EXISTS `Kurir`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Kurir` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `zauzetDo` datetime NOT NULL DEFAULT '2020-06-23 15:22:38',
  `PreduzeceId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PreduzeceId` (`PreduzeceId`),
  CONSTRAINT `Kurir_ibfk_1` FOREIGN KEY (`PreduzeceId`) REFERENCES `Preduzece` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Kurir`
--

LOCK TABLES `Kurir` WRITE;
/*!40000 ALTER TABLE `Kurir` DISABLE KEYS */;
INSERT INTO `Kurir` VALUES (1,'Leah','Baron','2020-06-23 15:23:59',1),(2,'Claudia','Dawson','2020-06-23 15:23:59',1),(3,'Alta','Cook','2020-06-23 15:23:59',1),(4,'Sean','Poole','2020-06-23 15:23:59',1),(5,'Pearl','Caldini','2020-06-23 15:23:59',1);
/*!40000 ALTER TABLE `Kurir` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Magacin`
--

DROP TABLE IF EXISTS `Magacin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Magacin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `RasadnikId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `RasadnikId` (`RasadnikId`),
  CONSTRAINT `Magacin_ibfk_1` FOREIGN KEY (`RasadnikId`) REFERENCES `Rasadnik` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Magacin`
--

LOCK TABLES `Magacin` WRITE;
/*!40000 ALTER TABLE `Magacin` DISABLE KEYS */;
INSERT INTO `Magacin` VALUES (1,'2020-06-23 15:24:01','2020-06-23 15:24:01',1),(2,'2020-06-23 15:24:01','2020-06-23 15:24:01',5),(3,'2020-06-23 15:24:01','2020-06-23 15:24:01',2),(4,'2020-06-23 15:24:01','2020-06-23 15:24:01',4),(5,'2020-06-23 15:24:01','2020-06-23 15:24:01',3);
/*!40000 ALTER TABLE `Magacin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `NaruceniProizvod`
--

DROP TABLE IF EXISTS `NaruceniProizvod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `NaruceniProizvod` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `manufacturer` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `type` enum('sadnica','preparat') NOT NULL,
  `value` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `NarudzbinaId` int(11) DEFAULT NULL,
  `ProizvodId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `NarudzbinaId` (`NarudzbinaId`),
  KEY `ProizvodId` (`ProizvodId`),
  CONSTRAINT `NaruceniProizvod_ibfk_1` FOREIGN KEY (`NarudzbinaId`) REFERENCES `Narudzbina` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `NaruceniProizvod_ibfk_2` FOREIGN KEY (`ProizvodId`) REFERENCES `Proizvod` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `NaruceniProizvod`
--

LOCK TABLES `NaruceniProizvod` WRITE;
/*!40000 ALTER TABLE `NaruceniProizvod` DISABLE KEYS */;
INSERT INTO `NaruceniProizvod` VALUES (1,'Dimkad va.','Uca zaheruham voc saciv rieji tu la vigijci jekolno maolozo supcec no apnop hoz.','Avaya Inc.','https://picsum.photos/800/600',77.10,2,'preparat',720000,'2020-06-23 15:24:01','2020-06-23 15:24:01',1,6),(2,'Nuk mu.','Jovrum jeji duracop zicej puwol eheeruju ohhit fikiw fugahwef iwfo ta tipfucof dop rekecerub ej teduzojo wu fasajofaf.','Pfizer Inc','https://picsum.photos/800/600',87.96,8,'preparat',60000,'2020-06-23 15:24:01','2020-06-23 15:24:01',1,1),(3,'Nef oz.','Vub giolofi zuhe gacmut zabcutrig hi batti so jimdom conop ruvjuzes ro finun luonlaf ho edjidiz jenujat to.','Willamette Industries Inc.','https://picsum.photos/800/600',79.90,7,'preparat',420000,'2020-06-23 15:24:01','2020-06-23 15:24:01',2,5),(4,'Rohtug vovoje.','Ed ricaj lar noj awolo hu kozciaw pef dil fefir lahmok li zed ce jik.','Magellan Health Services Inc.','https://picsum.photos/800/600',95.07,6,'sadnica',240000,'2020-06-23 15:24:01','2020-06-23 15:24:01',2,10),(5,'Co wipiv.','Pu dal athumeb uw babfozod mi sop gikcetuz livolhun sadkaset pi sozes rasetaeno tofcit sawo haf.','Ciena Corp.','https://picsum.photos/800/600',63.98,10,'sadnica',60000,'2020-06-23 15:24:01','2020-06-23 15:24:01',1,20),(6,'Fubfonago la.','Kod kov doudu ikuufze wu padvarce abni zevzakpid fupemci pag kajig lorpapaso utrod.','Nortek Inc','https://picsum.photos/800/600',72.65,7,'sadnica',480000,'2020-06-23 15:24:01','2020-06-23 15:24:01',1,3),(7,'Sofi jum.','Wafu davve fu zevi koh na raci po zuasegod dec dovdewe taeta husejug poowa ip geasibe rocfiske.','National Fuel Gas Company','https://picsum.photos/800/600',87.05,8,'sadnica',360000,'2020-06-23 15:24:01','2020-06-23 15:24:01',1,2),(8,'Zidwa cog.','Fuclod botuiwe lusduf je rommiwteh ige kec bulgutvib fukfa vijgos mitipjik tihofiv so movucduf aj savehah.','Ecolab Inc.','https://picsum.photos/800/600',8.36,1,'sadnica',60000,'2020-06-23 15:24:01','2020-06-23 15:24:01',2,4),(9,'Cerzo er.','Kutucnul vinhunnos ge fu ha ca jopmes sol ato ujni bam vuj tiecu.','National City Corp.','https://picsum.photos/800/600',33.92,10,'sadnica',300000,'2020-06-23 15:24:01','2020-06-23 15:24:01',2,18),(10,'Ecicus manircab.','Opseb ivouzu gem nocpi op alto ikju lelizda kibonuk de sarhi mumaka dumodiw ojmedcan.','Belk, Inc.','https://picsum.photos/800/600',98.11,3,'sadnica',420000,'2020-06-23 15:24:01','2020-06-23 15:24:01',2,16),(11,'Bam jivah.','Du vamo fearter asuaku diw le fi tem ovmorfo pinopbah fopuju hooji sidso kudiata wo er wobwe ki.','SLM Corporation','https://picsum.photos/800/600',1.12,6,'preparat',240000,'2020-06-23 15:24:01','2020-06-23 15:24:01',3,15),(12,'Bufno wi.','Cigsivi hohubke tiiso nog fawa ucire kaomrul adajibac mizam jud haksioj ilzuwib subgoume.','Coca-Cola Co.','https://picsum.photos/800/600',23.86,3,'preparat',240000,'2020-06-23 15:24:01','2020-06-23 15:24:01',3,11),(13,'Uhwotfo jemtel.','Suguhuc gucav uptuce berupobu vuuwad falet wurcupa siila ipu gun rinifi renzooh cu ovko uko jiovo.','Felcor Lodging Trust Inc.','https://picsum.photos/800/600',72.63,0,'preparat',360000,'2020-06-23 15:24:01','2020-06-23 15:24:01',3,3),(14,'Ciut gud.','Rumgodfo ijita migehnan anaowi do ze zadhohsil sed webifoc juij kezezed rij cij wuv kov og vi.','AK Steel Holding Corporation','https://picsum.photos/800/600',82.12,3,'sadnica',240000,'2020-06-23 15:24:01','2020-06-23 15:24:01',3,8),(15,'Na cuwormep.','Kanud eh ifo kenatjot mucicruc ohe fa hanvonzic luljo setidkug ges me ikus ladorror geb kihabe.','PolyOne Corp','https://picsum.photos/800/600',50.00,4,'preparat',60000,'2020-06-23 15:24:01','2020-06-23 15:24:01',3,16),(16,'Vumesa rec.','Lor hoglesa liwgidnad le usocak on casade dudobaf beg cawoh funa ah zahah jizac.','Simon Property Group Inc','https://picsum.photos/800/600',45.94,9,'sadnica',180000,'2020-06-23 15:24:01','2020-06-23 15:24:01',4,14),(17,'Ehcalkub zotca.','Bu fas ujnad let ehukob ebu combe bacugke nav wogik zuahi wo dir wezu.','General Electric Company','https://picsum.photos/800/600',36.22,3,'sadnica',360000,'2020-06-23 15:24:01','2020-06-23 15:24:01',4,20),(18,'Cahevek zadages.','Mimucnug dewpu juzgep hes cijilir tuwa marade bu ijakooki rizum cebgifda jafdab ze cus jonok hahco galuwleh.','US Oncology Inc','https://picsum.photos/800/600',73.18,4,'sadnica',180000,'2020-06-23 15:24:01','2020-06-23 15:24:01',4,19),(19,'Letadlup hezoz.','Refpopgim fojezi ka gukgov jefu du uzeneuc zit pogze ledibzuc gawwowot fihfoj.','Electronic Arts Inc.','https://picsum.photos/800/600',6.30,3,'preparat',420000,'2020-06-23 15:24:01','2020-06-23 15:24:01',4,7),(20,'Mec raci.','Ufuka rignuje ga kejjeh vawluus fumtobop nipja mev jasitifi jugipfo azmatle netezkis.','Becton, Dickinson and Company','https://picsum.photos/800/600',10.31,6,'preparat',360000,'2020-06-23 15:24:01','2020-06-23 15:24:01',4,18),(21,'Bufmilsig zi.','Sen buv upoizci fajajpip se zehol iffosba no mulu nezpowip su owne hes agu.','Host Marriott Corp.','https://picsum.photos/800/600',16.85,6,'sadnica',120000,'2020-06-23 15:24:01','2020-06-23 15:24:01',5,17),(22,'Desci bomne.','Zota domvi jeffo te rij zigtem masiwag so wodgol gotobiwe doseoza famli bice punaev.','PepsiCo Inc.','https://picsum.photos/800/600',59.53,10,'sadnica',660000,'2020-06-23 15:24:01','2020-06-23 15:24:01',5,3),(23,'Ar korafu.','Won guhsuci pozef edba udtake pi zoufbir he sadki vinfiluli pifev fiwukow ma ciwkep zotbeci zuncu saide utevno.','American Standard Companies Inc.','https://picsum.photos/800/600',81.25,1,'preparat',180000,'2020-06-23 15:24:01','2020-06-23 15:24:01',5,7),(24,'Iccukini ebesin.','Ucmud kup eda pi ra fe fese leco ka igewovo ig oseec lo ciz.','Stryker Corp','https://picsum.photos/800/600',88.62,9,'sadnica',660000,'2020-06-23 15:24:01','2020-06-23 15:24:01',5,6),(25,'Pogjo tuuhoib.','Bakbikwo fotav latsamav tot jese bejok siw ateez kivagehe ati laeteaze god.','Genzyme Corporation','https://picsum.photos/800/600',10.91,0,'sadnica',360000,'2020-06-23 15:24:01','2020-06-23 15:24:01',5,1);
/*!40000 ALTER TABLE `NaruceniProizvod` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Narudzbina`
--

DROP TABLE IF EXISTS `Narudzbina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Narudzbina` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `total` decimal(10,0) NOT NULL DEFAULT '0',
  `status` enum('naCekanju','odobrena','odbijena') NOT NULL DEFAULT 'naCekanju',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `MagacinId` int(11) DEFAULT NULL,
  `KurirId` int(11) DEFAULT NULL,
  `PreduzeceId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `MagacinId` (`MagacinId`),
  KEY `KurirId` (`KurirId`),
  KEY `PreduzeceId` (`PreduzeceId`),
  CONSTRAINT `Narudzbina_ibfk_1` FOREIGN KEY (`MagacinId`) REFERENCES `Magacin` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Narudzbina_ibfk_2` FOREIGN KEY (`KurirId`) REFERENCES `Kurir` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Narudzbina_ibfk_3` FOREIGN KEY (`PreduzeceId`) REFERENCES `Preduzece` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Narudzbina`
--

LOCK TABLES `Narudzbina` WRITE;
/*!40000 ALTER TABLE `Narudzbina` DISABLE KEYS */;
INSERT INTO `Narudzbina` VALUES (1,454,'naCekanju','2020-06-23 15:24:01','2020-06-23 15:24:02',2,NULL,1),(2,1511,'naCekanju','2020-06-23 15:24:01','2020-06-23 15:24:02',3,NULL,1),(3,1157,'naCekanju','2020-06-23 15:24:01','2020-06-23 15:24:02',5,NULL,1),(4,1883,'naCekanju','2020-06-23 15:24:01','2020-06-23 15:24:01',NULL,NULL,1),(5,746,'naCekanju','2020-06-23 15:24:01','2020-06-23 15:24:01',NULL,NULL,1);
/*!40000 ALTER TABLE `Narudzbina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ocena`
--

DROP TABLE IF EXISTS `Ocena`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Ocena` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ocena` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `KorisnikId` int(11) DEFAULT NULL,
  `ProizvodId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `KorisnikId` (`KorisnikId`),
  KEY `ProizvodId` (`ProizvodId`),
  CONSTRAINT `Ocena_ibfk_1` FOREIGN KEY (`KorisnikId`) REFERENCES `Korisnik` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Ocena_ibfk_2` FOREIGN KEY (`ProizvodId`) REFERENCES `Proizvod` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ocena`
--

LOCK TABLES `Ocena` WRITE;
/*!40000 ALTER TABLE `Ocena` DISABLE KEYS */;
INSERT INTO `Ocena` VALUES (1,2,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,1),(2,4,'2020-06-23 15:24:00','2020-06-23 15:24:00',1,1),(3,1,'2020-06-23 15:24:00','2020-06-23 15:24:00',1,1),(4,1,'2020-06-23 15:24:00','2020-06-23 15:24:00',2,1),(5,2,'2020-06-23 15:24:00','2020-06-23 15:24:00',1,1),(6,1,'2020-06-23 15:24:00','2020-06-23 15:24:00',2,9),(7,3,'2020-06-23 15:24:00','2020-06-23 15:24:00',1,9),(8,5,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,9),(9,1,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,9),(10,1,'2020-06-23 15:24:00','2020-06-23 15:24:00',2,9),(11,0,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,2),(12,0,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,2),(13,4,'2020-06-23 15:24:00','2020-06-23 15:24:00',2,2),(14,4,'2020-06-23 15:24:00','2020-06-23 15:24:00',2,2),(15,0,'2020-06-23 15:24:00','2020-06-23 15:24:00',2,2),(16,3,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,11),(17,5,'2020-06-23 15:24:00','2020-06-23 15:24:00',1,11),(18,2,'2020-06-23 15:24:00','2020-06-23 15:24:00',2,11),(19,2,'2020-06-23 15:24:00','2020-06-23 15:24:00',1,11),(20,1,'2020-06-23 15:24:00','2020-06-23 15:24:00',2,11),(21,1,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,19),(22,1,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,19),(23,5,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,19),(24,0,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,19),(25,1,'2020-06-23 15:24:00','2020-06-23 15:24:00',1,19),(26,2,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,4),(27,1,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,4),(28,1,'2020-06-23 15:24:00','2020-06-23 15:24:00',2,4),(29,2,'2020-06-23 15:24:00','2020-06-23 15:24:00',1,4),(30,2,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,4),(31,5,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,10),(32,5,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,10),(33,1,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,10),(34,4,'2020-06-23 15:24:00','2020-06-23 15:24:00',1,10),(35,5,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,10),(36,0,'2020-06-23 15:24:00','2020-06-23 15:24:00',2,3),(37,1,'2020-06-23 15:24:00','2020-06-23 15:24:00',2,3),(38,2,'2020-06-23 15:24:00','2020-06-23 15:24:00',2,3),(39,0,'2020-06-23 15:24:00','2020-06-23 15:24:00',1,3),(40,2,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,3),(41,1,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,8),(42,3,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,8),(43,4,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,8),(44,0,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,8),(45,2,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,8),(46,1,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,5),(47,1,'2020-06-23 15:24:00','2020-06-23 15:24:00',2,5),(48,5,'2020-06-23 15:24:00','2020-06-23 15:24:00',1,5),(49,3,'2020-06-23 15:24:00','2020-06-23 15:24:00',3,5),(50,0,'2020-06-23 15:24:00','2020-06-23 15:24:00',2,5);
/*!40000 ALTER TABLE `Ocena` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Poljoprivrednik`
--

DROP TABLE IF EXISTS `Poljoprivrednik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Poljoprivrednik` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `birthPlace` varchar(255) NOT NULL,
  `birthDate` datetime NOT NULL,
  `KorisnikId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `KorisnikId` (`KorisnikId`),
  CONSTRAINT `Poljoprivrednik_ibfk_1` FOREIGN KEY (`KorisnikId`) REFERENCES `Korisnik` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Poljoprivrednik`
--

LOCK TABLES `Poljoprivrednik` WRITE;
/*!40000 ALTER TABLE `Poljoprivrednik` DISABLE KEYS */;
INSERT INTO `Poljoprivrednik` VALUES (1,'Mathilda','Tassi','Wotitek, MD','1968-05-11 20:31:12',2);
/*!40000 ALTER TABLE `Poljoprivrednik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Preduzece`
--

DROP TABLE IF EXISTS `Preduzece`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Preduzece` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `dateOfCreation` datetime NOT NULL,
  `KorisnikId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `KorisnikId` (`KorisnikId`),
  CONSTRAINT `Preduzece_ibfk_1` FOREIGN KEY (`KorisnikId`) REFERENCES `Korisnik` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Preduzece`
--

LOCK TABLES `Preduzece` WRITE;
/*!40000 ALTER TABLE `Preduzece` DISABLE KEYS */;
INSERT INTO `Preduzece` VALUES (1,'Allie','Itlilpi, PR','1999-08-27 21:52:00',3);
/*!40000 ALTER TABLE `Preduzece` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Proizvod`
--

DROP TABLE IF EXISTS `Proizvod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Proizvod` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `manufacturer` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `type` enum('sadnica','preparat') NOT NULL,
  `value` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PreduzeceId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PreduzeceId` (`PreduzeceId`),
  CONSTRAINT `Proizvod_ibfk_1` FOREIGN KEY (`PreduzeceId`) REFERENCES `Preduzece` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Proizvod`
--

LOCK TABLES `Proizvod` WRITE;
/*!40000 ALTER TABLE `Proizvod` DISABLE KEYS */;
INSERT INTO `Proizvod` VALUES (1,'Wipadsi buoku.','Gel fefafo ma vu oludet ojeso jurukmof wadwescon ujuja potkusris gutwujca uvmi ibihfiw gaadi wecedub jaj ote.','Liz Claiborne Inc.','https://picsum.photos/800/600',54.29,3,'preparat',660000,'2020-06-23 15:23:59','2020-06-23 15:23:59',1),(2,'Ce tincobvec.','Melehupew amaci necevon zakju zosweab zoc rasahum sod sopruz gaplawov ane sos cekerona nudta hihib irhiof puemeku.','Metris Companies Inc','https://picsum.photos/800/600',81.46,1,'sadnica',300000,'2020-06-23 15:23:59','2020-06-23 15:23:59',1),(3,'Ukofigbot joszi.','Esjirjow nilew wiisus losfut ohugarfa tomu evkoz iha asve sonuoma duic enu gotpe in ennokeb tiwecgu zi.','OfficeMax Inc','https://picsum.photos/800/600',11.17,0,'sadnica',120000,'2020-06-23 15:23:59','2020-06-23 15:23:59',1),(4,'Zur sozulpe.','Wujab owuruut jielac of bid ejijfe bu cadogoz ri vet mum huzira godab ekaamo loc.','Mercury General Corporation','https://picsum.photos/800/600',47.45,6,'preparat',720000,'2020-06-23 15:23:59','2020-06-23 15:23:59',1),(5,'Huwos sub.','Re tol pa walerega zucmowo wu duh fosobgor hemvegju dol pafewbo udalopoz hauwve.','Allergan, Inc.','https://picsum.photos/800/600',37.15,8,'sadnica',120000,'2020-06-23 15:23:59','2020-06-23 15:23:59',1),(6,'Raatloz fa.','Ne maw pa gackud lasizufap bukcu wiwub na nev zuzhuw awi jotma judoer me ik ence ni lanlu.','Idacorp Inc.','https://picsum.photos/800/600',7.15,10,'preparat',360000,'2020-06-23 15:23:59','2020-06-23 15:23:59',1),(7,'Nohewmo pad.','Nojne dotiv pe far vigowo hobjaho kiit kik oweje retij zuteseje fik ji wearvo.','Conoco Inc','https://picsum.photos/800/600',60.80,8,'preparat',480000,'2020-06-23 15:23:59','2020-06-23 15:23:59',1),(8,'Jifdismuz li.','Osuriri lozikbod fiwut navgiuj muw zejmudu cekhodu kizwof cajib ki ceim um pevikpek mo wib hapelfuw megmokva.','Sanmina-SCI Inc','https://picsum.photos/800/600',1.20,4,'sadnica',540000,'2020-06-23 15:23:59','2020-06-23 15:23:59',1),(9,'Lacap risuvi.','Ku no cutkuz komjahkug lakiger gap om esokci ogpudi tahgus uki ze zuusanad ku habtomoz erupej foj jiejeno.','L-3 Communications Holdings Inc.','https://picsum.photos/800/600',62.45,4,'preparat',660000,'2020-06-23 15:23:59','2020-06-23 15:23:59',1),(10,'Ofre bodinu.','Vacme kedupci no dizusham biwlogov upokoel nudid goj laha derof tamokvi lu hofzerri.','Western Digital Inc','https://picsum.photos/800/600',14.84,1,'preparat',720000,'2020-06-23 15:23:59','2020-06-23 15:23:59',1),(11,'Sup uka.','Haloru motiur didboku ke innot pez huzhico owdizsu nij mescorpog wace an dikal ug.','International Paper Co.','https://picsum.photos/800/600',96.10,10,'preparat',240000,'2020-06-23 15:23:59','2020-06-23 15:23:59',1),(12,'Beco hunadato.','Veher ijole pelew babo gofmismit akeuh bi ujturuwu je imi avboljaf feco.','Caremark Rx Inc.','https://picsum.photos/800/600',64.74,9,'preparat',60000,'2020-06-23 15:23:59','2020-06-23 15:23:59',1),(13,'Bizgohuj ameni.','Ucsolho rateput hednimi sidulomu gic wajruk gofepo kakuj odmaw poan fudagudo bupvi guzta huznuvzo vi kuezdug.','Mirant Corporation','https://picsum.photos/800/600',16.70,2,'sadnica',60000,'2020-06-23 15:23:59','2020-06-23 15:23:59',1),(14,'Ukewe luh.','Fodeok kefige sogi tiiprid oriij icotil afzi eb rah giba odu patecoc vukepbo mirubizo guud tek eva hasaow.','Hormel Foods Corp.','https://picsum.photos/800/600',74.05,6,'sadnica',480000,'2020-06-23 15:23:59','2020-06-23 15:23:59',1),(15,'Mesfis aje.','Vucigu ribvaru ec laj zup ula dawel erpu be gucehho sewluete feivo move.','Noble Energy Inc','https://picsum.photos/800/600',1.67,5,'sadnica',240000,'2020-06-23 15:23:59','2020-06-23 15:23:59',1),(16,'Az adsuheb.','Woruwhok wu puijmi am dok pitaaza jufa geivisi vomme wozanjuc tilewejur nafigaluk piwvul wockuw tejnad wihnac.','Phoenix Companies Inc','https://picsum.photos/800/600',30.47,6,'sadnica',480000,'2020-06-23 15:23:59','2020-06-23 15:23:59',1),(17,'Sum ka.','Zeuwgi bog so oboibom dukes foiru tom furlopsal rim lavzu wor juiwu lusri ol uzulo vu.','New Jersey Resources Corporation','https://picsum.photos/800/600',24.80,1,'sadnica',720000,'2020-06-23 15:23:59','2020-06-23 15:23:59',1),(18,'Zav opovo.','Uz ha pido bi bobec wu sal dinaz apesebij ugut bawil kiw tenavvub omawujov sam.','Comfort Systems USA Inc.','https://picsum.photos/800/600',91.43,8,'sadnica',300000,'2020-06-23 15:23:59','2020-06-23 15:23:59',1),(19,'Vipu cib.','Ju iwi awo li hoowozal unkulcoc edwowge lorezel do engi azdif ewudeese duc ci juureza mima cir kuti.','NCR Corporation','https://picsum.photos/800/600',41.39,2,'sadnica',540000,'2020-06-23 15:23:59','2020-06-23 15:23:59',1),(20,'Ibahadok tac.','Neh nozahovol wa va to uvral saudo zatowzop sorvi lijcewum gahvunbaz uta kepfan dothas ceabok uwhebom zo.','Shopko Stores Inc','https://picsum.photos/800/600',46.11,3,'preparat',540000,'2020-06-23 15:23:59','2020-06-23 15:23:59',1);
/*!40000 ALTER TABLE `Proizvod` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rasadnik`
--

DROP TABLE IF EXISTS `Rasadnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Rasadnik` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `width` int(11) NOT NULL,
  `length` int(11) NOT NULL,
  `temperature` decimal(10,2) DEFAULT '18.00',
  `waterLevel` int(11) DEFAULT '200',
  `PoljoprivrednikId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PoljoprivrednikId` (`PoljoprivrednikId`),
  CONSTRAINT `Rasadnik_ibfk_1` FOREIGN KEY (`PoljoprivrednikId`) REFERENCES `Poljoprivrednik` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rasadnik`
--

LOCK TABLES `Rasadnik` WRITE;
/*!40000 ALTER TABLE `Rasadnik` DISABLE KEYS */;
INSERT INTO `Rasadnik` VALUES (1,'Tribune Company','27 Dici Way, Ohgumbaf',11,18,17.50,199,1),(2,'Hon Industries Inc.','417 Rutig Lane, Mefpansi',16,15,17.50,199,1),(3,'Cisco Systems Inc.','56 Ezkaw Heights, Sihegid',10,10,17.50,199,1),(4,'Morgan Stanley Dean Witter & Co.','60 Panu Ridge, Pohiwelo',14,14,17.50,199,1),(5,'USG Corporation','1419 Rubhu Glen, Namizvuv',14,16,17.50,199,1);
/*!40000 ALTER TABLE `Rasadnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sadnik`
--

DROP TABLE IF EXISTS `Sadnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Sadnik` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `manufacturer` varchar(255) NOT NULL,
  `ms` int(11) NOT NULL,
  `izvadiNa` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `RasadnikId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `RasadnikId` (`RasadnikId`),
  CONSTRAINT `Sadnik_ibfk_1` FOREIGN KEY (`RasadnikId`) REFERENCES `Rasadnik` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sadnik`
--

LOCK TABLES `Sadnik` WRITE;
/*!40000 ALTER TABLE `Sadnik` DISABLE KEYS */;
/*!40000 ALTER TABLE `Sadnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'pia'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-23 16:45:22
