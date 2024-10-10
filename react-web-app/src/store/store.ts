import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./features/authentication-slice";
import collectionReducer from "./features/collection-slice";
import comicBookIdReducer from "./features/comic-details-slice";
import userProfileReducer from './features/user-profile-slice';

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        collection: collectionReducer,
        comicBookId: comicBookIdReducer,
        userProfile: userProfileReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;