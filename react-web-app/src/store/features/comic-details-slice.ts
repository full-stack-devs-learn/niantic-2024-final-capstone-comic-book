// import { createSlice } from "@reduxjs/toolkit";
// // import { SelectedComicBook } from "../../models/SelectedComicBook";
// import { ComicBook } from "../../models/ComicBook";

// // interface ComicBookIdState {
// //     comicBookId: number | null
// // }

// interface ComicBookDetailState {
//     comicBookDetail?: ComicBook

//     // comicId?: number | null;
//     // marvelId: number;
//     // title?: string;
//     // description?: string;
//     // imageUrl?: string;
//     // isInCollection?: boolean;
//     // isInWishlist?: boolean;
// }

// // export const collectionCheck = 

// // export const wishlistCheck

// const newComicBook = {
//     comicId: 0,
//     marvelId: 0,
//     title: '',
//     description: '',
//     imageUrl: '',
//     isInCollection: false,
//     isInWishlist: false,
// }

// const initialState: ComicBookDetailState = {

//     comicBookDetail: newComicBook
//     // comicId: null,
//     // marvelId: 0,
//     // title: '',
//     // description: '',
//     // imageUrl: '',
//     // isInCollection: false,
//     // isInWishlist: false,
// }

// // interface ComicBookDataState {
// //     data: any | null;
// // }


// // const initialState: ComicBookDataState = {
// //     data: null
// // }

// const comicBookDetailSlice = createSlice({
//     name: 'comicBookDetail',
//     initialState,
//     reducers: {
//         // selectedComicBookData: (state) => {
//         //     state.comicBookData = null;
//         // },
//         setComicBookDetail: (state, action) => {
//             // state.comicBook = action.payload;
//         }
//     }
// })

// export const { setComicBookDetail } = comicBookDetailSlice.actions;
// const comicBookDataReducer = comicBookDetailSlice.reducer;
// export default comicBookDataReducer;

// SEARCH marvelId in database,
//if it exist, check if in collection or wishlist


// load comic book details from API
// const comicBookIdSlice = createSlice({
//     name: 'comicBookDetails',
//     initialState,
//     reducers: {
//         // selectedComicBook: (state) => {
//         //     state.comicBookId = 0;
//         // },
//         setComicBookId: (state, action) => {
//             state.comicBookId =  action.payload
//         }
//     }
// })


//using marvel id, check if comic book exists in user collection
// display details of comic book in collection

// export const { setComicBookId } = comicBookIdSlice.actions;
// const comicBookIdReducer = comicBookIdSlice.reducer;
// export default comicBookIdReducer;


/*
WORKING CODE:
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectedComicBook } from "../../models/SelectedComicBook";
import { ComicBook } from "../../models/ComicBook";

interface ComicBookIdState {
    comicBookId: number | null
}

const initialState: ComicBookIdState = {
    comicBookId: null
}

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
*/