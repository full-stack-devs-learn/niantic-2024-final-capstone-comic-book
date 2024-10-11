import axios, { AxiosRequestConfig } from "axios"
import { ComicBook } from "../models/ComicBook"
import store, { RootState } from "../store/store"

class TradeComicsService {
  baseUrl = `${import.meta.env.VITE_API_BASE_URL}/comics/trade-all`

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

  async getAllTradeComics(): Promise<ComicBook[]> {
    const response = await axios.get<ComicBook[]>(this.baseUrl, this.createHeaders())
    return response.data
  }

}

const tradeComicsService = new TradeComicsService()
export default tradeComicsService
