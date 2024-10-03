# ---------------------------------------------------------------------- #
# Target DBMS:           MySQL                                           #
# Project name:          Comic Circle                                	 #
# ---------------------------------------------------------------------- #
DROP DATABASE IF EXISTS comic_circle;

CREATE DATABASE IF NOT EXISTS comic_circle;

USE comic_circle ;

# ---------------------------------------------------------------------- #
# Tables                                                                 #
# ---------------------------------------------------------------------- #

# Creating the user table
CREATE TABLE user (
      user_id INT NOT NULL AUTO_INCREMENT,
      username VARCHAR(50) NOT NULL,
      password VARCHAR(255) NOT NULL,
      first_name VARCHAR(50),
      last_name VARCHAR(50),
      address VARCHAR(150),
      PRIMARY KEY (user_id)
);

# Inserting data into the user table
INSERT INTO user (user_id, username, password, first_name, last_name, address)
VALUES
      (1, 'johndoe', 'password123', 'John', 'Doe', '123 Maple Street, Springfield, USA'),
      (2, 'janesmith', 'password456', 'Jane', 'Smith', '456 Oak Street, Springfield, USA'),
      (3, 'mikejones', 'password789', 'Mike', 'Jones', '789 Pine Street, Springfield, USA'),
      (4, 'saralee', 'passwordabc', 'Sara', 'Lee', '101 Birch Avenue, Springfield, USA'),
      (5, 'tomwilson', 'passworddef', 'Tom', 'Wilson', '202 Cedar Road, Springfield, USA');

# Creating the comic_book table
CREATE TABLE comic_book (
      comic_book_id INT NOT NULL AUTO_INCREMENT,
      marvel_id INT,
      title VARCHAR(255),
      description TEXT,
      image_url VARCHAR(255),
      details_url VARCHAR(255),
      book_condition VARCHAR(50),
      year INT,
      issue_number INT,
      PRIMARY KEY (comic_book_id)
);

# Inserting data into the comic_book table
INSERT INTO comic_book (comic_book_id, marvel_id, title, description, image_url, details_url, book_condition, year, issue_number)
VALUES
      (1, 1001, 'Spider-Man #1', 'The first issue of Spider-Man series', 'https://example.com/spiderman1.jpg', 'https://example.com/spiderman1', 'New', 1963, 1),
      (2, 1002, 'X-Men #1', 'The first issue of X-Men series', 'https://example.com/xmen1.jpg', 'https://example.com/xmen1', 'Good', 1963, 1),
      (3, 1003, 'Avengers #1', 'The first issue of Avengers series', 'https://example.com/avengers1.jpg', 'https://example.com/avengers1', 'Mint', 1963, 1),
      (4, 1004, 'Fantastic Four #1', 'The first issue of Fantastic Four series', 'https://example.com/ffour1.jpg', 'https://example.com/ffour1', 'Fair', 1961, 1),
      (5, 1005, 'Hulk #1', 'The first issue of Hulk series', 'https://example.com/hulk1.jpg', 'https://example.com/hulk1', 'Poor', 1962, 1);

# Creating the user_collection table
CREATE TABLE user_collection (
      collection_id INT NOT NULL AUTO_INCREMENT,
      user_id INT NOT NULL,
      comic_book_id INT NOT NULL,
      PRIMARY KEY (collection_id),
      FOREIGN KEY (user_id) REFERENCES user(user_id),
      FOREIGN KEY (comic_book_id) REFERENCES comic_book(comic_book_id)
);

# Inserting data into the user_collection table
INSERT INTO user_collection (collection_id, user_id, comic_book_id)
VALUES
      (1, 1, 1),  
      (2, 1, 2),  
      (3, 2, 1),  
      (4, 3, 3),  
      (5, 4, 4);

# Creating the user_wishlist table
CREATE TABLE user_wishlist (
      wishlist_id INT NOT NULL AUTO_INCREMENT,
      user_id INT NOT NULL,
      comic_book_id INT NOT NULL,
      PRIMARY KEY (wishlist_id),
      FOREIGN KEY (user_id) REFERENCES user(user_id),
      FOREIGN KEY (comic_book_id) REFERENCES comic_book(comic_book_id)
);

# Inserting data into the user_wishlist table
INSERT INTO user_wishlist (wishlist_id, user_id, comic_book_id)
VALUES
      (1, 1, 5),  
      (2, 2, 2),  
      (3, 3, 3),  
      (4, 1, 4),  
      (5, 4, 5);

# Creating the user_trade_collection table
CREATE TABLE user_trade_collection (
      trade_collection_id INT NOT NULL AUTO_INCREMENT,
      user_id INT NOT NULL,
      comic_book_id INT NOT NULL,
      PRIMARY KEY (trade_collection_id),
      FOREIGN KEY (user_id) REFERENCES user(user_id),
      FOREIGN KEY (comic_book_id) REFERENCES comic_book(comic_book_id)
);

# Inserting data into the user_trade_collection table
INSERT INTO user_trade_collection (trade_collection_id, user_id, comic_book_id)
VALUES
      (1, 1, 1),  
      (2, 2, 2),  
      (3, 3, 3),  
      (4, 4, 4),  
      (5, 1, 5); 

# Creating the trade_request table
CREATE TABLE trade_request (
      request_id INT NOT NULL AUTO_INCREMENT,
      user_a_id INT NOT NULL,
      user_b_id INT NOT NULL,
      comic_a_book_id INT NOT NULL,
      comic_b_book_id INT NOT NULL,
      status VARCHAR(50) NOT NULL,
      user_a_received BOOLEAN NOT NULL DEFAULT FALSE,
      user_b_received BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY (request_id),
      FOREIGN KEY (user_a_id) REFERENCES user(user_id),
      FOREIGN KEY (user_b_id) REFERENCES user(user_id),
      FOREIGN KEY (comic_a_book_id) REFERENCES comic_book(comic_book_id),
      FOREIGN KEY (comic_b_book_id) REFERENCES comic_book(comic_book_id)
);

# Inserting data into the trade_request table
INSERT INTO trade_request (request_id, user_a_id, user_b_id, comic_a_book_id, comic_b_book_id, status, user_a_received, user_b_received)
VALUES
      (1, 1, 2, 1, 2, 'pending', FALSE, FALSE),   
      (2, 3, 4, 3, 4, 'accepted', FALSE, FALSE),  
      (3, 1, 3, 5, 2, 'pending', FALSE, FALSE),   
      (4, 2, 4, 3, 4, 'rejected', FALSE, FALSE),  
      (5, 1, 4, 5, 1, 'pending', FALSE, FALSE);  
      
      


