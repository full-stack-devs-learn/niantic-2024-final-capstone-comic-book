import BookCard from '../book-card/BookCard'
import { ComicBook } from '../../../models/ComicBook'
import './BooksContainer.css'

interface BooksContainerProps {
  books: ComicBook[]
}

export default function BooksContainer({ books }: BooksContainerProps) {
  return (
    <div>
      {
        books.map((book) => (
          <BookCard key={book.comicBookId} book={book}
          />
        ))
      }
    </div>
  )
}