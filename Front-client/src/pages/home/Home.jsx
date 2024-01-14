import video from '../../assets/video.mp4'
import Features from "../../components/features/Features"
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import "./home.scss"
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties"
import Footer from '../../components/footer/Footer'
import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'

const Home = () => {

  useEffect(() => {
    Aos.init({duration: 2000})
  }, [])

  return (
    <>
      <Navbar />
      <section className="home">
        
        <div className="overlay"> </div>

        <video src={video} muted autoPlay loop type='video/mp4'></video>

        <div className="homeContent container">
          <div data-aos='fade-up' className="textDiv">
            <span className="smallText">Enjoy every moment.</span>
            <h1 data-aos='fade-right' className="homeTitle">Search your holiday!</h1>
          </div>
        </div>
      </section>
      <Header />
      <Features />
      <FeaturedProperties />
      <Footer />
    </>
  )
}

export default Home