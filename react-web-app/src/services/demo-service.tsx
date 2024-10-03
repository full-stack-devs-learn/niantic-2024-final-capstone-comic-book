import axios, { AxiosRequestConfig } from "axios";
import store, { RootState } from "../store/store";
import { User } from "../models/security/authentication";

class DemoService
{
    baseUrl = `${import.meta.env.VITE_API_BASE_URL}/demo`

    createHeaders(): AxiosRequestConfig
    {
        const state: RootState = store.getState()
        const token = state.authentication.token

        const config: AxiosRequestConfig<any> = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if(token !== null) 
        {
             config.headers!['Authorization'] = `Bearer ${token}`
        }

        return config
        
    }

    async getDemo(): Promise<string[]>
    {
        const response = await axios.get<string[]>(this.baseUrl, this.createHeaders())

        return response.data
    }

    // template on how to do a POST
    async addUser(user: User): Promise<User>
    {
        const response = await axios.post<User>(this.baseUrl, user, this.createHeaders())

        return response.data
    }
}

const demoService = new DemoService()
export default demoService