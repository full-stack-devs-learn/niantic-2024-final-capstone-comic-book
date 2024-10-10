import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ComicBook } from '../../models/ComicBook'
import wishlistService from '../../services/wishlist-service'

interface WishlistState {
  wishlist: ComicBook[]
  loading: boolean
  error: string | null
}

const initialState: WishlistState = {
  wishlist: [],
  loading: false,
  error: null
}

export const loadWishlist = createAsyncThunk('comics/wishlist', async (comicBookTitle: string | null) => {
  let wishlist = await wishlistService.getUserWishlist()
  if (comicBookTitle !== null) {
    wishlist = wishlist.filter(c => c.title == comicBookTitle)
  }
  return wishlist
})

export const addComicBookToUserWishlist = createAsyncThunk('comics/wishlist/addToWishlist', async (comicBook: ComicBook) => {
  const newComicBook = await wishlistService.addComicBookToUserWishlist(comicBook)
  return newComicBook
})

export const removeComicBookFromUserWishlist = createAsyncThunk('comics/wishlist/remove', async (comicBookId: number) => {
  await wishlistService.removeComicBookFromUserWishlist(comicBookId)
  return comicBookId
})

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clear(state) {
      state.wishlist = []
      state.error = null
    },
    clearError(state) {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    // fetch wishlist
    builder.addCase(loadWishlist.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(loadWishlist.fulfilled, (state, action: PayloadAction<ComicBook[]>) => {
      state.loading = false
      state.wishlist = action.payload
    })
    builder.addCase(loadWishlist.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Failed to fetch wishlist'
    })

    // add a comic book to wishlist
    builder.addCase(addComicBookToUserWishlist.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(addComicBookToUserWishlist.fulfilled, (state, action: PayloadAction<ComicBook>) => {
      state.loading = false
      state.wishlist.push(action.payload)
    })
    builder.addCase(addComicBookToUserWishlist.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Failed to add comic book to wishlist'
    })

    // remove from wishlist
    builder.addCase(removeComicBookFromUserWishlist.pending, (state) => {
      state.loading = true
      state.error = null
    });
    builder.addCase(removeComicBookFromUserWishlist.fulfilled, (state, action: PayloadAction<number>) => {
      state.loading = false
      state.wishlist = state.wishlist.filter(book => book.comicBookId !== action.payload)
    });
    builder.addCase(removeComicBookFromUserWishlist.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Failed to remove comic book from Wishlist'
    })
  },
})

export const { clear, clearError } = wishlistSlice.actions

const wishlistReducer = wishlistSlice.reducer
export default wishlistReducer