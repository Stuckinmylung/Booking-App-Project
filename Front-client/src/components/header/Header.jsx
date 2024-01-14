import { faLocationDot, faCalendarDays, faPerson } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./header.scss"
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from "react-date-range"
import {useContext, useState, useEffect} from 'react'
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import Aos from 'aos'
import 'aos/dist/aos.css'

const Header = () => {
  const [destination, setDestination] = useState('Ha Noi')

  const [openDate, setOpenDate] = useState(false);

  const today = new Date();
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    const startDate = new Date(today);
    const endDate = new Date(today.setDate(today.getDate() + 2));
    // eslint-disable-next-line
    const [dates, setDates] = useState([
        {
            startDate: startDate,
            endDate: endDate,
            key: 'selection'
        }
    ]);
  
  const [openOption, setOpenOption] = useState(false);
  
  const [option, setOption] = useState({
    adult: 1,
    children: 0,
    room: 1
  });

  const navigate = useNavigate()

  const handleOption = (name, operation) => {
    setOption((prev) => {
      return {
      ...prev, [name]: operation === "i" ? option[name] +1 : option[name] -1
    }});
  };

  const {dispatch} = useContext(SearchContext)

  const handleSearch = () => {
    dispatch({type:"NEW_SEARCH", payload:{destination, dates, option}})
    localStorage.setItem('dates', JSON.stringify(dates));
    localStorage.setItem('option', JSON.stringify(option));
    navigate("/hotels", { state: { destination, dates, option } })
  }

  useEffect(() => {
    Aos.init({duration: 3000})
  }, [])

  return (
    <div className="header">
      <div data-aos='fade-up' className="headerContainer">

        <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={ faLocationDot } className="headerIcon"/>
            <input type="text" 
                  placeholder="Where are you going?" 
                  className="headerSearchInput" 
                  onChange={ e => setDestination(e.target.value) } />
          </div>

          <div className="headerSearchItem">
            <FontAwesomeIcon icon={ faCalendarDays } className="headerIcon"/>
            <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">
              {`${format(dates[0].startDate, 'dd/MM/yyyy')} to
                ${format(dates[0].endDate, 'dd/MM/yyyy')}`}
            </span>
            {openDate && <DateRange
              editableDateInputs={true}
              onChange={item => setDates([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dates}
              className="date"
              minDate={ new Date() }
            />}
          </div>

          <div className="headerSearchItem">
            <FontAwesomeIcon icon={ faPerson } className="headerIcon"/>

            <span onClick={() => setOpenOption(!openOption)} 
                  className="headerSearchText">
              {`${option.adult} adult - ${option.children} children - ${option.room} room`}
            </span>

            {openOption && <div className="option">
              <div className="optionItem">
                <span className="optionText">Adult</span>
                <div className="optionCounter">
                  <button 
                    disabled = { option.adult <= 1 }
                    className="optionCounerButton" 
                    onClick={() => handleOption('adult', 'd')}> - </button>
                  <span className="optionCounterNumber">{ option.adult }</span>
                  <button 
                    className="optionCounerButton" 
                    onClick={() => handleOption('adult', 'i')}> + </button>
                </div>
              </div>

              <div className="optionItem">
                <span className="optionText">Children</span>
                <div className="optionCounter">
                  <button 
                    disabled = { option.children <= 0 }
                    className="optionCounerButton" 
                    onClick={() => handleOption('children', 'd')}> - </button>
                  <span className="optionCounterNumber">{ option.children }</span>
                  <button 
                    className="optionCounerButton" 
                    onClick={() => handleOption('children', 'i')}> + </button>
                </div>
              </div>

              <div className="optionItem">
                <span className="optionText">Room</span>
                <div className="optionCounter">
                  <button 
                    disabled = { option.room <= 1 }
                    className="optionCounerButton" 
                    onClick={() => handleOption('room', 'd')}> - </button>
                  <span className="optionCounterNumber">{ option.room }</span>
                  <button 
                    className="optionCounerButton" 
                    onClick={() => handleOption('room', 'i')}> + </button>
                </div>
              </div>
            </div>}
          </div>

          <div className="headerSearchItem">
            <button className="btn flex" onClick={ handleSearch }>Search</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Header