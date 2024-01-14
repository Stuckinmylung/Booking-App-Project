import { useState, useEffect } from 'react';
import './attraction.scss'
import axios from 'axios';
import { FiChevronRight } from "react-icons/fi";

const Attraction = ({ hotelId, data }) => {

    const [attractions, setAttractions] = useState([]);

    const fetchAttractionsData = async () => {
        try {
            const response = await axios.get(`/hotels/find/${hotelId}`);
            if (response.status >= 200 && response.status < 300) {
                const r = await axios.get(`/attractions?city=${response.data.city}`);
                if (Array.isArray(r.data)) {
                    const fetchedAttractions = r.data;
                    setAttractions(fetchedAttractions);
                } else {
                    console.error('Invalid attractions data:', r.data);
                }
            } else {
                console.error('Failed to fetch attractions:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching attractions:', error.message);
        }
    };

    useEffect(() => {
        fetchAttractionsData();
    }, [hotelId]);

    return (
        <div className="attractions">
            <h1> Near {data.name} </h1>
            <div className="attractionCotainer">
                {Array.isArray(attractions) &&
                    attractions?.slice(0,9).map((attraction, index) => (
                        <div key={index} className="singleAttraction">
                            <h2 className="name">{attraction.name}</h2>
                            <span className='distance'> <FiChevronRight /> Distance: {attraction.distance / 1000} km away</span>
                            <span className='type'> <FiChevronRight /> {attraction.type}</span>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Attraction