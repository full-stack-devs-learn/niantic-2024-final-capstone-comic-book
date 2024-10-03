import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import authenticationService from "../../../services/authentication-service"
import { Registration } from "../../../models/security/user-credentials"

export default function Register()
{
    const navigate = useNavigate()

    const [username, setUserName] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [confirmPassword, setConfirmPassword] = useState<string>()
    const [role, setRole] = useState<string>('USER')

    async function loginHandler(event: React.FormEvent<HTMLFormElement>)
    {
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

            <div className="row">
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input type="password" className="form-control" name="confirm-password" id="confirm-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <div className="row">
                <label htmlFor="role">Select Role:</label>
                <select className="form-select" name="role" id="role" onChange={(e) => setRole(e.target.value)}>
                    <option value="USER">User</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>
            <button className="btn btn-success mr-3" type="submit">Register</button>
        </form>
        <Link to="/login">Login</Link>
        </div>
    )
}