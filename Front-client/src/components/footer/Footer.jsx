import './footer.scss'
import video from '../../assets/video.mp4'
import { IoIosSend } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import { SiYourtraveldottv } from "react-icons/si";
import { FiChevronRight } from "react-icons/fi";
import { FaSquareXTwitter } from "react-icons/fa6";
import { PiTiktokLogoFill } from "react-icons/pi";

const Footer = () => {

    useEffect(() => {
        Aos.init({ duration: 800 })
    }, [])

    return (
        <section className='footer'>
            <div className="videoDiv">
                <video src={video} muted autoPlay loop type='video/mp4'></video>
            </div>

            <div data-aos='fade-down' className="secContent container">
                <div className="contactDiv flex">
                    <div className="text">
                        <small>KEEP IN TOUCH</small>
                        <h2>Travel with us!</h2>
                    </div>

                    <div className="inputDiv flex">
                        <input type="text" placeholder="Your e-mail address" />
                        <button className='btn flex' type='submit'>
                            SEND <IoIosSend />
                        </button>
                    </div>
                </div>

                <div className="footerCard flex">
                    <div className="footerIntro flex">
                        <div className="logoDiv">
                            <a href="#" className="footerLogo flex">
                                <SiYourtraveldottv className='footerIcon' />
                                Travel!
                            </a>
                        </div>

                        <div className="footerParagraph">
                        Join us on this journey as we redefine the way you plan and experience life's moments. 
                        Embrace the freedom of choice, the ease of access, and the peace of mind that comes with
                         knowing your reservations are just a few clicks away. Welcome to a world where booking 
                         becomes a breeze, and every moment is within reach.
                        </div>

                        <div className="footerSocials flex">
                            FOLLOW US:
                            <FaFacebook className='footerIcon'/>
                            <FaYoutube className='footerIcon'/>
                            <FaInstagramSquare className='footerIcon'/>
                            <FaSquareXTwitter className='footerIcon'/>
                            <PiTiktokLogoFill  className='footerIcon' />
                        </div>
                    </div>

                    <div className="footerLinks grid">
                        {/* group 1 */}
                        <div className="linkGroup"> 
                            <span className="groupTitle">
                                OUR AGENCY
                            </span>

                            <li className="footerList flex">
                                <FiChevronRight className='footerIcon' />
                                Services
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className='footerIcon' />
                                Insurance
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className='footerIcon' />
                                Agency
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className='footerIcon' />
                                Tourism
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className='footerIcon' />
                                Payment
                            </li>
                        </div>

                        {/* group 2 */}
                        <div className="linkGroup"> 
                            <span className="groupTitle">
                                PARTNERS
                            </span>

                            <li className="footerList flex">
                                <FiChevronRight className='footerIcon' />
                                Bookings
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className='footerIcon' />
                                Rentcars
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className='footerIcon' />
                                HostelWorld
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className='footerIcon' />
                                Trivago
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className='footerIcon' />
                                TripAdvisor
                            </li>
                        </div>

                        {/* group 3 */}
                        <div className="linkGroup"> 
                            <span className="groupTitle">
                                LAST MINUTE
                            </span>

                            <li className="footerList flex">
                                <FiChevronRight className='footerIcon' />
                                Ha Noi
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className='footerIcon' />
                                Ho Chi Minh
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className='footerIcon' />
                                Da Nang
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className='footerIcon' />
                                Phu Quoc
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className='footerIcon' />
                                Sa Pa
                            </li>
                        </div>

                        {/* group 4 */}
                        <div className="linkGroup"> 
                            <span className="groupTitle">
                                MORE
                            </span>

                            <li className="footerList flex">
                                <FiChevronRight className='footerIcon' />
                                Sustainable Tourism
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className='footerIcon' />
                                Terms and condition
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className='footerIcon' />
                                Customer information security
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className='footerIcon' />
                                Shareholder relations
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className='footerIcon' />
                                How we operate
                            </li>
                        </div>
                    </div>

                    <div className="footerDiv flex">
                        <small>BEST TRAVEL - WEB - THEME</small>  
                        <small>COPYRIGHTS @ RESERVED - ISRATECH - 2024</small>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer