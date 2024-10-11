import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import authenticationService from "../../../services/authentication-service"
import { Registration } from "../../../models/security/user-credentials"
import './Register.css'

export default function Register() {
    const navigate = useNavigate()

    const [username, setUserName] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [confirmPassword, setConfirmPassword] = useState<string>()
    const [role, setRole] = useState<string>('USER')

    async function loginHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const registration = new Registration()
        registration.username = username!
        registration.password = password!
        registration.confirmPassword = confirmPassword!
        registration.role = role!

        await authenticationService.register(registration);

        navigate('/login')
    }

    return (
        <div className="container register-card col-lg-4">

            <h3 id="register">Create account</h3>

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

                <div className="row row-container mt-3">
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input type="password" className="form-control mt-2" name="confirm-password" placeholder="Re-enter password" id="confirm-password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className="hide-role">
                    <label htmlFor="role">Select Role:</label>
                    <select className="form-select mt-2" name="role" id="role" onChange={(e) => setRole(e.target.value)}>
                        <option value="USER">User</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <div className="row row-container mt-3 mb-3">
                    <button className="btn btn-success mt-3 mb-3" type="submit">Register</button>
                </div>
            </form>
            <div className=" row row-container mt-5 login">
                <p>Already have an account?</p>
                <Link to="/login" className="login-text btn btn-info btn-sm">Login</Link>
            </div>
        </div>
    )
}