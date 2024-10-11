import { RootState } from '../../store/store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useEffect } from 'react'
import { loadCollection } from '../../store/features/collection-slice'
import { loadTradeCollection } from '../../store/features/trade-collection-slice'
import BooksContainer from '../comic-books/books-container/BooksContainer'
import './CollectionPage.css'

export default function CollectionPage() {

  const dispatch = useAppDispatch()
  const { collection, loading: loadingCollection, error: errorCollection } = useAppSelector((state: RootState) => state.collection)
  const { tradeCollection, loading: loadingTradeCollection, error: errorTradeCollection } = useAppSelector((state: RootState) => state.tradeCollection)

  useEffect(() => {
    if (collection.length === 0) {
      dispatch(loadCollection(null))
    }
    if (tradeCollection.length === 0) {
      dispatch(loadTradeCollection(null))
    }
  }, [dispatch])

  return (
    <>
      {/* {error && <div>There was an error <button onClick={() => dispatch(clearError())}>x</button></div>} */}
      <section className="d-flex flex-column align-items-center">
        <h1 className="text-center fs-2">My Collection</h1>
        {loadingCollection && <p>Loading collection...</p>}
        {errorCollection && <p>Error loading collection: {errorCollection}</p>}
        <BooksContainer books={collection} type="collection" />
        <h2 className="text-center fs-2">My Trade Collection</h2>
        {loadingTradeCollection && <p>Loading collection...</p>}
        {errorTradeCollection && <p>Error loading collection: {errorTradeCollection}</p>}
        <BooksContainer books={tradeCollection} type="trade-collection" />
      </section>
    </>
  )
}