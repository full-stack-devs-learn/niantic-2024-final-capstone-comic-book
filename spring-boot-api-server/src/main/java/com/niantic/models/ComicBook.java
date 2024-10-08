package com.niantic.models;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ComicBook {

    private int comicBookId;
    private int marvelId;
    private String title;
    private String description;
    private String imageUrl;
    private String detailsUrl;
    private String bookCondition;
    private int year;
    private int issueNumber;


    @Override
    public String toString() {
        return STR."Comic Book: {id=\{comicBookId}, marvel_api_id=\{marvelId} title=\{title}\{'}'}";
    }

}
