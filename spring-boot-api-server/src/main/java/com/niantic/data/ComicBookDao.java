package com.niantic.data;

import com.niantic.models.ComicBook;

import java.util.List;

public interface ComicBookDao {
    List<ComicBook> getUserCollectionByUserId(int userId);

    List<ComicBook> getUserWishlistByUserId(int userId);

    List<ComicBook> getUserTradeCollectionByUserId(int userId);

    List<ComicBook> getAllTradeComicBooks();

    ComicBook getComicBookById(int comicBookId);

    ComicBook addComicBookToUserCollection(ComicBook comicBook, int userId);

    ComicBook addComicBookToUserWishlist(ComicBook comicBook, int userId);

    ComicBook addComicBookToUserTradeCollection(int comicBookId, int userId);

    void updateComicBookCondition(int comicBookId, String condition);

    void deleteComicBookFromUserCollection(int comicBookId, int userId);

    void deleteComicBookFromUserWishList(int comicBookId, int userId);

    ComicBook deleteComicBookFromUserTradeCollection(int comicBookId, int userId);

}
