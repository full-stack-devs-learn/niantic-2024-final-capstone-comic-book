import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ComicBook } from '../../models/ComicBook'
import tradeCollectionService from '../../services/trade-collection-service'

interface TradeCollectionState {
  tradeCollection: ComicBook[]
  loading: boolean
  error: string | null
}

const initialState: TradeCollectionState = {
  tradeCollection: [],
  loading: false,
  error: null
}

export const loadTradeCollection = createAsyncThunk('comics/trade-collection', async (comicBookTitle: string | null) => {
  let tradeCollection = await tradeCollectionService.getUserTradeCollection()
  if (comicBookTitle !== null) {
    tradeCollection = tradeCollection.filter(c => c.title == comicBookTitle)
  }
  return tradeCollection
})

export const addComicBookToUserTradeCollection = createAsyncThunk('comics/trade-collection/add', async (comicBook: ComicBook) => {
  const newComicBook = await tradeCollectionService.addComicBookToUserTradeCollection(comicBook)
  return newComicBook
})

export const removeComicBookFromUserTradeCollection = createAsyncThunk('comics/trade-collection/remove', async (comicBookId: number) => {
  await tradeCollectionService.removeComicBookFromUserTradeCollection(comicBookId)
  return comicBookId
})

const collectionSlice = createSlice({
  name: 'tradeCollection',
  initialState,
  reducers: {
    clear(state) {
      state.tradeCollection = []
      state.error = null
    },
    clearError(state) {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    // fetch trade collection
    builder.addCase(loadTradeCollection.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(loadTradeCollection.fulfilled, (state, action: PayloadAction<ComicBook[]>) => {
      state.loading = false
      state.tradeCollection = action.payload
    })
    builder.addCase(loadTradeCollection.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Failed to fetch trade collection'
    })

    // add a comic book to trade collection (move from collection)
    builder.addCase(addComicBookToUserTradeCollection.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(addComicBookToUserTradeCollection.fulfilled, (state, action: PayloadAction<ComicBook>) => {
      state.loading = false
      state.tradeCollection.push(action.payload)
    })
    builder.addCase(addComicBookToUserTradeCollection.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Failed to add comic book to trade collection'
    })

    // remove from trade collection
    builder.addCase(removeComicBookFromUserTradeCollection.pending, (state) => {
      state.loading = true
      state.error = null
    });
    builder.addCase(removeComicBookFromUserTradeCollection.fulfilled, (state, action: PayloadAction<number>) => {
      state.loading = false
      state.tradeCollection = state.tradeCollection.filter(book => book.comicBookId !== action.payload)
    });
    builder.addCase(removeComicBookFromUserTradeCollection.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Failed to remove comic book from collection'
    })
  },
})

export const { clear, clearError } = collectionSlice.actions

const collectionReducer = collectionSlice.reducer
export default collectionReducer