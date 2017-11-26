START TRANSACTION;

CREATE DATABASE IF NOT EXISTS mysqlSchemaToMarkDown_SampleData;
USE mysqlSchemaToMarkDown_SampleData;

CREATE TABLE House (
	id INT AUTO_INCREMENT COMMENT "Primary key of the house",
  address VARCHAR(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT "This is the address of the house",
  sale_status ENUM('not for sale', 'on sale', 'pending', 'to be sold') NOT NULL,
	square_feet int NOT NULL COMMENT "This is the size of the house",
	PRIMARY KEY(id)
);

CREATE TABLE Pet (
    id int PRIMARY KEY AUTO_INCREMENT COMMENT "Primary key of the pet",
    house_id int NOT NULL COMMENT "This references the key of the house",
    name VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT "This is a comment about the name", 
    owner VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT "This is a comment about the owner",
    species VARCHAR(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT "This is a comment about the species",
    sex CHAR(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT "This is a comment about the sex",
    birth DATE NOT NULL COMMENT "This is a comment about the birth", 
    death DATE NULL COMMENT "This is a comment about the date of the death",
    CONSTRAINT FK_PetHouse FOREIGN KEY (house_id) REFERENCES House(id)
);

COMMIT;