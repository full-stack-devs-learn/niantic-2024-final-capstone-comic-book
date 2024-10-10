import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import Home from './components/home/Home'
import Header from './components/shared/header/Header'
import Footer from './components/shared/footer/Footer'
import Login from './components/authentication/login/Login'
import Register from './components/authentication/register/Register'
import UserHomePage from './components/user-home-page/UserHomePage'
import Explore from './components/explore/Explore'
import CollectionPage from './components/collection-page/CollectionPage'
import NotFound from './components/not-found-page/NotFound'

import './App.css'

function App() {

  const { isAuthenticated } = useSelector((state: RootState) => state.authentication);

  return (
    <>
      <Router>
        <Header />

        <main className="container p-4">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/explore' element={<Explore />} />
            {!isAuthenticated && <Route path='/' element={<Home />} />}
            {isAuthenticated && <Route path='/' element={<UserHomePage />} />}
            {isAuthenticated && <Route path='/collection' element={<CollectionPage />} />}
          </Routes>
        </main>

        <Footer />
      </Router>
    </>
  )
}

export default App
