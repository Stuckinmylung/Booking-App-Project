import './hotel.css'
import Navbar from "../../components/navbar/Navbar"
import MailList from "../../components/mailList/MailList"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import Reserve from '../../components/reserve/Reserve'


const Hotel = () => {

  const location = useLocation()
  const id = location.pathname.split("/")[2]

  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)


  const {data, loading, error} = useFetch(`/hotels/find/${id}`)
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  const {dates, option} = useContext(SearchContext)

  const MILLISECONDS_PER_DAY = 1000*60*60*24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (index) => {
    setSlideNumber(index);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSliderNumber;
    if (direction==='R') {
      newSliderNumber = slideNumber === 5 ? 0 : slideNumber+1
    } else {
      newSliderNumber = slideNumber === 0 ? 5 : slideNumber-1
    }

    setSlideNumber(newSliderNumber);
  };

  const handleClick = () => {
    if(user) {
      setOpenModal(true)
    } else {
      navigate('/login')
    }
  }

  return (
    <div>
      <Navbar />
      {loading ? "please wait" : 
      <div className="hotelContainer">
        {open && <div className="slider">
          <FontAwesomeIcon icon={ faCircleXmark } className='close'
          onClick={ () => setOpen(false) }/>

          <FontAwesomeIcon icon={ faCircleArrowLeft } className='arrow' 
            onClick={ () => handleMove('L') }/>
          <div className="sliderWrapper">
            <img src={ data.photos[slideNumber] } alt="" className="sliderImg" />
          </div>
          <FontAwesomeIcon icon={ faCircleArrowRight } className='arrow'
            onClick={ () => handleMove('R') }/>

        </div>}
        <div className="hotelWrapper">
          <button className='bookNow'>Reserve or Book now!</button>
          <h1 className="hotelTitle"> {data.name} </h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={ faLocationDot }/>
            <span> {data.address} </span>
          </div>
          <span className='hotelDistance'>Good location - {data.distance} m from center</span>
          <span className="hotelPriceHighLight">
            Book a stay over ${data.cheapestPrice} and get a free airport taxi!
          </span>
          <div className="hotelImages">
            {data.photos?.map((photo, index) => (
              <div className="hotelImgWrapper" key={index}>
                <img onClick={ () => handleOpen(index) } src={ photo } height={210} width={300} alt="" className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle"> {data.title} </h1>
              <p className="hotelDesc"> {data.desc} </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located near the heart of the city, this property has
                an good location score of 9.0!
              </span>
              <h2> <b>${days * data.cheapestPrice}</b> ({days} nights) </h2>
              <button onClick={handleClick}>Reserve or Book now!</button>
            </div>
          </div>
        </div>
        <MailList />
      </div>}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  )
}

export default Hotel