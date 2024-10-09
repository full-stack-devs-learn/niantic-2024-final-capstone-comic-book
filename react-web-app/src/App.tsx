import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from "./store/store";
import { useAppDispatch } from './store/hooks'
import Home from './components/home/Home'
import Header from './components/shared/header/Header'
import Login from './components/authentication/login/Login'
import Register from './components/authentication/register/Register'
import UserHomePage from './components/user-home-page/UserHomePage'
import Explore from './components/explore/Explore'
import Details from './components/details/Details';
import Collection from './components/collection/Collection';

function App() {

  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.authentication);
  
  return (
    <>
    <Router>
      <Header />

      <main className="container mt-4">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/explore' element={<Explore />} />

        { !isAuthenticated && <Route path='/' element={<Home />} />}
        { isAuthenticated && <Route path='/' element={<UserHomePage />} />}
        { isAuthenticated && <Route path=':comicBookId' element={<Details />} />}
        { isAuthenticated && <Route path='/collection' element={<Collection />} />}

      </Routes>
      </main>

    </Router>
      <footer>
        <div className='cc-footer'>
          &copy; Comic Circle 2024
        </div>
      </footer>
    </>
  )
}

export default App
