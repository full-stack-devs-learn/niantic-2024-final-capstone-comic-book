import { Outlet } from "react-router-dom";
import Search from "../search/Search";

export default function UserHomePage()
{
    return (
        <div className="container">

            {/* insert view collection button/component */}
            {/* insert discover comic books component */}

            <h1>Welcome user</h1>
            <button>View My Collection</button>
            <div className="container">
                <h3>Discover comic books</h3>
                <Search />
            </div>
        </div>
    )
}