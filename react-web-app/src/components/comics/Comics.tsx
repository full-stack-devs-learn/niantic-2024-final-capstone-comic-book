import './Comics.css';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Link } from 'react-router-dom';
import { setComicBookDetail } from '../../store/features/comic-details-slice';
// import { comicBookDe }


export default function Comics({ data, onClick }: any)
{
    const dispatch = useDispatch<AppDispatch>();
    let { comicBookDetail } = useSelector((state: RootState) => state.comicBookDetail);

    // comicBookDetail = {
    //     comicId: null,
    //     marvelId: 0,
    //     title: '',
    //     description: '',
    //     imageUrl: '',
    //     isInCollection: false,
    //     isInWishlist: false,
    // }

    return (
        <div className="comics">
            {
                data.map((comic: any) => {
                const detailsUrl = `/${comic.id}`

                return (
                    <Link to={detailsUrl}>
                    <a
                        key={comic.id}
                        className="comicCard"
                        style={{
                            background: `url(${comic.thumbnail.path}.${comic.thumbnail.extension}) no-repeat center`,
                            backgroundSize: "cover",
                        }}
                        // onClick={() => dispatch(setComicBookDetail(comicBookDetail))}
                        onClick={() => onClick(comic.id)}
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

// WORKING CODE:
// return (
//     <div className="comics">
//         {
//             data.map((comic: any) => {
//             const detailsUrl = `/${comic.id}`

//             return (
//                 <Link to={detailsUrl}>
//                 <a
//                     key={comic.id}
//                     className="comicCard"
//                     style={{
//                         background: `url(${comic.thumbnail.path}.${comic.thumbnail.extension}) no-repeat center`,
//                         backgroundSize: "cover",
//                     }}
//                     onClick={() => dispatch(setComicBookId(`${comic.id}`))}
//                     target="_blank"
//                     rel="noreferrer"
//                 >
//                     <div className="caption">{comic.title}</div>
//                     <div className="caption bottom">View Comic Details</div>
//                 </a>
//                 </Link>
//             )
//         })}
//     </div>
// )