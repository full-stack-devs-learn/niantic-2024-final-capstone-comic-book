import './Details.css'
import collectionService from '../../services/collection-service'
import wishlistService from '../../services/wishlist-service';
import { ComicBook } from '../../models/ComicBook';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { clear } from '../../store/features/collection-slice'
import { clear as clearWishlist } from '../../store/features/wishlist-slice'
import { useAppDispatch } from '../../store/hooks';
import { useEffect, useState } from 'react';


export default function Details(this: any, { title, description, photoUrl, comicId }: any) {
    const dispatch = useAppDispatch()
    const { isAuthenticated } = useSelector((state: RootState) => state.authentication);
    const [isInCollection, setIsInCollection] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);

    // if user is logged out, display marvel details only
    // if user is logged in, display add to collection and wishlist buttons

    const newComicBook: ComicBook = {
        marvelId: comicId,
        title: title,
        description: description,
        imageUrl: photoUrl,
    }

    const newWishlist: ComicBook = {
        marvelId: comicId,
        title: title,
        description: description,
        imageUrl: photoUrl,
    }

    const checkInCollection = async () => {
        try {
            const userCollection = await collectionService.getUserCollection();
            const comicIdFromCollection = (userCollection).find(c => c.marvelId == comicId)?.marvelId || 0;
            setIsInCollection(comicIdFromCollection > 0)
            console.log(`is in collection ${isInCollection}`)
        }
        catch (error) {
            console.error("Error fetching collection: ", error);
        }
    }

    useEffect(() => {
        checkInCollection();
    }, []);

    useEffect(() => {
        checkInCollection();
    }, [isInCollection])


    const checkInWishlist = async () => {
        try {
            const userWishlist = await wishlistService.getUserWishlist();
            const comicIdFromWishlist = userWishlist.find(c => c.marvelId == comicId)?.marvelId || 0;
            setIsInCollection(comicIdFromWishlist > 0)
            console.log(`is in wishlist? ${isInWishlist}`)
        }
        catch (error) {
            console.error("Error fetching wishlist: ", error);
        }
    }

    useEffect(() => {
        checkInWishlist();
    }, []);

    useEffect(() => {
        checkInWishlist();
    }, [isInWishlist])


    async function updateUserCollection() {
        checkInCollection();

        if (!isInCollection) {
            await collectionService.addComicBookToUserCollection(newComicBook)
            console.log(`Comic book has been added to collection with Marvel Id: ${comicId}`)
            // setIsInCollection(true);
            checkInCollection();

            dispatch(clear());
        }
        else {
            console.log(`is in collection before removal ${isInCollection}`)
            await collectionService.removeComicBookFromUserCollection(comicId)
            console.log('Comic book has been removed from collection')
            setIsInCollection(false);
            console.log(`is in collection after removal ${isInCollection}`)

            dispatch(clear());
        }

        checkInCollection();
    }



    async function updateUserWishlist() {
        checkInWishlist();

        if (!isInWishlist) {
            await wishlistService.addComicBookToUserWishlist(newComicBook)
            console.log(`Comic book has been added to wishlist with Marvel Id: ${comicId}`)
            setIsInWishlist(true);

            dispatch(clearWishlist());
        }
        else {
            console.log(`is in wishlist before removal ${isInWishlist}`)
            await wishlistService.removeComicBookFromUserWishlist(comicId)
            console.log('Comic book has been removed from wishlist')
            setIsInWishlist(false);
            console.log(`is in wishlist after removal ${isInCollection}`)

            dispatch(clearWishlist());
        }

        checkInWishlist();
        // isInCollection;
        // console.log(`is in collection? ${isInCollection}`)
    }


    return (
        <div className="card details-card text-white mb-3 section-container">
            <div className='content-container'>
                <img className='img' src={photoUrl} />
                <div className='details-container'>
                    <div className='details'>
                        <h3>{title}</h3>
                        <p>{description}</p>
                    </div>
                    {
                        isAuthenticated &&
                        <>
                            <div className="btn-group collection" role="group" aria-label="Basic checkbox toggle button group">
                                <input type="checkbox" className="btn-check" name="btncheck" id="btncheck1" checked={isInWishlist} onChange={updateUserWishlist} />
                                {
                                    !isInWishlist && <label className="btn btn-sm btn-outline-primary" htmlFor="btncheck1">Add to Wishlist</label>

                                }
                                {
                                    isInWishlist && <label className="btn btn-sm btn-outline-primary" htmlFor="btncheck1">Added to Wishlist</label>
                                }
                            </div>
                            <div>

                            </div>
                            <div className="btn-group collection" role="group" aria-label="Basic checkbox toggle button group">
                                <input type="checkbox" className="btn-check" name="btncheck" id="btncheck2" checked={isInCollection} onChange={updateUserCollection} />
                                {
                                    !isInCollection && <label className="btn btn-lg btn-outline-primary" htmlFor="btncheck2">Add to Collection</label>

                                }
                                {
                                    isInCollection && <label className="btn btn-lg btn-outline-primary" htmlFor="btncheck2">Added to Collection</label>
                                }

                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}