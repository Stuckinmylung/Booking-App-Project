import './hotel.scss'
import Navbar from "../../components/navbar/Navbar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import Reserve from '../../components/reserve/Reserve'
import Footer from '../../components/footer/Footer'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import axios from 'axios'


const Hotel = () => {


  useEffect(() => {
    Aos.init({ duration: 1500 })
  }, [])


  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  const location = useLocation()
  const id = location.pathname.split("/")[2]

  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)


  const { data, loading, error } = useFetch(`/hotels/find/${id}`)
  const { user } = useContext(AuthContext)

  const navigate = useNavigate()

  const { dates, option } = useContext(SearchContext)

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
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
    if (direction === 'R') {
      newSliderNumber = slideNumber === 20 ? 0 : slideNumber + 1
    } else {
      newSliderNumber = slideNumber === 0 ? 20 : slideNumber - 1
    }

    setSlideNumber(newSliderNumber);
  };

  const handleClick = () => {
    if (user && user.userId) {
      setOpenModal(true)
    } else {
      navigate('/login')
    }
  }


  const handleReviewSubmit = async () => {
    try {
      console.log('Review Data:', { message, rating, userId: user.userId });

      const reviewResponse = await axios.post(
        `/reviews/${id}`,
        {
          message,
          rating,

        }
      );

      if (reviewResponse.status >= 200 && reviewResponse.status < 300) {
        // Ensure that reviews is an array before updating
        const updatedReviews = Array.isArray(reviewResponse.data) ? reviewResponse.data : [];
        setReviews(updatedReviews);

        // Thực hiện các bước lưu trữ nhận xét và rating ở đây
        setMessage('');
        setRating(0);
      } else {
        // Xử lý lỗi từ server nếu cần
        console.error('Failed to submit review:', reviewResponse.statusText);
      }
    } catch (error) {
      // Xử lý lỗi của Axios
      console.error('Error submitting review:', error.message);
    }
  };



 const fetchReviewsData = async () => {
  try {
    const response = await axios.get(`/reviews/${id}`);
    if (response.status >= 200 && response.status < 300) {
      const fetchedReviews = response.data;
      setReviews(fetchedReviews);
    } else {
      console.error('Failed to fetch reviews:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
  }
};

useEffect(() => {
  fetchReviewsData();
}, [id]);


  return (
    <>
      <Navbar />
      {loading ? 'PLEASE WAIT' :
        <section className="hotel">

          <div className="hotelContent container">

            {/* image slider */}
            {open &&
              <div className="slider">

                <div className="sliderWrapper">

                  <FontAwesomeIcon icon={faCircleXmark}
                    className='close'
                    onClick={() => setOpen(false)}
                  />

                  <FontAwesomeIcon icon={faCircleArrowLeft}
                    className='arrow'
                    onClick={() => handleMove('L')}
                  />

                  <img src={data.photos[slideNumber]} alt="" className="sliderImg" />

                  <FontAwesomeIcon icon={faCircleArrowRight}
                    className='arrow'
                    onClick={() => handleMove('R')}
                  />

                </div>

              </div>
            }

            <div className="hotelWrapper">

              <div data-aos='fade-up' className="hotelHead">

                <h1 className="hotelTitle"> {data.name} </h1>

                <div className="hotelAddress">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span> {data.address} </span>
                </div>

                <span className='hotelDistance'>Good location - {data.distance} m from center</span>

                <span className="hotelPriceHighLight">
                  Book a stay over ${data.cheapestPrice} and get a free airport taxi!
                </span>

              </div>

              <div data-aos='fade-right' className="hotelImages">

                <div className="imageContainer">

                  {data.photos?.slice(0, 4).map((photo, index) => (

                    <div className="hotelImgWrapper" key={index}>

                      <img onClick={() => handleOpen(index)} src={photo} alt="" className="hotelImg" />

                      {index === 3 && data.photos.length > 4 && (
                        <div className="overlay">+{data.photos.length - 4} ảnh khác</div>
                      )}

                    </div>

                  ))}

                </div>

              </div>

              <div className="hotelDetails">

                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle"> {data.title} </h1>
                  <p className="hotelDesc"> {data.desc} </p>
                  <div className="hotelReview">
                    <textarea
                      placeholder="Add a review..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <div className="ratingContainer">
                      <span>Your rating:</span>
                      <select value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value={0}>Select rating</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                    </div>
                    <button onClick={handleReviewSubmit}>Submit Review</button>
                  </div>

                  {Array.isArray(reviews) ? (
                    <div className="hotelReview">
                      <h2>Guest Reviews</h2>
                      {reviews.map((reviewItem) => (
                        <div key={reviewItem._id}>
                          <p>{reviewItem.message}</p>
                          <p>Rating: {reviewItem.rating}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No reviews available.</p>
                  )}


                  <div className="hotelDetailsPrice">

                    <h1>Perfect for a {days}-night stay!</h1>

                    <span>
                      Located near the heart of the city, this property has
                      an good location score of 9.0!
                    </span>

                    <span className="type"> type: {data.type}</span>

                    <h2> <b>${days * data.cheapestPrice * option.room}</b>
                      ({days} nights, {option.room} room)
                    </h2>

                    <button className='btn' onClick={handleClick}>Reserve or Book now!</button>

                  </div>

                </div>

              </div>

            </div>
          </div>

        </section>
      }

      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}

      <Footer />

    </>
  )
}

export default Hotel