
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Header from './components/shared/header/Header'
import Login from './components/authentication/login/Login'
import Register from './components/authentication/register/Register'
import { useSelector } from 'react-redux'
import { RootState } from "./store/store";
import { useAppDispatch } from './store/hooks'
import UserHomePage from './components/user-home-page/UserHomePage'
import Explore from './components/explore/Explore'

function App() {

  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.authentication);

  // dispatch();
  
  return (
    <Router>
      <Header />

      <main className="container mt-4">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/explore' element={<Explore />} />

        { !isAuthenticated && <Route path='/' element={<Home />} />}
        { isAuthenticated && <Route path='/' element={<UserHomePage />} />}

      </Routes>
      </main>

      <footer>
        <div className='container'>

        &copy; Comic Circle 2024
        </div>
      </footer>

    </Router>
  )
}

export default App
