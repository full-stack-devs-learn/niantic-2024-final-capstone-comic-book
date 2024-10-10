import './Details.css'
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store/store';
// import { useParams } from 'react-router-dom';

export default function Details({ title, description, photoUrl }: any)
{
    // const { id } = useParams<{ id: string }>(); 
    // if user is logged out, display marvel details only
    // if user is logged in, display add to collection and wishlist buttons

    // const { data } = useSelector((state: RootState) => state.data);

    return (
        <div className="card details-card text-white mb-3 section-container">
            <div className='content-container'>
                <img className='img' src={photoUrl} />
                <div className='details-container'>
                    <div className='details'>
                        <h3>{title}</h3>
                        <p>{description}</p>
                    </div>
                    <div className='form-check wishlist'>
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">Add to wishlist</label>
                    </div>
                    <div className="btn-group collection" role="group">
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio1"  />
                        <label className="btn btn-lg btn-outline-primary" htmlFor="btnradio1">Not in Collection</label>
                        <input type="radio" className="btn-check" name="btnradio" id="btnradio2"  />
                        <label className="btn btn-lg btn-outline-primary" htmlFor="btnradio2">Add to Collection</label>
                    </div>
                </div>
            </div>
        </div>
    )
}