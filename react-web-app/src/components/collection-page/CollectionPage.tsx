import { RootState } from '../../store/store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useEffect } from 'react'
import { loadCollection } from '../../store/features/collection-slice'
import BooksContainer from '../comic-books/books-container/BooksContainer'
import './CollectionPage.css'

export default function CollectionPage() {

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
    <>
      {/* {error && <div>There was an error <button onClick={() => dispatch(clearError())}>x</button></div>} */}
      <section className="d-flex flex-column align-items-center">
        <h1 className="text-center fs-2">My Collection</h1>
        <BooksContainer books={collection} />
        <h2 className="text-center fs-2">My Trade Collection</h2>
      </section>
    </>
  )
}