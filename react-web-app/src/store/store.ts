import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./features/authentication-slice";
import collectionReducer from "./features/collection-slice";
import tradeCollectionReducer from "./features/trade-collection-slice";
import comicsSearchResultsReducer from "./features/comics-search-result-slice";
import characterSearchResultsReducer from "./features/character-search-result-slice";
import wishlistReducer from './features/wishlist-slice';
import userProfileReducer from './features/user-profile-slice';
import tradeComicsReducer from './features/trade-comics-slice';

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        collection: collectionReducer,
        tradeCollection: tradeCollectionReducer,
        tradeComics: tradeComicsReducer,
        wishlist: wishlistReducer,
        comicsSearchResults: comicsSearchResultsReducer,
        characterSearchResults: characterSearchResultsReducer, 
        userProfile: userProfileReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;