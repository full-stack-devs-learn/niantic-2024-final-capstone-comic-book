import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectedComicBook } from "../../models/SelectedComicBook";

interface SelectedComicBookState {
    comicBookId: number | null;
    marvelId: number;
    title: string;
    description: string | null;
    isInCollection: boolean;
    isInWishlist: boolean;
    officialDetails: string | null;   
}

const initialState: SelectedComicBookState = {
    comicBookId: null,
    marvelId: 0,
    title: 'title',
    description: null,
    isInCollection: false,
    isInWishlist: false,
    officialDetails: null,
}

// export const loadComicBook = 

//using marvel id, check if comic book exists in user collection
// display details of comic book in collection