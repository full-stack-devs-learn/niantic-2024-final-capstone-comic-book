package com.niantic.models;

import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Setter
@Getter
public class ComicBook {

    private int comic_book_id;
    private int marvel_id;
    private String title;
    private String description;
    private String image_url;
    private String details_url;
    private String book_condition;
    private int year;
    private int issue_number;

    public ComicBook(int comic_book_id,
                     int marvel_id, String title,
                     String description,
                     String image_url,
                     String details_url,
                     String book_condition,
                     int year,
                     int issue_number) {
        this.comic_book_id = comic_book_id;
        this.marvel_id = marvel_id;
        this.title = title;
        this.description = description;
        this.image_url = image_url;
        this.details_url = details_url;
        this.book_condition = book_condition;
        this.year = year;
        this.issue_number = issue_number;
    }

    @Override
    public String toString() {
        return STR."Comic Book: {id=\{comic_book_id}, marvel_api_id=\{marvel_id} title=\{title}\{'}'}";
    }

}
