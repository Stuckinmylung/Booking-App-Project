import "./navbar.scss";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SiYourtraveldottv } from "react-icons/si";
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useLogout } from '../../hooks/useLogout'

const Navbar = () => {
  useEffect(() => {
    Aos.init({duration: 3000})
  }, [])

  const { user } = useContext(AuthContext);

  const navigate = useNavigate()
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
    navigate('/')
  }

  return (
    <section className="navbarSection">
      <header data-aos='fade-up' className="navHeader flex">

        <div className="logoDiv">
          <a href="/" className="logo flex">
            <h1 className="logo flex"> 
              <SiYourtraveldottv className='icon'/>  
              Travel!
            </h1>
          </a>
        </div>

        {user ? (
          (
            <div className="navbar">
              <span>{user.username}</span>
              <Link onClick={ handleClick } className="btn">
                Logout
              </Link>
            </div>
          )
        ) : (
          <div className="navbar">
            <div className="navItems flex">
              <button className="btn"> 
                  <a href="/register">Register</a>
              </button>

              <button className="btn"> 
                <a href="/login">Login</a>
              </button>
            </div>
          </div>
        )}

      </header>
    </section>
  );
};

export default Navbar;