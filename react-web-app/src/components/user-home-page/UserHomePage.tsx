import { Link } from "react-router-dom";
import Search from "../search/Search";
import './UserHomePage.css'

export default function UserHomePage()
{
    return (
        <div className="">
            <div className="discover-container btn-section">
                <Link to={'/collection'} className="btn-collection"><button className="btn-collection btn btn-primary btn-lg" type="button">View My Collection</button></Link>
            </div>
            <div>
                <Search />
            </div>
        </div>
    )
}