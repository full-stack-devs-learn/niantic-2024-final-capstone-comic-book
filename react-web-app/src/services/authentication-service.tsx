import axios from "axios";
import { LoginCredentials, Registration } from "../models/security/user-credentials";
import { AuthenticatedUser, User } from "../models/security/authentication";

class AuthenticationService
{

    baseUrl = import.meta.env.VITE_API_BASE_URL
    
    async login(login: LoginCredentials): Promise<AuthenticatedUser>
    {

        const response = await axios.post<AuthenticatedUser>(`${this.baseUrl}/login`, login)

        localStorage.setItem('user',JSON.stringify(response.data))

        return response.data
    }

    async register(registration: Registration): Promise<User>
    {
        const response = await axios.post<User>(`${this.baseUrl}/register`, registration)
        return response.data
    }
}

const authenticationService = new AuthenticationService()
export default authenticationService