import "./featuredProperties.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-regular-svg-icons"
import useFetch from "../../hooks/useFetch"

const FeaturedProperties = () => {

    const {data, loading, error} = useFetch("/hotels?featured=true")

  return (
    <div className="fp">
        {loading ? "LOADING" : <>
            {data.map((item) => (
                <div className="fpItem" key={item._id}>
                    <img src={item.photos[0]}
                        height={200}
                        width={310} 
                        alt="" 
                        className="fpImg" />
                    <span className="fpName"> {item.name} </span>
                    <span className="fpCity"> {item.city} </span>
                    <span className="fpPrice">From {item.cheapestPrice} USD/night</span>
                    {item.rating && <div className="fpRating">
                        <button>{item.rating} <FontAwesomeIcon icon={faStar} /></button>
                        <span>Excellent</span>
                    </div>}
                </div>
            ))}   
        </>}
    </div>
  )
}

export default FeaturedProperties