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
    (1, 18237, 'X-Man (1995) #64', 
    'Nate Grey encounters a cult of mutant transcendent telepaths known as The Gauntlet! Who are they, and why have they been targeted by a powerful alien life form?', 
    'http://i.annihil.us/u/prod/marvel/i/mg/7/c0/57718888bfc9c.jpg', 
    'http://marvel.com/comics/issue/18237/x-man_1995_64', 
    '', 1995, 64),
    (2, 21385, 'Ultimate Origins (2007) #1', 
    'From the days of WWII to the present, journey through history to learn what\'s behind the Super Soldier and Weapon X programs-and how heroes such as Captain America, Nick Fury and Wolverine have more in common than codenames and costumes.', 
    'http://i.annihil.us/u/prod/marvel/i/mg/3/30/5aa2c32357855.jpg', 
    'http://marvel.com/comics/issue/21385/ultimate_origins_2007_1', 
    '', 2007, 1),
    (3, 109057, 'Magneto (2023) #4', 
    'S HE EVIL MUTANT, OR IS HE HERO...OR IS HE BOTH? MAGNETO must come to grips with his past as the Head of the Brotherhood of Evil Mutants, as well as his present as the Headmaster of the Xavier School\'s NEW MUTANTS! What is the TRUE destiny of Erik Lehnsherr? How can these two aspects co-exist in the same man? Don\'t miss the astounding final chapter of the character-defining saga by J.M. DeMatteis', 
    'http://i.annihil.us/u/prod/marvel/i/mg/5/c0/654bb0f90d212.jpg', 
    'http://marvel.com/comics/issue/109057/magneto_2023_4', 
    '', 2023, 4),
    (4, 118728, 'Venom War: Venomous (2024) #1', 
    'THE VENOMOUS BLACK WIDOW! Black Widow and her newly trained symbiote are jumping into the Venom War and picking a side! Fresh off their new understanding from the BLACK WIDOW: VENOMOUS one-shot, Widow starts looking into horrific experiments Alchemax has been running based on their symbiote program…but she isn\'t the only one! Natasha\'s old teammate from her Secret Avengers days, now known as Agent Anti-Venom, is also on the case!', 
    'http://i.annihil.us/u/prod/marvel/i/mg/3/10/66bb7144e2054.jpg', 
    'http://marvel.com/comics/issue/118728/venom_war_venomous_2024_1', 
    '', 2024, 1),
    (5, 113827, 'Women of Marvel (2024) #1', 
    'CELEBRATING THE MIGHTY WOMEN OF MARVEL! Because they worked hard for this and they deserve it! But who you callin\' "doll"?! Marvel\'s most powerful heroines take center stage in an anthology that will inspire, empower and motivate fans from all walks of life! Whether it\'s the Boss of Space pummeling back an alien invasion or the Scarlet Witch weaving a magical protection, the women of Marvel have got your back. Featuring a story by industry legend Gail Simone and more to come!', 
    'http://i.annihil.us/u/prod/marvel/i/mg/6/00/65ca4d152841c.jpg', 
    'http://marvel.com/comics/issue/113827/women_of_marvel_2024_1', 
    '', 2024, 1),
    (6, 113827, 'Black Widow (2004) #3', 
    'The intrigue continues as the spy who melted Siberia - Natasha Romanova - uses herself as bait to get vital info.  Meanwhile, her hunters in our nation\'s capital track her down, meaning - you guessed it - a guest appearance by Nick Fury!  Join mega-watt stars Richard K. Morgan & Bill Sienkiewicz (and cover artist Greg Land) as they heat up Marvel\'s hardboiled redhead this November!', 
    'http://i.annihil.us/u/prod/marvel/i/mg/5/c0/65d8b102e250c.jpg', 
    'https://www.marvel.com/comics/issue/39/black_widow_2004_3', 
    '', 2024, 3);

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
    (4, 4),
    (4, 5);
    
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
    (4, 6);

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
