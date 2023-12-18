import Features from "../../components/features/Features"
import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import "./home.css"
import PropertyList from "../../components/propertyList/PropertyList"
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties"
import MailList from "../../components/mailList/MailList"


const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <h1 className="homeTitle">Popular destination</h1>
        <Features />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList />
        <h1 className="homeTitle">Places guests love</h1>
        <FeaturedProperties />
        <MailList />
      </div>
    </div>
  )
}

export default Home