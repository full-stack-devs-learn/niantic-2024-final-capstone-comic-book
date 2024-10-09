import './Comics.css';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Link } from 'react-router-dom';
import { setComicBookId } from '../../store/features/comic-details-slice';


export default function Comics({ data, onClick }: any)
{
    const dispatch = useDispatch<AppDispatch>();
    // const {comicBookId} = useSelector((state: RootState) => state.comicBookId);


    return (
        <div className="comics">
            {
                data.map((comic: any) => {
                // const detailsUrl = comic.urls.find(
                //     (element: any) => element["type"] === "detail"
                // ).url

                return (
                    <Link to={`/${comic.id}`}>
                    <a
                        key={comic.id}
                        className="comicCard"
                        style={{
                            background: `url(${comic.thumbnail.path}.${comic.thumbnail.extension}) no-repeat center`,
                            backgroundSize: "cover",
                        }}
                        // if user is logged out, display marvel details only
                        // if user is logged in, display add to collection and wishlist buttons
                        onClick={() => dispatch(setComicBookId(`${comic.id}`))}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div className="caption">{comic.title}</div>
                        <div className="caption bottom">View Comic Details</div>
                    </a>
                    </Link>
                )
            })}
        </div>
    )
}

//WORKING CODE:

// export default function Comics({ data, onClick }: any)
// {
//     return (
//         <div className="comics">
//             {
//                 data.map((comic: any) => {
//                 const detailsUrl = comic.urls.find(
//                     (element: any) => element["type"] === "detail"
//                 ).url

//                 return (
//                     <a
//                         key={comic.id}
//                         className="comicCard"
//                         style={{
//                             background: `url(${comic.thumbnail.path}.${comic.thumbnail.extension}) no-repeat center`,
//                             backgroundSize: "cover",
//                         }}
//                         // if user is logged out, display marvel details only
//                         // if user is logged in, display add to collection and wishlist buttons
//                         href={detailsUrl}
//                         target="_blank"
//                         rel="noreferrer"
//                     >
//                         <div className="caption">{comic.title}</div>
//                         <div className="caption bottom">View Comic Details</div>
//                     </a>
//                 )
//             })}
//         </div>
//     )
// }