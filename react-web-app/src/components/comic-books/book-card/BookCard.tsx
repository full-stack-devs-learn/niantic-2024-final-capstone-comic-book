import { ComicBook } from '../../../models/ComicBook';
import { useAppDispatch } from '../../../store/hooks';
import { addComicBookToCollection, removeComicBookFromUserCollection } from '../../../store/features/collection-slice';
import { removeComicBookFromUserWishlist } from '../../../store/features/wishlist-slice';
import { removeComicBookFromUserTradeCollection } from '../../../store/features/trade-collection-slice';
import { ArrowLeftRight, Book, Pen, Trash3 } from 'react-bootstrap-icons';
import './BookCard.css';

interface BookCardProps {
  book: ComicBook;
  type: string;
}

export default function BookCard({ book, type }: BookCardProps) {

  const dispatch = useAppDispatch()

  const handleDeleteBook = async (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation();
    if (book.comicBookId) {
      if (type === 'collection') {
        console.log('Delete Comic Book from Collection:', book.title);
        dispatch(removeComicBookFromUserCollection(book.comicBookId));
      } else if (type === 'wishlist') {
        console.log('Delete Comic Book from Wishlist:', book.title);
        dispatch(removeComicBookFromUserWishlist(book.comicBookId));
      } else if (type === 'trade-collection') {
        console.log('Delete Comic Book from Trade Collection:', book.title);
        const result = await dispatch(removeComicBookFromUserTradeCollection(book.comicBookId));
        if (result.type === 'comics/trade-collection/remove/fulfilled') {
          dispatch(addComicBookToCollection(book));
        }

      }
    }
  }

  const handleMoveToTrade = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation();
    console.log('Move to Trade Collection book:', book.title);
  }

  const handleMoveToCollection = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation();
    console.log('Move to Collection book:', book.title);
  }

  const handleUpdateCondition = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation();
    console.log('Edit condition of book:', book.title);
  }

  return (
    <div className="book-card card d-flex flex-column align-items-center gap-3 justify-content-end">
      <h5 className="text-center">{book.title}</h5>
      <img src={book.imageUrl} alt={`${book.title} cover`} className="card-image" />
      <div className="d-flex flex-row justify-content-between align-items-center h-5 mb-0 w-100">
        {type === 'collection' &&
          <>
            <ArrowLeftRight onClick={handleMoveToTrade} className="icon" title="Move to Trade Collection" />
            <Trash3 onClick={handleDeleteBook} className="icon" title="Remove form Collection" />
          </>
        }
        {type === 'wishlist' &&
          <>
            <Book onClick={handleMoveToCollection} className="icon" title="Move to Collection" />
            <Trash3 onClick={handleDeleteBook} className="icon" title="Remove form Wishlist" />
          </>
        }
        {type === 'trade-collection' &&
          <>
            <Pen onClick={handleUpdateCondition} className="icon" title="Edit condition" />
            <Trash3 onClick={handleDeleteBook} className="icon" title="Remove form Trade Collection" />
          </>
        }
      </div>
    </div>
  )
}