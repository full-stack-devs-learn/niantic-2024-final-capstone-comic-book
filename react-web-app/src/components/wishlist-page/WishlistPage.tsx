import { RootState } from '../../store/store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useEffect } from 'react'
import { loadCollection } from '../../store/features/collection-slice'
import BooksContainer from '../comic-books/books-container/BooksContainer'
import './WishlistPage.css'

export default function WishlistPage() {

  const dispatch = useAppDispatch()
  const { collection, loading, error } = useAppSelector((state: RootState) => state.collection)

  useEffect(() => {
    if (collection.length === 0) {
      dispatch(loadCollection(null))
    }
  }, [dispatch])


  if (loading) return <p>Loading categories...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <section className="d-flex flex-column align-items-center">
      <h1 className="text-center fs-2">My Wishlist</h1>
      <BooksContainer books={collection} />
    </section>
  )
}