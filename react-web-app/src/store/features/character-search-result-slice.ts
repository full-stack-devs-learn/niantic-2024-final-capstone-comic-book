import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import marvelApiService from "../../services/marvel-api-service";

interface CharacterSearchResultsState {
    characterSearchResults: any;
    loading: boolean
    error: string | null
}

const initialState: CharacterSearchResultsState = {
    characterSearchResults: [],
    loading: false,
    error: null
}

export const loadCharacterSearchResults = createAsyncThunk('character/getCharacterSearchResults', async (searchTerm: string) => {
    let characterSearchResults = await marvelApiService.getCharacterData(searchTerm);
    return characterSearchResults;
})

const characterSearchResultsSlice = createSlice({
    name: 'characterSearchResults',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(loadCharacterSearchResults.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loadCharacterSearchResults.fulfilled, (state, action: PayloadAction<any[]>) => {
            state.loading = false;
            state.characterSearchResults = action.payload;
        });
        builder.addCase(loadCharacterSearchResults.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch character data'
        })
    }
})

const characterSearchResultsReducer = characterSearchResultsSlice.reducer;
export default characterSearchResultsReducer;

