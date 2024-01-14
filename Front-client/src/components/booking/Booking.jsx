import axios from "axios";
import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./booking.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

const Booking = ({ hotelId, roomNumberId, name, r_id }) => {
  const [roomNumbers, setRoomNumbers] = useState([]);
  const [roomPrice, setRoomPrice] = useState([]);

  const { data, loading, error, reFetch } = useFetch(`/hotels/find/${hotelId}`);
  useEffect(() => {
    const fetchRoomNumbers = async () => {
      try {
        const response_1 = await axios.get(
          `/rooms/findByRoomNumberId/${roomNumberId}`
        );
        setRoomNumbers(response_1.data.number || []);
      } catch (error) { }
    };

    fetchRoomNumbers();
  }, [roomNumberId]);

  useEffect(() => {
    const fetchRoomPrice = async () => {
      try {
        const response_2 = await axios.get(`/rooms/find/${roomNumberId}`);
        setRoomPrice(response_2.data.price || []);
      } catch (error) { }
    };
    fetchRoomPrice();
  }, [roomNumberId]);

  const handleClick = async () => {
    await axios.delete(`/reservations/${r_id}`);
    window.location.reload(false);
  };

  return (
    <div className="booking">
      {loading
        ? "Loading please wait"
        : data && (
          <div className="bookingContainer">
            <div className="bookingImg">
              <img
                src={
                  data.photos && data.photos.length > 0
                    ? data.photos[0]
                    : "https://images.unsplash.com/photo-1635548166842-bf67bacbefaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                }
                alt=""
              />
            </div>

            <div className="bookingInfo">
              <div className="desc">
                <h3>{data.name}</h3>
                <p> <FontAwesomeIcon icon={faLocationDot} /> {data.address}</p>
                <h4>Room Numbers: {roomNumbers}</h4>
                <h4>Room Price:{roomPrice} $</h4>
              </div>

              <button className="btn" onClick={handleClick}>Cancel Booking</button>

            </div>
          </div>
        )}
    </div>
  );
};

export default Booking;
