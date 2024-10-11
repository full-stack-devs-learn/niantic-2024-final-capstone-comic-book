import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { LoginCredentials } from "../../../models/security/user-credentials"
import authenticationService from "../../../services/authentication-service"
import { login } from "../../../store/features/authentication-slice"
import { useAppDispatch } from "../../../store/hooks"
import './Login.css'

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const [username, setUserName] = useState<string>()
    const [password, setPassword] = useState<string>()

    async function loginHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const credentials = new LoginCredentials()
        credentials.username = username!
        credentials.password = password!

        const authUser = await authenticationService.login(credentials);

        dispatch(login(authUser))
        navigate('/')
    }

    return (
        <div className="container login-card col-lg-4">

            <h3 id="login">Login</h3>

            <form onSubmit={loginHandler} method="post">

                <div className="row row-container mt-4">
                    <label htmlFor="username">Username:</label>
                    <input type="text" className="form-control mt-2" placeholder="Username" name="username" id="username"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div className="row row-container mt-3">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control mt-2" placeholder="Password" name="password" id="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="row row-container mt-2">
                    <button className="btn btn-success mt-3" type="submit">Login</button>
                </div>

            </form>

            <div className="row row-container mt-5 register">
                <p>New user?</p>
                <Link to="/register" className="register-text btn btn-info btn-sm">Create new account</Link>
            </div>

        </div>
    )
}

{/* <div>
  <label class="col-form-label col-form-label-lg mt-4" for="inputLarge">Large input</label>
  <input class="form-control form-control-lg" type="text" placeholder=".form-control-lg" id="inputLarge">
</div> */}