import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ComicBook } from '../../models/ComicBook'
import collectionService from '../../services/collection-service'

interface CollectionState {
  collection: ComicBook[]
  loading: boolean
  error: string | null
}

const initialState: CollectionState = {
  collection: [],
  loading: false,
  error: null
}

export const loadCollection = createAsyncThunk('comics/collection', async (comicBookTitle: string | null) => {
  let collection = await collectionService.getUserCollection()
  if (comicBookTitle !== null) {
    collection = collection.filter(c => c.title == comicBookTitle)
  }
  return collection
})

export const addComicBookToUserCollection = createAsyncThunk('comics/collection/addToCollection', async (comicBook: ComicBook) => {
  const newComicBook = await collectionService.addComicBookToUserCollection(comicBook)
  return newComicBook
})

export const updateComicBookCondition = createAsyncThunk('comics/collection/updateCondition', async (comicBook: ComicBook) => {
  const updatedComicBook = await collectionService.updateComicBookCondition(comicBook)
  return updatedComicBook
})

export const removeComicBookFromUserCollection = createAsyncThunk('comics/collection/remove', async (comicBookId: number) => {
  await collectionService.removeComicBookFromUserCollection(comicBookId)
  return comicBookId
})

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // fetch collection
    builder.addCase(loadCollection.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(loadCollection.fulfilled, (state, action: PayloadAction<ComicBook[]>) => {
      state.loading = false
      state.collection = action.payload
    })
    builder.addCase(loadCollection.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Failed to fetch collection'
    })

    // add a comic book to collection
    builder.addCase(addComicBookToUserCollection.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(addComicBookToUserCollection.fulfilled, (state, action: PayloadAction<ComicBook>) => {
      state.loading = false
      state.collection.push(action.payload)
    })
    builder.addCase(addComicBookToUserCollection.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Failed to add comic book to collection'
    })

    // update a comic book condition
    builder.addCase(updateComicBookCondition.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(updateComicBookCondition.fulfilled, (state, action: PayloadAction<ComicBook>) => {
      state.loading = false
      const index = state.collection.findIndex(book => book.comicBookId === action.payload.comicBookId)
      if (index !== -1) {
        state.collection[index] = action.payload
      }
    })
    builder.addCase(updateComicBookCondition.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Failed to update comic book condition'
    })

    // remove from collection
    builder.addCase(removeComicBookFromUserCollection.pending, (state) => {
      state.loading = true
      state.error = null
    });
    builder.addCase(removeComicBookFromUserCollection.fulfilled, (state, action: PayloadAction<number>) => {
      state.loading = false
      state.collection = state.collection.filter(book => book.comicBookId !== action.payload)
    });
    builder.addCase(removeComicBookFromUserCollection.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Failed to remove comic book from collection'
    })
  },
})

const collectionReducer = collectionSlice.reducer
export default collectionReducer