import BookCard from '../book-card/BookCard'
import { ComicBook } from '../../../models/ComicBook'
import './BooksContainer.css'

interface BooksContainerProps {
  books: ComicBook[]
}

export default function BooksContainer({ books }: BooksContainerProps) {
  return (
    <div className="d-flex flex-row flex-wrap gap-3 mb-5">
      {
        books.map((book) => (
          <BookCard key={book.comicBookId} book={book}
          />
        ))
      }
    </div>
  )
}