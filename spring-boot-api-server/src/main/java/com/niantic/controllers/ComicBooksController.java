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
        List<ComicBook> userCollection = comicBookDao.getUserWishlistByUserId(userId);
        return ResponseEntity.ok(userCollection);
    }

}
