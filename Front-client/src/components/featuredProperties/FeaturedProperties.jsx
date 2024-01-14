import "./featuredProperties.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useFetch from "../../hooks/useFetch"
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useContext, useEffect, useState } from "react"
import { faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { SearchContext } from "../../context/SearchContext";

const FeaturedProperties = () => {

    useEffect(() => {
        Aos.init({ duration: 300 })
    }, [])
    // eslint-disable-next-line
    const { data, loading, error } = useFetch("/hotels?featured=true")

    const { dispatch } = useContext(SearchContext);
    
    const today = new Date();
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    const startDate = new Date(today);
    const endDate = new Date(today.setDate(today.getDate() + 2));
    // eslint-disable-next-line
    const [dates, setDates] = useState([
        {
            startDate: startDate,
            endDate: endDate,
            key: 'selection'
        }
    ]);
    // eslint-disable-next-line
    const [option, setOption] = useState({
        adult: 2,
        children: 0,
        room: 1
    });

    const navigate = useNavigate()

    return (
        <section className="fp container section">

            <div data-aos='fade-right' className="fpSecTitle">
                <h3 className="fpTitle">The most popular properties</h3>
            </div>

            <div className="fpSecContent grid">
                {loading ? 'PLEASE WAIT' :
                    <>
                        {data.map((item) => (
                            <div data-aos='fade-up' className="singleProperties flex" key={item._id}>
                                <div className="fpImgae flex">
                                    <img src={item.photos[0]}
                                        alt=""
                                    />
                                </div>

                                <div className="fpInfo">
                                    <h4 className="fpName"> {item.name} </h4>

                                    <h5 className="fpCity"> <FontAwesomeIcon icon={faLocationDot} /> {item.city} </h5>

                                    <span className="fpPrice">From {item.cheapestPrice} USD/night</span>

                                    <span className="fpDistance"> {item.distance} m from {item.city} city center </span>

                                    <button className="btn flex"
                                        onClick={() => {
                                            dispatch({ type: "NEW_SEARCH", payload: { dates, option } });
                                            localStorage.setItem('dates', JSON.stringify(dates));
                                            localStorage.setItem('option', JSON.stringify(option));
                                            navigate(`/hotels/${item._id}`, { state: { dates, option } });
                                        }}
                                    >
                                        DETAIL!
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                }
            </div>
        </section>
    )
}

export default FeaturedProperties