import { createAsyncThunk } from "@reduxjs/toolkit";
import { ComicBook } from "../../models/ComicBook";
import collectionService from "../../services/collection-service";

interface CollectionState {
    comicBooks: ComicBook[];
    loading: boolean;
    error: string | null;
}

const initialState: CollectionState= {
    comicBooks: [],
    loading: false,
    error: null
}

export const loadCollection = createAsyncThunk('comics/collection', async (comicBookName: string | null) => {
    
})