USE comic_circle;
SELECT 
	  b.comic_book_id
	, marvel_id
    , title
    , description
    , image_url
    , details_url
    , book_condition
    , published_year
    , issue_number
FROM user_collection AS c
INNER JOIN comic_book AS b
ON c.comic_book_id = b.comic_book_id
WHERE user_id = 1;

SELECT
	  b.comic_book_id
	, marvel_id
	, title
	, description
	, image_url
	, details_url
	, book_condition
	, published_year
	, issue_number
FROM user_trade_collection AS t
INNER JOIN comic_book AS b
ON t.comic_book_id = b.comic_book_id;