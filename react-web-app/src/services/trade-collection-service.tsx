import axios, { AxiosRequestConfig } from "axios"
import { ComicBook } from "../models/ComicBook"
import store, { RootState } from "../store/store"

class TradeCollectionService {
  baseUrl = `${import.meta.env.VITE_API_BASE_URL}/comics/trade-collection`

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

  async getUserTradeCollection(): Promise<ComicBook[]> {
    const response = await axios.get<ComicBook[]>(this.baseUrl, this.createHeaders())
    return response.data
  }

  async addComicBookToUserTradeCollection(comicBook: ComicBook): Promise<ComicBook> {
    const response = await axios.post<ComicBook>(this.baseUrl, comicBook, this.createHeaders())
    return response.data
  }

  async removeComicBookFromUserTradeCollection(comicBookId: number) {
    return axios.delete<void>(`${this.baseUrl}/${comicBookId}`, this.createHeaders())
  }
}

const tradeCollectionService = new TradeCollectionService()
export default tradeCollectionService
