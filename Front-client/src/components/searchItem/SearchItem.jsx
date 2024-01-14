import "./searchItem.scss";
import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  return (
    <section className="searchItems container section">
      <div className="searchContent">
        <div className="singleHotel flex">
          <img src={item.photos[2]} alt="" />

          <div className="siDesc grid">
            <h1 className="siTitle"> {item.name} </h1>
            <span className="siDistance">
              {" "}
              {item.distance} m from {item.city} city center{" "}
            </span>
            <span className="siTaxi">Free airpot taxi</span>
            <span className="siSubTitle"> {item.title} </span>
            <span className="siFeatures"> {item.features} </span>
            <span className="siCancelOp">Free cancellation</span>

            <span className="siPrice">
              {" "}
              <small>Just from</small> {item.cheapestPrice}{" "}
              <small>USD/night</small>
            </span>
            <span className="siTaxOp">Include taxes and fees</span>

            <Link to={`/hotels/${item._id}`}>
              <button className="btn">SEE AVAILABILITY!</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchItem;
