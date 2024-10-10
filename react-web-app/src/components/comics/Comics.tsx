import './Comics.css';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Link } from 'react-router-dom';
import { useState } from 'react';


export default function Comics({ data, onClick }: any)
{

    return (
        <div className="comics">
            {
                data.map((comic: any) => {
                // const detailsUrl = `/${comic.id}`

                return (
                    // <Link to={detailsUrl}>
                    <a
                        key={comic.id}
                        className="comicCard"
                        style={{
                            background: `url(${comic.thumbnail.path}.${comic.thumbnail.extension}) no-repeat center`,
                            backgroundSize: "cover",
                        }}
                        // onClick={() => dispatch(setComicBookDetail(comicBookDetail))}
                        id={comic.id}
                        onClick={() => onClick(comic.id)}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <div className="caption">{comic.title}</div>
                        <div className="caption bottom">View Comic Details</div>
                    </a>
                    // </Link>
                )
            })}
        </div>
    )
}