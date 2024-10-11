import { RootState } from '../../store/store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useEffect } from 'react'
import { loadCollection } from '../../store/features/collection-slice'
import { loadTradeCollection } from '../../store/features/trade-collection-slice'
import BooksContainer from '../comic-books/books-container/BooksContainer'
import './TradeComicsPage.css'

export default function TradeComicsPage() {

  const dispatch = useAppDispatch()
  const { collection, loading, error } = useAppSelector((state: RootState) => state.collection)

  useEffect(() => {
    if (collection.length === 0) {
      dispatch(loadCollection(null))
    }
  }, [dispatch])

  return (
    <>
      <section className="d-flex flex-column align-items-center">
        <h1 className="text-center fs-2 mb-5">Browse Comics Available to Trade</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {collection.length === 0 && <h5 className="text-center">No comics are currently available for trading.<br></br>Please check back later!</h5>}
        <BooksContainer books={collection} type="trade" />
      </section>
    </>
  )
}