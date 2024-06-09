-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Ned 09. čen 2024, 23:04
-- Verze serveru: 10.4.28-MariaDB
-- Verze PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `vkteplice`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `akce`
--

CREATE TABLE `akce` (
  `id_akce` int(11) NOT NULL,
  `nazev` varchar(255) NOT NULL,
  `start` datetime NOT NULL,
  `konec` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `akce`
--

INSERT INTO `akce` (`id_akce`, `nazev`, `start`, `konec`, `createdAt`, `updatedAt`) VALUES
(15, 'U16', '2024-05-16 20:31:00', '2024-05-31 20:31:00', '2024-05-29 20:31:16', '2024-05-29 20:31:16'),
(16, 'soustředění Klíny', '2024-08-25 06:00:00', '2024-08-30 12:00:00', '2024-06-05 19:10:29', '2024-06-05 19:10:29'),
(17, 'Ukončovací trénink', '2024-06-27 15:00:00', '2024-06-27 17:00:00', '2024-06-06 17:06:13', '2024-06-06 17:06:13'),
(18, 'beachvolejbaloví turnaj U20', '2024-06-22 07:00:00', '2024-06-22 13:00:00', '2024-06-06 17:08:05', '2024-06-06 17:08:05');

-- --------------------------------------------------------

--
-- Struktura tabulky `akcetag`
--

CREATE TABLE `akcetag` (
  `id_akceTag` int(11) NOT NULL,
  `id_akce` int(11) NOT NULL,
  `id_tag` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `akcetag`
--

INSERT INTO `akcetag` (`id_akceTag`, `id_akce`, `id_tag`, `createdAt`, `updatedAt`) VALUES
(33, 16, 1, '2024-06-05 19:10:29', '2024-06-05 19:10:29'),
(34, 17, 1, '2024-06-06 17:06:13', '2024-06-06 17:06:13'),
(35, 18, 5, '2024-06-06 17:08:05', '2024-06-06 17:08:05');

-- --------------------------------------------------------

--
-- Struktura tabulky `img`
--

CREATE TABLE `img` (
  `id_img` int(11) NOT NULL,
  `img` varchar(64) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_prispevek` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `img`
--

INSERT INTO `img` (`id_img`, `img`, `createdAt`, `updatedAt`, `id_prispevek`) VALUES
(24, '70-Red-Black-Wallpapers-on-WallpaperPlay.jpg', '2024-05-04 20:49:57', '2024-05-04 20:50:28', 45),
(25, '52e59c2e71edccfca17ca794af0e4a44.png', '2024-05-04 20:50:08', '2024-05-04 20:50:08', 46),
(26, '031.834-----tce-h-03675-0--m--metelkovo-nam-skola-pohl.jpg', '2024-05-04 20:53:57', '2024-05-04 20:53:57', 47),
(28, '340315678_1657565348048042_7161687477589764510_n.jpg', '2024-06-06 17:02:09', '2024-06-06 17:02:09', 48),
(29, '339685409_758287539008358_8276807528558597363_n.jpg', '2024-06-06 17:03:10', '2024-06-06 17:03:10', 49),
(30, '336101406_208684155166729_5562596102683739861_n.jpg', '2024-06-06 17:03:58', '2024-06-06 17:03:58', 50);

-- --------------------------------------------------------

--
-- Struktura tabulky `kategorie`
--

CREATE TABLE `kategorie` (
  `id_kategorie` int(11) NOT NULL,
  `nazev` varchar(45) NOT NULL,
  `href` varchar(64) NOT NULL,
  `poradi` int(11) NOT NULL,
  `universal_ano` tinyint(4) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_klub` int(11) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `kategorie`
--

INSERT INTO `kategorie` (`id_kategorie`, `nazev`, `href`, `poradi`, `universal_ano`, `createdAt`, `updatedAt`, `id_klub`, `active`) VALUES
(1, 'Domu', '/', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 1),
(2, 'Týmy', '/tymy', 2, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 1),
(3, 'Kalendář', '/kalendar', 3, 0, '2024-02-02 19:39:13', '2024-02-02 19:39:13', 1, 1),
(4, 'Media', '/media', 4, 0, '2024-02-02 19:40:37', '2024-02-02 19:40:37', 1, 1),
(5, 'Nábor', '/nabor', 5, 1, '2024-02-02 19:41:40', '2024-02-02 19:41:40', 1, 1),
(6, 'Kontakty', '/kontakty', 6, 1, '2024-02-02 19:41:40', '2024-02-02 19:41:40', 1, 1);

-- --------------------------------------------------------

--
-- Struktura tabulky `klub`
--

CREATE TABLE `klub` (
  `id_klub` int(11) NOT NULL,
  `jmeno` varchar(45) NOT NULL,
  `logo` varchar(64) NOT NULL,
  `icona` varchar(64) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `klub`
--

INSERT INTO `klub` (`id_klub`, `jmeno`, `logo`, `icona`, `createdAt`, `updatedAt`) VALUES
(1, 'VK Teplice', 'logo.png', 'download_066_icon.ico', '0000-00-00 00:00:00', '2024-04-02 20:43:30');

-- --------------------------------------------------------

--
-- Struktura tabulky `pohlavi`
--

CREATE TABLE `pohlavi` (
  `id_pohlavi` int(11) NOT NULL,
  `nazev` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `pohlavi`
--

INSERT INTO `pohlavi` (`id_pohlavi`, `nazev`, `createdAt`, `updatedAt`) VALUES
(1, 'Muž', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Žena', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktura tabulky `prispevek`
--

CREATE TABLE `prispevek` (
  `id_prispevek` int(11) NOT NULL,
  `nadpis` varchar(45) NOT NULL,
  `popisek` varchar(500) DEFAULT NULL,
  `cas_pridani` datetime NOT NULL DEFAULT current_timestamp(),
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `prispevek`
--

INSERT INTO `prispevek` (`id_prispevek`, `nadpis`, `popisek`, `cas_pridani`, `createdAt`, `updatedAt`) VALUES
(45, 'rd', 'fdfgfg', '2024-05-04 20:49:57', '2024-05-04 20:49:57', '2024-05-04 20:49:57'),
(46, 'ghmghm', 'ghmghmghmhmg', '2024-05-04 20:50:08', '2024-05-04 20:50:08', '2024-05-04 20:50:08'),
(47, 'nav', 'afsd arfged  hrta cytfgjhtrh rt  hrtyrty yh rth srthjhj rtshhj rsr hjs rth shjrrtyhjs rt s rtyh wsr rt yhs   trsyhhr ts ht   thsryhj styhjsrty   ', '2024-05-04 20:53:57', '2024-05-04 20:53:57', '2024-05-04 20:53:57'),
(48, 'U20 v akci', 'Nejstarší kluci U20 obsadili 3.místo v kraji.', '2024-06-06 17:02:09', '2024-06-06 17:02:09', '2024-06-06 17:02:09'),
(49, 'U16 ', 'Starší žáci (U16) s pomocí dvou našich děvčat obsadili celkové 9.místo', '2024-06-06 17:03:10', '2024-06-06 17:03:10', '2024-06-06 17:03:10'),
(50, 'U16 v UnL', 'V neděli bylo odehráno předposlední kolo čtyřkového volejbalu v Ústí 😊😊 Hra A i B týmu se postupně zlepšuje, ale stále nás trápí jistota na servisu a následný příjem, což je pro nás limitující abychom byli ještě více úspěšnější 😶😶 Celkově jsme tak třikrát zvítězili a pětkrát prohráli', '2024-06-06 17:03:58', '2024-06-06 17:03:58', '2024-06-06 17:03:58');

-- --------------------------------------------------------

--
-- Struktura tabulky `sit`
--

CREATE TABLE `sit` (
  `id_sit` int(11) NOT NULL,
  `logo` varchar(64) NOT NULL,
  `odkaz` varchar(200) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_klub` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `sit`
--

INSERT INTO `sit` (`id_sit`, `logo`, `odkaz`, `createdAt`, `updatedAt`, `id_klub`) VALUES
(1, 'logo_sit1.png', 'odkaz1.com', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(2, 'logo_sit2.png', 'odkaz2.com', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Struktura tabulky `sponzor`
--

CREATE TABLE `sponzor` (
  `id_sponzor` int(11) NOT NULL,
  `logo` varchar(64) NOT NULL,
  `odkaz` varchar(200) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_klub` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `sponzor`
--

INSERT INTO `sponzor` (`id_sponzor`, `logo`, `odkaz`, `createdAt`, `updatedAt`, `id_klub`) VALUES
(1, 'cv.png', 'https://www.cvf.cz/', '0000-00-00 00:00:00', '2024-04-02 20:41:24', 1),
(2, 'j.jpg', 'https://www.jadberg.eu/', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(3, 'CoA_of_Teplice.svg', 'https://www.teplice.cz/', '2024-02-02 18:38:52', '2024-05-16 19:13:21', 1),
(4, 'uk.png', 'https://www.kr-ustecky.cz/', '2024-02-02 18:38:52', '2024-02-02 18:38:52', 1);

-- --------------------------------------------------------

--
-- Struktura tabulky `tag`
--

CREATE TABLE `tag` (
  `id_tag` int(11) NOT NULL,
  `nazev` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_pohlavi` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `tag`
--

INSERT INTO `tag` (`id_tag`, `nazev`, `createdAt`, `updatedAt`, `id_pohlavi`) VALUES
(1, 'všichni', '2024-05-05 00:34:39', '2024-05-05 00:34:39', NULL),
(5, 'U20', '2024-05-05 00:34:39', '2024-05-05 00:34:39', NULL),
(9, 'U16', '2024-06-06 17:00:50', '2024-06-06 17:00:50', NULL);

-- --------------------------------------------------------

--
-- Struktura tabulky `tags`
--

CREATE TABLE `tags` (
  `id_tags` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_tag` int(11) DEFAULT NULL,
  `id_prispevek` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `tags`
--

INSERT INTO `tags` (`id_tags`, `createdAt`, `updatedAt`, `id_tag`, `id_prispevek`) VALUES
(32, '2024-05-28 22:05:02', '2024-05-28 22:05:02', 5, 45),
(35, '2024-05-29 20:45:45', '2024-05-29 20:45:45', 1, 47),
(36, '2024-06-06 17:02:09', '2024-06-06 17:02:09', 5, 48),
(37, '2024-06-06 17:03:10', '2024-06-06 17:03:10', 9, 49),
(38, '2024-06-06 17:03:58', '2024-06-06 17:03:58', 9, 50);

-- --------------------------------------------------------

--
-- Struktura tabulky `tym`
--

CREATE TABLE `tym` (
  `id_tym` int(11) NOT NULL,
  `photo` varchar(64) DEFAULT NULL,
  `popisek` varchar(500) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_tag` int(11) DEFAULT NULL,
  `id_klub` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `tym`
--

INSERT INTO `tym` (`id_tym`, `photo`, `popisek`, `createdAt`, `updatedAt`, `id_tag`, `id_klub`) VALUES
(1, 'U20.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget rhoncus risus. Vivamus ante tortor, aliquet nec turpis et, viverra sodales lorem. Cras ut sem dolor. Donec elementum lorem vitae lacus faucibus semper.', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 5, 1),
(5, '339685409_758287539008358_8276807528558597363_n.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ', '2024-06-06 17:00:50', '2024-06-06 17:58:48', 9, 1);

-- --------------------------------------------------------

--
-- Struktura tabulky `universal`
--

CREATE TABLE `universal` (
  `id_universal` int(11) NOT NULL,
  `id_kategorie` int(11) NOT NULL,
  `obsah` varchar(1024) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Vypisuji data pro tabulku `universal`
--

INSERT INTO `universal` (`id_universal`, `id_kategorie`, `obsah`, `createdAt`, `updatedAt`) VALUES
(1, 5, 'Lorem ipsum dolor sit amet, consectetur \r\n\r\n adipiscing elit. Pellentesque eget rhoncus risus. Vivamus ante tortor, aliquet nec turpis et, viverra sodales lorem. Cras ut sem dolor.\r\n\r\n Donec elementum lorem vitae lacus faucibus semper. Proin feugiat interdum massa non mollis. Suspendisse egestas ultricies lacus et dictum.\r\n\r\n Nulla eros nibh, tempor sit amet elit id, fermentum consectetur nulla. Duis laoreet quam sem, in volutpat libero faucibus sit amet.\r\n', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 6, 'Edisonova 1732/9, 415 01 Teplice 1 \r\n\r\n\r\n Email: asdfds@qwerty.cz\r\n\r\n telefon trenéři:\r\n\r\n Pepa Novak: +420 789 456 321\r\n\r\n  Pepa Novak: +420 789 456 321\r\n', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `akce`
--
ALTER TABLE `akce`
  ADD PRIMARY KEY (`id_akce`);

--
-- Indexy pro tabulku `akcetag`
--
ALTER TABLE `akcetag`
  ADD PRIMARY KEY (`id_akceTag`);

--
-- Indexy pro tabulku `img`
--
ALTER TABLE `img`
  ADD PRIMARY KEY (`id_img`),
  ADD KEY `id_prispevek` (`id_prispevek`);

--
-- Indexy pro tabulku `kategorie`
--
ALTER TABLE `kategorie`
  ADD PRIMARY KEY (`id_kategorie`),
  ADD KEY `id_klub` (`id_klub`);

--
-- Indexy pro tabulku `klub`
--
ALTER TABLE `klub`
  ADD PRIMARY KEY (`id_klub`);

--
-- Indexy pro tabulku `pohlavi`
--
ALTER TABLE `pohlavi`
  ADD PRIMARY KEY (`id_pohlavi`);

--
-- Indexy pro tabulku `prispevek`
--
ALTER TABLE `prispevek`
  ADD PRIMARY KEY (`id_prispevek`);

--
-- Indexy pro tabulku `sit`
--
ALTER TABLE `sit`
  ADD PRIMARY KEY (`id_sit`),
  ADD KEY `id_klub` (`id_klub`);

--
-- Indexy pro tabulku `sponzor`
--
ALTER TABLE `sponzor`
  ADD PRIMARY KEY (`id_sponzor`),
  ADD KEY `id_klub` (`id_klub`);

--
-- Indexy pro tabulku `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id_tag`);

--
-- Indexy pro tabulku `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id_tags`),
  ADD KEY `id_tag` (`id_tag`),
  ADD KEY `id_prispevek` (`id_prispevek`);

--
-- Indexy pro tabulku `tym`
--
ALTER TABLE `tym`
  ADD PRIMARY KEY (`id_tym`),
  ADD KEY `id_tag` (`id_tag`),
  ADD KEY `id_klub` (`id_klub`);

--
-- Indexy pro tabulku `universal`
--
ALTER TABLE `universal`
  ADD PRIMARY KEY (`id_universal`),
  ADD KEY `id_kategorie` (`id_kategorie`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `akce`
--
ALTER TABLE `akce`
  MODIFY `id_akce` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pro tabulku `akcetag`
--
ALTER TABLE `akcetag`
  MODIFY `id_akceTag` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT pro tabulku `img`
--
ALTER TABLE `img`
  MODIFY `id_img` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pro tabulku `kategorie`
--
ALTER TABLE `kategorie`
  MODIFY `id_kategorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pro tabulku `klub`
--
ALTER TABLE `klub`
  MODIFY `id_klub` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pro tabulku `pohlavi`
--
ALTER TABLE `pohlavi`
  MODIFY `id_pohlavi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pro tabulku `prispevek`
--
ALTER TABLE `prispevek`
  MODIFY `id_prispevek` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT pro tabulku `sit`
--
ALTER TABLE `sit`
  MODIFY `id_sit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pro tabulku `sponzor`
--
ALTER TABLE `sponzor`
  MODIFY `id_sponzor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pro tabulku `tag`
--
ALTER TABLE `tag`
  MODIFY `id_tag` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pro tabulku `tags`
--
ALTER TABLE `tags`
  MODIFY `id_tags` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT pro tabulku `tym`
--
ALTER TABLE `tym`
  MODIFY `id_tym` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pro tabulku `universal`
--
ALTER TABLE `universal`
  MODIFY `id_universal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `img`
--
ALTER TABLE `img`
  ADD CONSTRAINT `img_ibfk_1` FOREIGN KEY (`id_prispevek`) REFERENCES `prispevek` (`id_prispevek`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `kategorie`
--
ALTER TABLE `kategorie`
  ADD CONSTRAINT `kategorie_ibfk_1` FOREIGN KEY (`id_klub`) REFERENCES `klub` (`id_klub`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `sit`
--
ALTER TABLE `sit`
  ADD CONSTRAINT `sit_ibfk_1` FOREIGN KEY (`id_klub`) REFERENCES `klub` (`id_klub`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `sponzor`
--
ALTER TABLE `sponzor`
  ADD CONSTRAINT `sponzor_ibfk_1` FOREIGN KEY (`id_klub`) REFERENCES `klub` (`id_klub`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `tag`
--
ALTER TABLE `tag`
  ADD CONSTRAINT `tag_ibfk_1` FOREIGN KEY (`id_pohlavi`) REFERENCES `pohlavi` (`id_pohlavi`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `tags`
--
ALTER TABLE `tags`
  ADD CONSTRAINT `tags_ibfk_1` FOREIGN KEY (`id_tag`) REFERENCES `tag` (`id_tag`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `tags_ibfk_2` FOREIGN KEY (`id_prispevek`) REFERENCES `prispevek` (`id_prispevek`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `tym`
--
ALTER TABLE `tym`
  ADD CONSTRAINT `tym_ibfk_1` FOREIGN KEY (`id_tag`) REFERENCES `tag` (`id_tag`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `tym_ibfk_2` FOREIGN KEY (`id_klub`) REFERENCES `klub` (`id_klub`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Omezení pro tabulku `universal`
--
ALTER TABLE `universal`
  ADD CONSTRAINT `universal_ibfk_1` FOREIGN KEY (`id_kategorie`) REFERENCES `kategorie` (`id_kategorie`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
