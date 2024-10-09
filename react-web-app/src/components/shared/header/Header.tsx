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
                                    <NavLink className="nav-link" to="/"><button className="nav-link">Explore</button></NavLink>
                                </li>
                                <li className="nav-item py-2 py-lg-1 col-12 col-lg-auto">
                                    <div className="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
                                    <hr className="d-lg-none my-2 text-white-50" />
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to='/collection'><button className="nav-link">Collection</button></NavLink>
                                </li>
                                <li className="nav-item py-2 py-lg-1 col-12 col-lg-auto">
                                    <div className="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
                                    <hr className="d-lg-none my-2 text-white-50" />
                                </li>
                                <li className="nav-item dropdown nav-link">
                                    <button className="nav-link dropdown-toggle show" data-bs-toggle="dropdown"  role="button" aria-haspopup="true" aria-expanded="true">

                                        <svg xmlns="http://www.w3.org/2000/svg" height="1.35rem" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                        </svg>
                                            {user?.username}
                                    </button>
                                    <div className="dropdown-menu" data-bs-popper="static">
                                        <NavLink className="nav-link" to='/profile'><a className="dropdown-item" href="#">Profile</a></NavLink>
                                        <div className="dropdown-divider"></div>
                                        <NavLink className="nav-link" to='' onClick={handleLogout}><a className="dropdown-item">Logout</a></NavLink>
                                    </div>
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