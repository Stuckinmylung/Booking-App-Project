import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './reserve.scss'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"; 

const Reserve = ({setOpen, hotelId}) => {
    const [selectedRooms, setSelectedRooms] = useState([])
    // eslint-disable-next-line
    const {data, loading, error} = useFetch(`/hotels/room/${hotelId}`)
    
    const dates = JSON.parse(localStorage.getItem('dates'));

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime())
        const dates = []
        while(date <= end) {
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate()+1)
        }
        return dates
    }
    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) => 
            allDates.includes(new Date(date).getTime()))

        return !isFound
    }

    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(
            checked
            ? [...selectedRooms, value] 
            : selectedRooms.filter((item )=> item !== value)
        )
    }

    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            const requests = selectedRooms.map(async (roomNumberId)  => {
    
                const hotelResponse = await axios.get(`/hotels/hotelByRoomNumberId/${roomNumberId}`);
                const hotelId = hotelResponse.data._id; // Adjust this according to your actual response structure
                
                const res1 = axios.put(`/rooms/availability/${roomNumberId}`, {
                    dates: allDates,
                });

                const res2 = axios.post(`/reservations/${roomNumberId}`, {
                    hotelId: hotelId, 
                    roomNumberId: roomNumberId,
                    dates: allDates,  // Assuming allDates is the date you want to send
                });
    
                const [data1, data2] = await Promise.all([res1, res2]);
                return [data1, data2];
            });
        
            setOpen(false);
            navigate("/bookings");
        } catch (err) {
            console.error(err);
        }
        
    };
    

  return (
    <div className='reserve'>
        <div className="reContainer">
            <FontAwesomeIcon icon={faCircleXmark}
                             className='reClose'
                             onClick={() => setOpen(false)}
            />
            <span>Select your room</span>
            {data.map((item) => (
                <div className="reItem" key={item._id}>
                    <div className="reItemInfo">
                        <div className="reTitle" > <b>{item.title}</b> </div>
                        <div className="reDesc"> <small>{item.desc}</small> </div>
                        <div className="reMax">Max people: <b><small>{item.maxPeople}</small></b> </div>
                        <div className="rePrice">Price: <b>{item.price}</b> <small>USD/night</small> </div>
                        
                    </div>
                    <div className="reSelecRooms">
                        {item.roomNumbers.map(roomNumber => (
                            <div className="room" key={roomNumber._id}>
                                <b>
                                <label>{roomNumber.number}</label>
                                <input type="checkbox" value={roomNumber._id}
                                        onChange={handleSelect}
                                        disabled={!isAvailable(roomNumber)}/>
                                </b>
                            </div>
                            
                        ))}  
                    </div>           
                </div>
                
            ))}

            <button onClick={handleClick} className="btn">Pay now!</button> 

        
        </div>
    </div>
  )
}

export default Reserve