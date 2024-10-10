import { Link } from 'react-router-dom'
import notFoundImg from '/images/not-found-img.jpg'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className="d-flex flex-column gap-3 align-items-center pt-3">
      <img src={notFoundImg} alt="Error 404" className="not-found-img mb-3" />
      <Link to="/" className="text-decoration-none"><h2 className="fs-4">Go to Home page</h2></Link>
    </div>
  )
}

export default NotFound;
