drop database if exists chatbook;
create database chatbook;

use chatbook;

-- create tables

-- files table
DROP TABLE IF EXISTS `files`;
CREATE TABLE `files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `link` varchar(255) NOT NULL,
  `type` enum('image', 'video', 'file') default 'image',
  PRIMARY KEY (`id`)
);

-- users table
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `bio` varchar(255) DEFAULT 'This is default bio.',
  `password` char(64) NOT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `year_of_birth` int DEFAULT NULL,
  `phone` char(10) DEFAULT NULL,
  `profile_image` int DEFAULT NULL,
  `cover_image` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`email`),
  KEY `fk_users_cover_id_idx` (`cover_image`),
  KEY `fk_users_profile_id_idx` (`profile_image`),
  CONSTRAINT `fk_users_cover_id` FOREIGN KEY (`cover_image`) REFERENCES `files` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_users_profile_id` FOREIGN KEY (`profile_image`) REFERENCES `files` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
);

-- friends table
DROP TABLE IF EXISTS `friends`;
CREATE TABLE `friends` (
  `user_id` int NOT NULL,
  `friend_id` int NOT NULL,
  `is_following` tinyint DEFAULT '1',
  PRIMARY KEY (`user_id`,`friend_id`),
  KEY `fk_friends_friend_id_idx` (`friend_id`),
  CONSTRAINT `fk_friends_friend_id` FOREIGN KEY (`friend_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_friends_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- receiver table
DROP TABLE IF EXISTS `receiver`;
CREATE TABLE `receiver` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` text DEFAULT NULL ,
  `creator_id` int NOT NULL,
  `profile_image` int DEFAULT NULL,
  `cover_image` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` enum('groups','pages') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_receiver_creator_id_idx` (`creator_id`),
  KEY `fk_receiver_cover_image_idx` (`cover_image`),
  KEY `fk_receiver_profile_image_idx` (`profile_image`),
  CONSTRAINT `fk_receiver_cover_image` FOREIGN KEY (`cover_image`) REFERENCES `files` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_receiver_creator_id` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_receiver_profile_image` FOREIGN KEY (`profile_image`) REFERENCES `files` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
);

-- posts table
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `creator_id` int NOT NULL,
  `receiver_id` int DEFAULT NULL,
  `replied_to` int DEFAULT NULL,
  `text` text NOT NULL,
  `is_private` tinyint default '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  -- ON DELETE WE MUST SET ANOTHER USER AS CREATOR OF THIS GROUP.
  CONSTRAINT FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FOREIGN KEY (`receiver_id`) REFERENCES `receiver` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT FOREIGN KEY (`replied_to`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);


-- groups table
DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `id` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_receiver_id` FOREIGN KEY (`id`) REFERENCES `receiver` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- pages tablet
DROP TABLE IF EXISTS `pages`;
CREATE TABLE `pages` (
  `id` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_page_receiver_id` FOREIGN KEY (`id`) REFERENCES `receiver` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- membership table
DROP TABLE IF EXISTS `members`;
CREATE TABLE `members` (
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  `is_admin` tinyint NOT NULL DEFAULT '0',
  `is_blocked` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`,`group_id`),
  CONSTRAINT `fk_members_group_id` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_members_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- page_likes table
DROP TABLE IF EXISTS `page_likes`;
CREATE TABLE `page_likes` (
    `user_id` int NOT NULL,
    `page_id` int NOT NULL,
    `is_admin` tinyint NOT NULL DEFAULT '0',
    PRIMARY KEY (`user_id`,`page_id`),
    CONSTRAINT `fk_page_like_page_id` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_page_like_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- post_files table
DROP TABLE IF EXISTS `post_files`;
CREATE TABLE `post_files` (
  `post_id` int NOT NULL,
  `file_id` int NOT NULL,
  PRIMARY KEY (`post_id`,`file_id`),
  CONSTRAINT `fk_post_files_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_post_files_file_id` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- polls table
DROP TABLE IF EXISTS `polls`;
CREATE TABLE `polls` (
  `id` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_poll_post_id` FOREIGN KEY (`id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- poll_answers table
DROP TABLE IF EXISTS `poll_answers`;
CREATE TABLE `poll_answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `poll_id` int NOT NULL,
  `text` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_poll_answer_poll_id` FOREIGN KEY (`poll_id`) REFERENCES `polls` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- poll_votes table
DROP TABLE IF EXISTS `poll_votes`;
CREATE TABLE `poll_votes` (
  `poll_id` int NOT NULL,
  `answer_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`poll_id`, `user_id`, `answer_id`),
  CONSTRAINT `fk_poll_vote_poll_id` FOREIGN KEY (`poll_id`) REFERENCES `polls` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_poll_vote_answer_id` FOREIGN KEY (`answer_id`) REFERENCES `poll_answers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_poll_vote_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- user_messages table
DROP TABLE IF EXISTS `user_messages`;
CREATE TABLE `user_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int NOT NULL,
  `user_id` int NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_message_sender_id` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_message_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- stories table
DROP TABLE IF EXISTS `stories`;
CREATE TABLE `stories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  -- A STORY CAN HAVE IMAGE OR TEXT OR BOTH OF THEM OR NOTHING.
  `file_id` int DEFAULT NULL,
  `text` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_story_file_id` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_story_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- shares table
DROP TABLE IF EXISTS `shares`;
CREATE TABLE `shares` (
    `post_id` int NOT NULL,
    `user_id` int NOT NULL,
    `created_at` datetime default CURRENT_TIMESTAMP,
    `is_private` tinyint DEFAULT '0',
    PRIMARY KEY(`post_id`, `user_id`),
    CONSTRAINT `fk_share_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_share_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- reacts table
DROP TABLE IF EXISTS `reacts`;
CREATE TABLE `reacts` (
    `post_id` int NOT NULL,
    `user_id` int NOT NULL,
    `type` enum('like', 'heart', 'laugh', 'sad', 'angry') NOT NULL DEFAULT 'like',
    PRIMARY KEY(`post_id`, `user_id`),
    CONSTRAINT `fk_react_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_react_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- user_settings table
DROP TABLE IF EXISTS `user_settings`;
CREATE TABLE `user_settings` (
    `id` int NOT NULL,
    `theme` enum('light', 'dark') NOT NULL DEFAULT 'light',
    `value1` int DEFAULT NULL,
    `value2` int DEFAULT NULL,
    `value3` int DEFAULT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `fk_settings_user_id` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
