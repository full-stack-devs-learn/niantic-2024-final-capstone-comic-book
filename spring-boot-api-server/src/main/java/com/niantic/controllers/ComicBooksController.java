package com.niantic.controllers;

import com.niantic.data.ComicBookDao;
import com.niantic.models.ComicBook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/comics")
public class ComicBooksController {
    private final ComicBookDao comicBookDao;

    @Autowired
    public ComicBooksController(ComicBookDao comicBookDao) {
        this.comicBookDao = comicBookDao;
    }

    @GetMapping("collections")
    public ResponseEntity<?> getUserCollectionByUserId(@RequestParam int userId) {
        List<ComicBook> userCollection = comicBookDao.getUserCollectionByUserId(userId);
        return ResponseEntity.ok(userCollection);
    }

}
