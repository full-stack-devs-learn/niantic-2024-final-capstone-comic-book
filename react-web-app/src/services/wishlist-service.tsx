import axios, { AxiosRequestConfig } from "axios"
import { ComicBook } from "../models/ComicBook"
import store, { RootState } from "../store/store"

class WishlistService {
  baseUrl = `${import.meta.env.VITE_API_BASE_URL}/comics/wishlist`

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

  async getUserWishlist(): Promise<ComicBook[]> {
    const response = await axios.get<ComicBook[]>(this.baseUrl, this.createHeaders())
    return response.data
  }

  async addComicBookToUserWishlist(comicBook: ComicBook): Promise<ComicBook> {
    const response = await axios.post<ComicBook>(this.baseUrl, comicBook, this.createHeaders())
    return response.data
  }

  async removeComicBookFromUserWishlist(comicBookId: number) {
    return axios.delete<void>(`${this.baseUrl}/${comicBookId}`, this.createHeaders())
  }
}

const wishlistService = new WishlistService()
export default wishlistService
