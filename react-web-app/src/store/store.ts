import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./features/authentication-slice";
import collectionReducer from "./features/collection-slice";
import comicBookIdReducer from "./features/comic-details-slice";

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        collection: collectionReducer,
        comicBookId: comicBookIdReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;