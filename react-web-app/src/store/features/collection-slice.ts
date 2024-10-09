import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ComicBook } from "../../models/ComicBook";
import collectionService from "../../services/collection-service";

interface CollectionState {
    collection: ComicBook[];
    loading: boolean;
    error: string | null;
}

const initialState: CollectionState= {
    collection: [],
    loading: false,
    error: null
}

export const loadCollection = createAsyncThunk('comics/collection', async (comicBookTitle: string | null) => {
    let collection = await collectionService.getUserCollection();
    if(comicBookTitle !== null)
    {
        collection = collection.filter(c => c.title == comicBookTitle);
    }
    return collection;
})

export const addComicBookToUserCollection = createAsyncThunk('comics/addToCollection', async (comicBook: ComicBook) => {
    const newComicBook = await collectionService.addComicBookToUserCollection(comicBook);
    return newComicBook;
})

export const removeComicBookToUserCollection = createAsyncThunk('comics/remove', async(comicBookId: number) => {
    await collectionService.removeComicBookToUserCollection(comicBookId);
})

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        //fetch collection
        builder.addCase(loadCollection.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loadCollection.fulfilled, (state, action: PayloadAction<ComicBook[]>) => {
            state.loading = false;
            state.collection = action.payload;
        });
        builder.addCase(loadCollection.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch collection';
        });

        //add to collection
        builder.addCase(addComicBookToUserCollection.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addComicBookToUserCollection.fulfilled, (state, action: PayloadAction<ComicBook>) => {
            state.loading = false;
            state.collection.push(action.payload);
        });
        builder.addCase(addComicBookToUserCollection.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to add comic book to collection';
        });

        //remove from collection
        // builder.addCase(removeComicBookToUserCollection.pending, (state) => {
        //     state.loading = true;
        //     state.error = null;
        // });
        // builder.addCase(removeComicBookToUserCollection.fulfilled, (state, action: PayloadAction<number>) => {
        //     state.loading = false;
        //     state.collection= state.collection.filter(c => c.comicBookId !== action.payload);
        // });
        // builder.addCase(removeComicBookToUserCollection.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.error.message || 'Failed to remove comic book from collection';
        // });
    },
})

const collectionReducer = collectionSlice.reducer;
export default collectionReducer;