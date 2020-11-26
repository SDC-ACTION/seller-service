
DROP DATABASE IF EXISTS shopping;
CREATE DATABASE shopping;
USE shopping;

CREATE TABLE seller (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(50),
  return_policy INT UNSIGNED REFERENCES return_policy,
  delivery_id INT UNSIGNED REFERENCES delivery_option(id),
  PRIMARY KEY (id)
);

CREATE TABLE product_seller (
  product_id INT UNSIGNED,
  seller_id INT UNSIGNED REFERENCES seller(id),
  price DECIMAL(6,2),
  PRIMARY KEY (product_id, seller_id)
);

CREATE TABLE delivery_option (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  fee VARCHAR(255),
  min_amount DECIMAL(5,2),
  days INT,
  PRIMARY KEY (id)
);

CREATE TABLE return_policy (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  description TEXT(65535),
  PRIMARY KEY (id)
);

CREATE TABLE state_tax (
  state VARCHAR(50) NOT NULL,
  tax DECIMAL(4,2),
  PRIMARY KEY (state)
);

LOAD DATA LOCAL INFILE './data/product_seller.csv'
INTO TABLE product_seller
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

LOAD DATA LOCAL INFILE './data/seller.csv'
INTO TABLE seller
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

LOAD DATA LOCAL INFILE './data/delivery_option.csv'
INTO TABLE delivery_option
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

LOAD DATA LOCAL INFILE './data/return_policy.csv'
INTO TABLE return_policy
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

LOAD DATA LOCAL INFILE './data/state_tax.csv'
INTO TABLE state_tax
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;