import './searchItem.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-regular-svg-icons"
import { Link } from 'react-router-dom'

const SearchItem = ({item}) => {
  return (
    <div className='searchItem'>
        <img src={item.photos[0]}
             width={250}
             height={200}
             alt="" 
             className="siImg" />
        
        <div className="siDesc">
            <h1 className='siTitle'> {item.name} </h1>
            <span className="siDistance"> {item.distance} m from {item.city} city center </span>
            <span className="siTaxi">Free airpot taxi</span>
            <span className="siSubTitle"> {item.title} </span>
            <span className="siFeatures"> {item.features} </span>
            <span className="siCancelOp">Free cancellation</span>
        </div>
        <div className="siDetail">
            <div className="siRating">
                <span>Exellent</span>
                <button> {item.rating} <FontAwesomeIcon icon={faStar} /></button>
            </div>

            <div className="siDetailTexts">
                <span className="siPrice"> {item.cheapestPrice} <small>USD/night</small></span>
                <span className="siTaxOp">Include taxes and fees</span>
                <Link to={`/hotels/${item._id}`}>
                <button className='siCheckButton'>See availability</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default SearchItem