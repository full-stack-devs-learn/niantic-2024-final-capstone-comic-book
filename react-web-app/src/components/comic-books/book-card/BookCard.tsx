import { ComicBook } from '../../../models/ComicBook';
import './BookCard.css';

interface BookCardProps {
  book: ComicBook;
}

export default function BookCard({ book }: BookCardProps) {
  console.log(book)
  return (
    <div className="card book-card">
      <h3>{book.title}</h3>
      <p>Description: {book.description}</p>
    </div>
  )
}