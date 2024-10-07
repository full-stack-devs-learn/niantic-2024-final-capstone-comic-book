import Search from "../search/Search";
import './UserHomePage.css'

export default function UserHomePage()
{
    return (
        <div className="">
            <div className="discover-container btn-section">
                <button className="btn-collection btn btn-primary btn-lg" type="button">View My Collection</button>
            </div>
            <div>
                <Search />
            </div>
        </div>
    )
}