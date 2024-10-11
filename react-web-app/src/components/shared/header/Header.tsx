import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../store/hooks'
import { logout } from '../../../store/features/authentication-slice'
import { clear as clearCollection } from '../../../store/features/collection-slice'
import { clear as clearTradeCollection } from '../../../store/features/trade-collection-slice'
import { clear as clearWishlist } from '../../../store/features/wishlist-slice'
import { clear as clearTradeComics } from '../../../store/features/trade-comics-slice'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { BoxArrowRight, Person, Book, BookFill, ArrowLeftRight } from 'react-bootstrap-icons'
import logoImage from '/images/logo.png'
import './Header.css'

export default function Header() {

  const dispatch = useAppDispatch()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.authentication)

  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('user')
    dispatch(logout())
    dispatch(clearCollection())
    dispatch(clearWishlist())
    dispatch(clearTradeCollection())
    dispatch(clearTradeComics())
    navigate("/")
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar2" data-bs-theme="dark">
      <div className="container">
        <Link className="navbar-brand d-flex flex-row gap-3 align-items-center" to="/">
          <img src={logoImage} className="logo-img" alt="Comic Circle Logo" />
          <h5 className="mb-0 logo">Comic Circle</h5>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/explore">Explore</NavLink>
            </li>
            {
              isAuthenticated &&
              
                <li className="nav-item">
                  <NavLink className="nav-link" to="/trade">Trade</NavLink>
                </li>
              
            }
          </ul>
          <ul className="navbar-nav ms-md-auto">
            {
              !isAuthenticated &&
              <>
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
              isAuthenticated &&
              <>
                <li className="nav-item py-2 py-lg-1 col-12 col-lg-auto">
                  <div className="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
                  <hr className="d-lg-none my-2 text-white-50" />
                </li>
                <ul className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Welcome, {user?.username}!
                  </a>
                  <div className="dropdown-menu">
                    <li><Link className="dropdown-item d-flex flex-row align-items-center gap-2" to="/profile">
                      <Person />Profile
                    </Link></li>
                    <li><Link className="dropdown-item d-flex flex-row align-items-center gap-2" to="collection">
                      <BookFill />Collection
                    </Link></li>
                    <li><Link className="dropdown-item d-flex flex-row align-items-center gap-2" to="wishlist">
                      <Book />Wishlist
                    </Link></li>
                    <li><Link className="dropdown-item  d-flex flex-row align-items-center gap-2" to="trades">
                      <ArrowLeftRight />Trades
                    </Link></li>
                    <div className="dropdown-divider"></div>
                    <li><hr className="dropdown-divider" style={{ borderColor: 'rgba(255, 255, 255, 0.5)' }} /></li>
                    <li><button className="dropdown-item d-flex flex-row align-items-center gap-2" onClick={handleLogout}><BoxArrowRight />Logout</button></li>
                  </div>
                </ul>
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