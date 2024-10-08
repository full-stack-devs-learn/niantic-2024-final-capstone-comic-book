package com.niantic.data;

import com.niantic.models.ComicBook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@Repository
public class MySqlComicBookDao implements ComicBookDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MySqlComicBookDao(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public List<ComicBook> getUserCollectionByUserId(int userId) {
        List<ComicBook> comics = new ArrayList<>();
        String sql = """
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
                WHERE user_id = ?;
                """;

        var row = jdbcTemplate.queryForRowSet(sql, userId);

        while (row.next()) {
            comics.add(mapRow(row));
        }

        return comics;
    }

    @Override
    public List<ComicBook> getUserWishlistByUserId(int userId) {
        List<ComicBook> comics = new ArrayList<>();
        String sql = """
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
                FROM user_wishlist AS w
                INNER JOIN comic_book AS b
                ON w.comic_book_id = b.comic_book_id
                WHERE user_id = ?;
                """;

        var row = jdbcTemplate.queryForRowSet(sql, userId);

        while (row.next()) {
            comics.add(mapRow(row));
        }

        return comics;
    }

    @Override
    public List<ComicBook> getUserTradeCollectionByUserId(int userId) {
        List<ComicBook> comics = new ArrayList<>();
        String sql = """
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
                ON t.comic_book_id = b.comic_book_id
                WHERE user_id = ?;
                """;

        var row = jdbcTemplate.queryForRowSet(sql, userId);

        while (row.next()) {
            comics.add(mapRow(row));
        }

        return comics;
    }

    @Override
    public List<ComicBook> getAllTradeComicBooks() {
        List<ComicBook> comics = new ArrayList<>();
        String sql = """
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
                """;

        var row = jdbcTemplate.queryForRowSet(sql);

        while (row.next()) {
            comics.add(mapRow(row));
        }

        return comics;
    }

    @Override
    public ComicBook getComicBookById(int comicBookId) {
        String sql = """
                SELECT * 
                FROM comic_book
                WHERE comic_book_id = ?;
                """;

        var row = jdbcTemplate.queryForRowSet(sql, comicBookId);

        if (row.next()) {
            return mapRow(row);
        }

        return null;
    }

    private ComicBook addComicBook(ComicBook comicBook) {
        String sql = """
                INSERT INTO comic_book  
                 (marvel_id
                , title
                , description
                , image_url
                , details_url
                , published_year
                , issue_number)
                VALUES (?, ?, ?, ?, ?, ?, ?);
                """;

        GeneratedKeyHolder generatedKeyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(conn -> {

            PreparedStatement preparedStatement = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            preparedStatement.setInt(1, comicBook.getMarvelId());
            preparedStatement.setString(2, comicBook.getTitle());
            preparedStatement.setString(3, comicBook.getDescription());
            preparedStatement.setString(4, comicBook.getImageUrl());
            preparedStatement.setString(5, comicBook.getDetailsUrl());
            preparedStatement.setInt(6, comicBook.getYear());
            preparedStatement.setInt(7, comicBook.getIssueNumber());

            return preparedStatement;

        }, generatedKeyHolder);

        int comicBookId = generatedKeyHolder.getKey().intValue();
        return getComicBookById(comicBookId);
    }

    @Override
    public ComicBook addComicBookToUserCollection(ComicBook comicBook, int userId) {
        comicBook = addComicBook(comicBook);
        String sql = """
                INSERT INTO user_collection
                (user_id, comic_book_id)
                VALUES (?, ?);
                """;

        jdbcTemplate.update(sql, userId, comicBook.getComicBookId());

        return comicBook;
    }

    @Override
    public ComicBook addComicBookToUserWishlist(ComicBook comicBook, int userId) {
        return null;
    }

    @Override
    public ComicBook addComicBookToUserTradeCollection(ComicBook comicBook, int userId) {
        return null;
    }

    @Override
    public void updateComicBookCondition(int comicBookId, String condition) {

    }

    @Override
    public void deleteComicBookFromUserCollection(int comicBookId, int userId) {

    }

    @Override
    public void deleteComicBookFromUserWishList(int comicBookId, int userId) {

    }

    @Override
    public void deleteComicBookFromUserTradeCollection(int comicBookId, int userId) {

    }

    private ComicBook mapRow(SqlRowSet row) {
        int comicBookId = row.getInt("comic_book_id");
        int marvelId = row.getInt("marvel_id");
        String title = row.getString("title");
        String description = row.getString("description");
        String imageUrl = row.getString("image_url");
        String detailsUrl = row.getString("details_url");
        String bookCondition = row.getString("book_condition");
        int year = row.getInt("published_year");
        int issueNumber = row.getInt("issue_number");

        return new ComicBook(comicBookId,
                marvelId,
                title,
                description,
                imageUrl,
                detailsUrl,
                bookCondition,
                year,
                issueNumber);
    }
}
