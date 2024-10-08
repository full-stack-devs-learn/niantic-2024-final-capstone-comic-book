package com.niantic.controllers;

import com.niantic.data.ComicBookDao;
import com.niantic.data.UserDao;
import com.niantic.models.ComicBook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/comics")
public class ComicBooksController {
    private final ComicBookDao comicBookDao;
    private final UserDao userDao;

    @Autowired
    public ComicBooksController(ComicBookDao comicBookDao, UserDao userDao) {
        this.comicBookDao = comicBookDao;
        this.userDao = userDao;
    }

    @GetMapping("collection")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getUserCollection(Principal principal) {
        int userId = userDao.getIdByUsername(principal.getName());
        List<ComicBook> userCollection = comicBookDao.getUserCollectionByUserId(userId);
        return ResponseEntity.ok(userCollection);
    }

    @GetMapping("wishlist")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getUserWishlist(Principal principal) {
        int userId = userDao.getIdByUsername(principal.getName());
        List<ComicBook> userWishlist = comicBookDao.getUserWishlistByUserId(userId);
        return ResponseEntity.ok(userWishlist);
    }

    @GetMapping("trade-collection")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getUserTradeCollection(Principal principal) {
        int userId = userDao.getIdByUsername(principal.getName());
        List<ComicBook> userTradeCollection = comicBookDao.getUserTradeCollectionByUserId(userId);
        return ResponseEntity.ok(userTradeCollection);
    }

    @GetMapping("trade-all")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getAllTradeComics(Principal principal) {
        int userId = userDao.getIdByUsername(principal.getName());
        List<ComicBook> tradeComics = comicBookDao.getAllTradeComicBooks();
        return ResponseEntity.ok(tradeComics);
    }

    @GetMapping("{comicBookId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getComicBookById(@PathVariable int comicBookId) {
        var comicBook = comicBookDao.getComicBookById(comicBookId);
        // TODO: comicBookDao.getOwnerId(comicBookId) - get comic book owner for books that available for trade
        // int ownerId = comicBookDao.getOwnerId(comicBookId);
        // List<ComicBook> ownerWishlist = comicBookDao.getUserWishlistByUserId(ownerId);
        // TODO: create model for tradeComicBook = comicBook + ownerId + list of comics in the owner wishlist
        return ResponseEntity.ok(comicBook);
    }

    @PostMapping("collection")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> addComicBookToUserCollection(@RequestBody ComicBook comicBook, Principal principal) {
        int userId = userDao.getIdByUsername(principal.getName());
        comicBook = comicBookDao.addComicBookToUserCollection(comicBook, userId);
        return ResponseEntity.ok(comicBook);
    }


}
