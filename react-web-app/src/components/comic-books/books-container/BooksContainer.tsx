import BookCard from '../book-card/BookCard'
import { ComicBook } from '../../../models/ComicBook'
import './BooksContainer.css'

interface BooksContainerProps {
  books: ComicBook[],
  type: string
}

export default function BooksContainer({ books, type }: BooksContainerProps) {
  return (
    <div className="d-flex flex-row flex-wrap gap-3 mb-5">
      {
        books.map((book) => (
          <BookCard 
          key={book.comicBookId} 
          book={book}
          type={type}
          />
        ))
      }
    </div>
  )
}