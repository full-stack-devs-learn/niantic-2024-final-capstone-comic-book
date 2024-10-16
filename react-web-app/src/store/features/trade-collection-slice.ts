import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ComicBook } from '../../models/ComicBook'
import tradeCollectionService from '../../services/trade-collection-service'
import collectionService from '../../services/collection-service'

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

export const updateTradeComicBookCondition = createAsyncThunk('comics/collection/updateCondition', async (comicBook: ComicBook) => {
  const updatedComicBook = await collectionService.updateComicBookCondition(comicBook)
  return updatedComicBook
})

const tradeCollectionSlice = createSlice({
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
      state.error = action.error.message || 'Failed to remove comic book from trade collection'
    })

    // update a trade comic book condition
    builder.addCase(updateTradeComicBookCondition.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(updateTradeComicBookCondition.fulfilled, (state, action: PayloadAction<ComicBook>) => {
      state.loading = false
      const index = state.tradeCollection.findIndex(book => book.comicBookId === action.payload.comicBookId)
      if (index !== -1) {
        state.tradeCollection[index] = action.payload
      }
    })
    builder.addCase(updateTradeComicBookCondition.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Failed to update trade comic book condition'
    })
  },
})

export const { clear, clearError } = tradeCollectionSlice.actions

const tradeCollectionReducer = tradeCollectionSlice.reducer
export default tradeCollectionReducer