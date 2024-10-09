import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectedComicBook } from "../../models/SelectedComicBook";
import { ComicBook } from "../../models/ComicBook";

interface ComicBookIdState {
    comicBookId: number | null
}

const initialState: ComicBookIdState = {
    comicBookId: null
}

// export const loadComicBookId = return comi
// export const setComicBookId = 

// load comic book details from API
const comicBookIdSlice = createSlice({
    name: 'comicBookId',
    initialState,
    reducers: {
        selectedComicBook: (state) => {
            state.comicBookId = 0;
        },
        setComicBookId: (state, action) => {
            state.comicBookId =  action.payload
        }
    }
})


//using marvel id, check if comic book exists in user collection
// display details of comic book in collection

export const { setComicBookId } = comicBookIdSlice.actions;
const comicBookIdReducer = comicBookIdSlice.reducer;
export default comicBookIdReducer;