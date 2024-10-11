import axios, { AxiosRequestConfig } from 'axios';
import store, { RootState } from '../store/store';
import { UserProfile } from '../models/UserProfile'; 

class UserService {
  baseUrl = 'http://localhost:8080/user-profile';

  createHeaders(): AxiosRequestConfig {
    const state: RootState = store.getState();
    const token = state.authentication.token;

    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token !== null) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }

    return config;
  }

  // Fetch the current authenticated user's profile
  async fetchCurrentProfile(): Promise<UserProfile | null> {
    try {
      const response = await axios.get<UserProfile>(`${this.baseUrl}/current-profile`, this.createHeaders());
      return response.data;
    } catch (error) {
      console.error('Failed to fetch current profile:', error);
      return null;
    }
  }

  // Fetch a user profile by ID
  async fetchUserProfileById(userId: number): Promise<UserProfile | null> {
    try {
      const response = await axios.get<UserProfile>(`${this.baseUrl}/${userId}`, this.createHeaders());
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch user profile with ID ${userId}:`, error);
      return null;
    }
  }

  // Create a new user profile
  async createUserProfile(profileData: UserProfile): Promise<UserProfile | null> {
    try {
      const response = await axios.post<UserProfile>(this.baseUrl, profileData, this.createHeaders());
      return response.data;
    } catch (error) {
      console.error('Failed to create user profile:', error);
      return null;
    }
  }

  // Update the current user's profile
  async updateCurrentUserProfile(profileData: UserProfile): Promise<UserProfile | null> {
    try {
      const response = await axios.put<UserProfile>(`${this.baseUrl}/my-profile`, profileData, this.createHeaders());
      return response.data;
    } catch (error) {
      console.error('Failed to update user profile:', error);
      return null;
    }
  }
} 

const userService = new UserService();
export default userService;
