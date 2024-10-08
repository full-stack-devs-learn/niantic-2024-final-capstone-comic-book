import { Link, NavLink } from "react-router-dom"
import { useAppDispatch } from "../../../store/hooks";
import { logout } from "../../../store/features/authentication-slice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import './Header.css'

export default function Header() {

    const dispatch = useAppDispatch()
    const { isAuthenticated, user } = useSelector((state: RootState) => state.authentication)

    function handleLogout() {
        localStorage.removeItem('user')
        dispatch(logout())
    }

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar2" data-bs-theme="dark">
            <div className="container">
                <div className="collapse navbar-collapse">
                    <img className="icon" src="/public/logo.png" />
                    <Link className="navbar-brand comic-circle" to="/">Comic Circle</Link>  
                </div>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav ms-md-auto">
                        {
                            !isAuthenticated && <>
                                <li className="nav-item py-2 py-lg-1 col-12 col-lg-auto">
                                    <div className="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
                                    <hr className="d-lg-none my-2 text-white-50" />
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/explore">Explore</NavLink>
                                </li>
                                <li className="nav-item py-2 py-lg-1 col-12 col-lg-auto">
                                    <div className="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
                                    <hr className="d-lg-none my-2 text-white-50" />
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item py-2 py-lg-1 col-12 col-lg-auto">
                                    <div className="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
                                    <hr className="d-lg-none my-2 text-white-50" />
                                </li>
                            </>
                        }

                        {
                            isAuthenticated && <>
                                <li className="nav-item py-2 py-lg-1 col-12 col-lg-auto">
                                    <div className="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
                                    <hr className="d-lg-none my-2 text-white-50" />
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link">Collection</button>
                                </li>
                                <li className="nav-item py-2 py-lg-1 col-12 col-lg-auto">
                                    <div className="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
                                    <hr className="d-lg-none my-2 text-white-50" />
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                                </li>
                                <li className="nav-item py-2 py-lg-1 col-12 col-lg-auto">
                                    <div className="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
                                    <hr className="d-lg-none my-2 text-white-50" />
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link">Hi {user?.username}!</button>
                                </li>
                                <li className="nav-item py-2 py-lg-1 col-12 col-lg-auto">
                                    <div className="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
                                    <hr className="d-lg-none my-2 text-white-50" />
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>






    )
}