import './Details.css'

export default function Details()
{
    return (
        <div className="card text-white bg-secondary mb-3 section-container">
            <div className='content-container'>
                <img className='img' src='https://cdn.marvel.com/u/prod/marvel/i/mg/3/00/66c721c18211f/clean.jpg'/>
                <div className='details-container'>
                    <div className='details'>
                        <h3>Comic Book Title</h3>
                        <p>IS THIS FOWL WORTHY OF THE HAMMER OF THOR?! When DONALD DUCK chaperones HUEY, DEWEY AND LOUIE on an archaeological trip to search for ancient Viking artifacts, he finds more than he bargained for when he comes across the STONE DUCKS FROM SATURN preparing for an invasion. But everything changes when he discovers an enchanted cane that causes an egg-ceptional transformation, gifting him with the POWER OF THOR! Can he learn how to use his new abilities in time to save DUCKBURG before he changes back? Find out in this mind-twisting retelling of THE MIGHTY THOR'S THUNDEROUS ORIGIN!</p>
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
                    <div className="d-grid gap-2">
                        <button className="btn btn-sm btn-outline-dark" type="button">Visit official site</button>
                    </div>
                </div>
            </div>
        </div>
    )
}