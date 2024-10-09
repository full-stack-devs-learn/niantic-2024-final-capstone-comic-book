import axios, { AxiosRequestConfig } from "axios";
import { ComicBook } from "../models/ComicBook";
import store, { RootState } from "../store/store";

class CollectionService
{
    baseUrl = `${import.meta.env.VITE_API_BASE_URL}/comics/collection`;

    createHeaders(): AxiosRequestConfig
    {
        const state: RootState = store.getState();
        const token = state.authentication.token;

        const config: AxiosRequestConfig<any> = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if(token !== null)
        {
            config.headers!['Authorization'] = `Bearer ${token}`;
        }

        return config;
    }

    async getUserCollection(): Promise<ComicBook[]>
    {
        const response = await axios.get<ComicBook[]>(this.baseUrl, this.createHeaders());
        return response.data;
    }

    async addComicBookToUserCollection(comicBook: ComicBook): Promise<ComicBook>
    {
        const response = await axios.post<ComicBook>(this.baseUrl, comicBook, this.createHeaders());

        return response.data;
    } 

    async removeComicBookToUserCollection(comicBookId: number) {
        return axios.delete<void>(`${this.baseUrl}/${comicBookId}`)
    }
}

const collectionService = new CollectionService();
export default collectionService;
