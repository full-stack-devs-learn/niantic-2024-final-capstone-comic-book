import { RootState } from '../../store/store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useEffect } from 'react'
import { loadWishlist } from '../../store/features/wishlist-slice'
import BooksContainer from '../comic-books/books-container/BooksContainer'
import './WishlistPage.css'

export default function WishlistPage() {

  const dispatch = useAppDispatch()
  const { wishlist, loading, error } = useAppSelector((state: RootState) => state.wishlist)

  useEffect(() => {
    if (wishlist.length === 0) {
      dispatch(loadWishlist(null))
    }
  }, [dispatch])


  if (loading) return <p>Loading categories...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <section className="d-flex flex-column align-items-center">
      <h1 className="text-center fs-2">My Wishlist</h1>
      {wishlist.length === 0 && <h6>No comics in your wishlist</h6>}
      <BooksContainer books={wishlist} type="wishlist" />
    </section>
  )
}