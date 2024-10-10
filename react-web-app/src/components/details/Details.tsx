import './Details.css'
import collectionService from '../../services/collection-service'
import { ComicBook } from '../../models/ComicBook';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function Details(this: any, { title, description, photoUrl, comicId }: any)
{
    const { isAuthenticated } = useSelector((state:RootState) => state.authentication);

    // if user is logged out, display marvel details only
    // if user is logged in, display add to collection and wishlist buttons
    let comicIdFromCollection: number = 0;
    let comicIdFromWishlist: number = 0;

    const newComicBook: ComicBook = {
        marvelId: comicId,
        title: title,
        description: description,
        imageUrl: photoUrl,
    }
    
    async function checkInCollection(comicId: number)
    {
        const userCollection = await collectionService.getUserCollection();
        comicIdFromCollection = userCollection.find(c => c.marvelId == comicId)?.marvelId || 0;
    }

    const isInCollection: boolean = comicIdFromCollection > 0;
    console.log(`is in collection ${isInCollection}`)

    // async function checkInWishlist(comicId: number)
    // {
    //     const userWishlist = await wishlistService.getUserWishlist();
    //     comicIdFromCollection = userWishlist.find(c => c.marvelId == comicId)?.marvelId || 0;
    // }

    // const isInWishlist: boolean = comicIdFromWishlist > 0;
    // console.log(`is in wishlist ${isInWishlist}`)

    // async function updateUserCollection()
    // {
    //     if(comicIdFromCollection == 0)
    //     {
    //         await collectionService.addComicBookToUserCollection(newComicBook)
    //         console.log('Comic book has been added to collection')
    //     }
    //     else
    //     {
    //         await collectionService.removeComicBookToUserCollection(comicId)
    //         console.log('Comic book has been removed from collection')
    //     }

    // }


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
                        <div className='form-check wishlist'>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">Add to wishlist</label>

                            {/* <input type="radio" className="btn-check" name="btnradio" id="btnradio1" checked={!isInWishlist} />
                            <label className="btn btn-lg btn-outline-primary" htmlFor="btnradio1">Not in Collection</label>
                            <input type="radio" className="btn-check" name="btnradio" id="btnradio2" checked={isInWishlist} />
                            <label className="btn btn-lg btn-outline-primary" htmlFor="btnradio2">Added to Collection</label>
                             */}
                        </div>
                        <div className="btn-group collection" role="group">
                            <input type="radio" className="btn-check" name="btnradio" id="btnradio1" checked={!isInCollection} />
                            <label className="btn btn-lg btn-outline-primary" htmlFor="btnradio1">Not in Collection</label>
                            <input type="radio" className="btn-check" name="btnradio" id="btnradio2" checked={isInCollection} />
                            <label className="btn btn-lg btn-outline-primary" htmlFor="btnradio2">Added to Collection</label>
                            {/* <input type="radio" className="btn-check" name="btnradio" id="btnradio1"  />
                            <label className="btn btn-lg btn-outline-primary" htmlFor="btnradio1">Not in Collection</label>
                            <input type="radio" className="btn-check" name="btnradio" id="btnradio2" onClick={updateUserCollection} />
                            <label className="btn btn-lg btn-outline-primary" htmlFor="btnradio2">Add to Collection</label> */}
                        </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}