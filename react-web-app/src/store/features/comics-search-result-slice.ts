import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import marvelApiService from "../../services/marvel-api-service";

interface ComicsSearchResultState {
    comicsSearchResults: any;
    loading: boolean
    error: string | null
}

const initialState: ComicsSearchResultState = {
    comicsSearchResults: [],
    loading: false,
    error: null
}

export const loadComicsSearchResults = createAsyncThunk('comics/getComicsSearchResults', async (characterId: number) => {
    let comicsSearchResults = await marvelApiService.getComicData(characterId);
    return comicsSearchResults;
})

const comicSearchResultsSlice = createSlice({
    name: 'comicsSearchResults',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(loadComicsSearchResults.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loadComicsSearchResults.fulfilled, (state, action: PayloadAction<any[]>) => {
            state.loading = false;
            state.comicsSearchResults = action.payload;
        });
        builder.addCase(loadComicsSearchResults.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch comic book data'
        })
    }
})

const comicsSearchResultsReducer = comicSearchResultsSlice.reducer;
export default comicsSearchResultsReducer;

