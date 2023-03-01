
CREATE DATABASE news_db;
USE news_db;
CREATE TABLE newsDetail (
  id INT AUTO_INCREMENT PRIMARY KEY,
  baslik VARCHAR(255),
  date VARCHAR(255),
  images VARCHAR(255),
  details VARCHAR(255)
);
