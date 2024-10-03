import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { LoginCredentials } from "../../../models/security/user-credentials"
import authenticationService from "../../../services/authentication-service"
import { login } from "../../../store/features/authentication-slice"
import { useAppDispatch } from "../../../store/hooks"

export default function Login()
{
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const [username, setUserName] = useState<string>()
    const [password, setPassword] = useState<string>()

    async function loginHandler(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault()

        const credentials = new LoginCredentials()
        credentials.username = username!
        credentials.password = password!

        const authUser = await authenticationService.login(credentials);

        dispatch(login(authUser))
        navigate('/')
    }

    return (
        <div className="container">
        <h2>Login</h2>
        <form onSubmit={loginHandler} method="post">
            <div className="row">
                <label htmlFor="username">Username:</label>
                <input type="text" className="form-control" name="username" id="username"
                    onChange={(e) => setUserName(e.target.value)}
                />
            </div>

            <div className="row">
                <label htmlFor="password">Password:</label>
                <input type="password" className="form-control" name="password" id="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="btn btn-success mr-3" type="submit">Login</button>
        </form>
        <Link to="/register">Register as new user</Link>
        </div>
    )
}