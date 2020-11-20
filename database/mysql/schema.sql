
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
  price DECIMAL,
  PRIMARY KEY (product_id, seller_id)
);

CREATE TABLE delivery_option (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  fee VARCHAR(255),
  min_amount DECIMAL,
  days INT,
  PRIMARY KEY (id)
);

CREATE TABLE return_policy (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  description TEXT(65535),
  PRIMARY KEY (id)
);

CREATE TABLE tax (
  state VARCHAR(50) NOT NULL,
  tax DECIMAL,
  PRIMARY KEY (state)
);
