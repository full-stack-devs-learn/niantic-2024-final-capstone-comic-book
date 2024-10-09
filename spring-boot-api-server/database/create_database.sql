# ---------------------------------------------------------------------- #
# Target DBMS:           MySQL                                           #
# Project name:          Comic Circle                                	 #
# ---------------------------------------------------------------------- #
DROP DATABASE IF EXISTS comic_circle;

CREATE DATABASE IF NOT EXISTS comic_circle;

USE comic_circle;

# ---------------------------------------------------------------------- #
# Tables                                                                 #
# ---------------------------------------------------------------------- #

CREATE TABLE users (
                       user_id INT NOT NULL AUTO_INCREMENT,
                       username VARCHAR(50) NOT NULL,
                       hashed_password VARCHAR(255) NOT NULL,
                       role VARCHAR(50) NOT NULL,
                       PRIMARY KEY (user_id)
);

/*  INSERT Users  */
/* Users and Passwords
username    password
--------    --------
wolverine   password
spider-man	password
iron-man	password
black-widow	password
storm   	password

 are: password */
INSERT INTO users (username, hashed_password, role)
VALUES  ('wolverine','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_USER'),
('spider-man','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_USER'),
('iron-man','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_USER'),
('black-widow','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_USER'),
('storm','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_USER');


-- Creating the user_profile table
CREATE TABLE user_profile (
    user_id INT NOT NULL,
    email VARCHAR(100) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    address VARCHAR(150),
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Inserting data into user_profile table
INSERT INTO user_profile (user_id, email, first_name, last_name, address)
VALUES
    (1, 'wolverine@example.com', 'James', 'Logan', '123 Maple Street, Springfield, USA'),
    (2, 'spider.man@example.com', 'Peter', 'Parker', '456 Oak Street, Springfield, USA'),
    (3, 'iron.man@example.com', 'Tony', 'Stark', '789 Pine Street, Springfield, USA'),
    (4, 'black.widow@example.com', 'Natasha', 'Romanoff', '101 Birch Avenue, Springfield, USA'),
    (5, 'storm@example.com', 'Storm', '', '202 Cedar Road, Springfield, USA');

-- Creating the comic_book table
CREATE TABLE comic_book (
    comic_book_id INT NOT NULL AUTO_INCREMENT,
    marvel_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    details_url VARCHAR(255),
    book_condition VARCHAR(50),
    published_year INT,
    issue_number INT,
    PRIMARY KEY (comic_book_id)
);

-- Inserting data into comic_book table
INSERT INTO comic_book (comic_book_id, marvel_id, title, description, image_url, details_url, book_condition, published_year, issue_number)
VALUES
    (1, 1001, 'Spider-Man #1', 'The first issue of Spider-Man series', 'https://example.com/spiderman1.jpg', 'https://example.com/spiderman1', 'New', 1963, 1),
    (2, 1002, 'X-Men #1', 'The first issue of X-Men series', 'https://example.com/xmen1.jpg', 'https://example.com/xmen1', 'Good', 1963, 1),
    (3, 1003, 'Avengers #1', 'The first issue of Avengers series', 'https://example.com/avengers1.jpg', 'https://example.com/avengers1', 'Mint', 1963, 1),
    (4, 1004, 'Fantastic Four #1', 'The first issue of Fantastic Four series', 'https://example.com/ffour1.jpg', 'https://example.com/ffour1', 'Fair', 1961, 1),
    (5, 1005, 'Hulk #1', 'The first issue of Hulk series', 'https://example.com/hulk1.jpg', 'https://example.com/hulk1', 'Poor', 1962, 1);

-- Creating the user_collection table
CREATE TABLE user_collection (
    user_id INT NOT NULL,
    comic_book_id INT NOT NULL,
    PRIMARY KEY (user_id, comic_book_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (comic_book_id) REFERENCES comic_book(comic_book_id)
);

-- Inserting data into user_collection table
INSERT INTO user_collection (user_id, comic_book_id)
VALUES
    (1, 2),
    (1, 3),
    (2, 5);
    
-- Creating the user_wishlist table
CREATE TABLE user_wishlist (
    user_id INT NOT NULL,
    comic_book_id INT NOT NULL,
	PRIMARY KEY (user_id, comic_book_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (comic_book_id) REFERENCES comic_book(comic_book_id)
);

-- Inserting data into user_wishlist table
INSERT INTO user_wishlist (user_id, comic_book_id)
VALUES
    (1, 1),
    (1, 5),
    (2, 2),
    (2, 3),
    (2, 4);

-- Creating the user_trade_collection table
CREATE TABLE user_trade_collection (
    user_id INT NOT NULL,
    comic_book_id INT NOT NULL,
	PRIMARY KEY (user_id, comic_book_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (comic_book_id) REFERENCES comic_book(comic_book_id)
);

-- Inserting data into user_trade_collection table
INSERT INTO user_trade_collection (user_id, comic_book_id)
VALUES
    (1, 4),
	(2, 1);

-- Creating the trade table
CREATE TABLE trade (
    trade_id INT NOT NULL AUTO_INCREMENT,
    user_a_id INT NOT NULL,
    user_b_id INT NOT NULL,
    comic_a_book_id INT NOT NULL,
    comic_b_book_id INT NOT NULL,
    trade_status VARCHAR(50) NOT NULL,
    user_a_received BOOLEAN NOT NULL DEFAULT FALSE,
    user_b_received BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (trade_id),
    FOREIGN KEY (user_a_id) REFERENCES users(user_id),
    FOREIGN KEY (user_b_id) REFERENCES users(user_id),
    FOREIGN KEY (comic_a_book_id) REFERENCES comic_book(comic_book_id),
    FOREIGN KEY (comic_b_book_id) REFERENCES comic_book(comic_book_id)
);

-- Inserting data into trade table
INSERT INTO trade (user_a_id, user_b_id, comic_a_book_id, comic_b_book_id, trade_status, user_a_received, user_b_received) 
VALUES 
(1, 2, 1, 2, 'Pending', FALSE, FALSE),  
(1, 3, 3, 2, 'Completed', TRUE, TRUE),  
(2, 4, 4, 5, 'Cancelled', FALSE, FALSE), 
(3, 5, 1, 3, 'Pending', FALSE, FALSE),  
(4, 5, 4, 5, 'In Progress', FALSE, FALSE);  
