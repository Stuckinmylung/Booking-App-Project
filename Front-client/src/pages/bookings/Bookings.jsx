import React, { useContext, useState, useEffect } from "react";
import Booking from "../../components/booking/Booking";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import "./bookings.scss";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const { data, error, loading } = useFetch(`/reservations/${user._id}`);
  const [totalBookingPrice, setTotalBookingPrice] = useState(0);

  const handleDelete = async (reservationId) => {
    try {
      await axios.delete(`/reservations/${reservationId}`);
    } catch (error) {}
  };
  const navigate = useNavigate();

  const handlePayAllClick = async () => {
    try {
      const reservations = data.map((booking) => ({
        hotelId: booking.hotelId,
        roomNumberId: booking.roomNumberId,
        userId: booking.userId,
        dates: booking.dates,
      }));
      const paymentResponse = await axios.post("/payments/paid", {
        reservations: reservations,
        amount: totalBookingPrice,
        isPaid: true,
      });
      const paymentData = paymentResponse.data;
      for (const booking of data) {
        await axios.delete(`/reservations/paid/${booking._id}`);
      }
      // Navigation is moved inside onToken
    } catch (error) {
      // Handle error
      console.error("Error during payment:", error);
    }
  };

  function onToken(token) {
    // Perform any additional actions with the token if needed
    console.log(token);

    // After successful payment, navigate to the desired page
    navigate("/");
  }

  useEffect(() => {
    const calculateTotalBookingPrice = async () => {
      try {
        let totalPrice = 0;
        for (const booking of data) {
          const roomResponse = await axios.get(
            `/rooms/find/${booking.roomNumberId}`
          );
          const roomData = roomResponse.data;
          if (roomData && roomData.price) {
            totalPrice += roomData.price;
          } else {
          }
        }

        return totalPrice;
      } catch (error) {}
    };

    calculateTotalBookingPrice().then((total) => {
      setTotalBookingPrice(total);
    });
  }, [data]);

  return (
    <div className="bookings">
      <Navbar />
      <div className="Bcontainer">
        <h1>Your bookings</h1>
        {loading ? (
          "Loading Please Wait..."
        ) : (
          <div className="Bwrapper">
            {data.map((item, i) => (
              <Booking
                hotelId={(item.hotelId || i).toString()}
                roomNumberId={item.roomNumberId}
                name={user.username}
                r_id={item._id}
                totalPrice={item.totalPrice}
                onDelete={handleDelete}
                key={i}
              />
            ))}
            <div className="totalPrice">
              <h2>Total Price of All Bookings: ${totalBookingPrice}</h2>
              <StripeCheckout
                amount={totalBookingPrice * 100}
                token={onToken}
                currency="USD"
                stripeKey="pk_test_51OVbfhIcnHYgJdimtMtELm2X03gyziuGiSnQYn1IJv0NOK1JmAqbVe3QlGprSuDNrcnY8nlaFVfjBby8XbFroOK9003HyGJmEQ"
              >
                <button className="btn" onClick={handlePayAllClick}>Pay All</button>
              </StripeCheckout>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
