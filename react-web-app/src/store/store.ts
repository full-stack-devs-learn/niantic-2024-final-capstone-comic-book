import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./features/authentication-slice";
import collectionReducer from "./features/collection-slice";
// import comicBookDataReducer from "./features/comic-details-slice";
import comicsSearchResultsReducer from "./features/comics-search-result-slice";
import characterSearchResultsReducer from "./features/character-search-result-slice";
import wishlistReducer from './features/wishlist-slice';
// import searchTermReducer from "./features/search-term-slice";

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        collection: collectionReducer,
        wishlist: wishlistReducer,
        // comicBookDetail: comicBookDataReducer,
        comicsSearchResults: comicsSearchResultsReducer,
        characterSearchResults: characterSearchResultsReducer // ,
        // searchTermReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;