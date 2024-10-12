import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ComicBook } from '../../models/ComicBook'
import tradeComicsService from '../../services/trade-comics-service'

interface TradeComicsState {
  tradeComics: ComicBook[]
  loading: boolean
  error: string | null
}

const initialState: TradeComicsState = {
  tradeComics: [],
  loading: false,
  error: null
}

export const loadTradeComics = createAsyncThunk('comics/trade-comics', async (comicBookTitle: string | null) => {
  let tradeComics = await tradeComicsService.getAllTradeComics();
  if (comicBookTitle !== null) {
    tradeComics = tradeComics.filter(c => c.title == comicBookTitle)
  }
  return tradeComics
})

const tradeComicsSlice = createSlice({
  name: 'tradeComics',
  initialState,
  reducers: {
    clear(state) {
      state.tradeComics = []
      state.error = null
    },
    clearError(state) {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    // fetch all comics available for trading
    builder.addCase(loadTradeComics.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(loadTradeComics.fulfilled, (state, action: PayloadAction<ComicBook[]>) => {
      state.loading = false
      state.tradeComics = action.payload
    })
    builder.addCase(loadTradeComics.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Failed to fetch trade collection'
    })
  },
})

export const { clear, clearError } = tradeComicsSlice.actions

const tradeComicsReducer = tradeComicsSlice.reducer
export default tradeComicsReducer