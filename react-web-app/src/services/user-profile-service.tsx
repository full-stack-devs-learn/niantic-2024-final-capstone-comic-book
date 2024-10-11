import axios, { AxiosRequestConfig } from "axios";
import store, { RootState } from "../store/store";
import { User } from "../models/security/authentication";

class UserService {
    baseUrl = 'http://localhost:8080/user-profile';

    createHeaders(): AxiosRequestConfig {
        const state: RootState = store.getState();
        const token = state.authentication.token;

        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (token !== null) {
            config.headers!['Authorization'] = `Bearer ${token}`;
        }

        return config;
    }

    // Fetch the current authenticated user's profile
    async fetchCurrentProfile(): Promise<User | null> {
        try {
            const response = await axios.get<User>(`${this.baseUrl}/current-profile`, this.createHeaders());
            return response.data;
        } catch (error) {
            return null;
        }
    }

    // Fetch a user profile by ID
    async fetchUserProfileById(userId: number): Promise<User | null> {
        try {
            const response = await axios.get<User>(`${this.baseUrl}/${userId}`, this.createHeaders());
            return response.data;
        } catch (error) {
            return null;
        }
    }

    // Create a new user profile
    async createUserProfile(profileData: any): Promise<User | null> {
        try {
            const response = await axios.post<User>(this.baseUrl, profileData, this.createHeaders());
            return response.data;
        } catch (error) {
            return null;
        }
    }

    // Update an existing user profile
    async updateUserProfile(userId: number, profileData: any): Promise<User | null> {
        try {
            const response = await axios.put<User>(`${this.baseUrl}/${userId}`, profileData, this.createHeaders());
            return response.data;
        } catch (error) {
            return null;
        }
    }
}

const userService = new UserService();
export default userService;
