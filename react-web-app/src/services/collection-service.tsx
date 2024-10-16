import axios, { AxiosRequestConfig } from "axios"
import { ComicBook } from "../models/ComicBook"
import store, { RootState } from "../store/store"

class CollectionService {
  baseUrl = `${import.meta.env.VITE_API_BASE_URL}/comics/collection`

  createHeaders(): AxiosRequestConfig {
    const state: RootState = store.getState()
    const token = state.authentication.token

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (token !== null) {
      config.headers!['Authorization'] = `Bearer ${token}`
    }

    return config
  }

  async getUserCollection(): Promise<ComicBook[]> {
    const response = await axios.get<ComicBook[]>(this.baseUrl, this.createHeaders())
    return response.data
  }

  async addComicBookToUserCollection(comicBook: ComicBook): Promise<ComicBook> {
    const response = await axios.post<ComicBook>(this.baseUrl, comicBook, this.createHeaders())
    return response.data
  }

  async updateComicBookCondition(comicBook: ComicBook): Promise<ComicBook> {
    const response = await axios.put<ComicBook>(`${import.meta.env.VITE_API_BASE_URL}/comics/${comicBook.comicBookId}`, comicBook, this.createHeaders())
    return response.data
  }

  async removeComicBookFromUserCollection(comicBookId: number) {
    return axios.delete<void>(`${this.baseUrl}/${comicBookId}`, this.createHeaders())
  }
}

const collectionService = new CollectionService()
export default collectionService
