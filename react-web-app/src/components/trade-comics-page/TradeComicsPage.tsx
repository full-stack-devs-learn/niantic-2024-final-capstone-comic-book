import { RootState } from '../../store/store'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useEffect } from 'react'
import { loadTradeComics } from '../../store/features/trade-comics-slice'
import BooksContainer from '../comic-books/books-container/BooksContainer'
import './TradeComicsPage.css'

export default function TradeComicsPage() {

  const dispatch = useAppDispatch()
  const { tradeComics, loading, error } = useAppSelector((state: RootState) => state.tradeComics)

  useEffect(() => {
    if (tradeComics.length === 0) {
      dispatch(loadTradeComics(null))
    }
  }, [dispatch])

  return (
    <>
      <section className="d-flex flex-column align-items-center">
        <h1 className="text-center fs-2 mb-5">Browse Comics Available to Trade</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {tradeComics.length === 0 && <h5 className="text-center">No comics are currently available for trading.<br></br>Please check back later!</h5>}
        <BooksContainer books={tradeComics} type="trade-comics" />
      </section>
    </>
  )
}