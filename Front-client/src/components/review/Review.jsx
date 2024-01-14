import './review.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaStar } from "react-icons/fa";
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoIosSend } from "react-icons/io";

const Review = ({ hotelId }) => {

    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviews, setReviews] = useState([]);

    const handleReviewSubmit = async () => {
        try {
            const reviewResponse = await axios.post(
                `/reviews/${hotelId}`,
                {
                    message,
                    rating
                }
            );

            if (reviewResponse.status >= 200 && reviewResponse.status < 300) {
                const updatedReviews = Array.isArray(reviewResponse.data) ? reviewResponse.data : [];
                setReviews(updatedReviews);
                setMessage('');
                setRating(0);
                fetchReviewsData();
            } else {
                console.error('Failed to submit review:', reviewResponse.statusText);
            }
        } catch (error) {
            console.error('Error submitting review:', error.message);
        }
    };

    const fetchReviewsData = async () => {
        try {
            const response = await axios.get(`/reviews/${hotelId}`);
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
    }, [hotelId]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: Math.min(3, reviews.length),
        slidesToScroll: Math.min(3, reviews.length),
    };

    return (
        <div className="hotelReviews">

            <div className="showContainer">
                <h1>Guest Reviews</h1>

                {Array.isArray(reviews) ? (
                    <div className="showReview">
                        <Slider {...settings} className='slider'>
                            {reviews.map((reviewItem) => (
                                <div className='singleReview' key={reviewItem._id}>
                                    <p className="rating">
                                        {[...Array(reviewItem.rating ? reviewItem.rating : 5)].map((_, star) => (
                                            <span key={star} className="star"><FaStar /></span>
                                        ))}
                                    </p>
                                    <p className='message'>{reviewItem.message}</p>
                                </div>
                            ))}
                        </Slider>
                    </div>
                ) : (
                    <></>
                )}

            </div>

            <div className="addContainer">

                <h1>Share us your experience!</h1>

                <div className="addReview flex">

                    <textarea
                        placeholder="Tell us your story..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>

                    <div className="addWrapper grid">
                        <div className="ratingSelect">

                            <span className='text'>Your rating:</span>

                            <div className="star-rating">
                                {[...Array(5)].map((star, index) => {
                                    index += 1;
                                    return (
                                        <button
                                            type="button"
                                            key={index}
                                            className={index <= ((rating && hover) || hover) ? "on" : "off"}
                                            onClick={() => setRating(index)}
                                            onMouseEnter={() => setHover(index)}
                                            onMouseLeave={() => setHover(rating)}
                                        >
                                            <span className="star"><FaStar /></span>
                                        </button>
                                    );
                                })}
                            </div>

                        </div>

                        <button className='btn' onClick={handleReviewSubmit} >Share <IoIosSend /></button>

                    </div>

                </div>

            </div>

        </div >
    )
}

export default Review