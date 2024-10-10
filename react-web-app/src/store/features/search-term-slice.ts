import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface SearchTermState {
    searchTerms: string;
}

const initialState: SearchTermState = {
    searchTerms: '',
}

const searchTermSlice = createSlice({
    name: 'searchTerms',
    initialState,
    reducers: {

    }
})

const searchTermReducer = searchTermSlice.reducer;
export default searchTermReducer;

