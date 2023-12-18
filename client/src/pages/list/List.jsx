import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import './list.css'
import { useLocation } from 'react-router-dom'
import { format } from "date-fns";
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from '../../hooks/useFetch'

const List = () => {

  const location = useLocation()
  const [destination, setDestination] = useState(location.state.destination)
  const [dates, setDates] = useState(location.state.dates)
  const [openDate, setOpenDate] = useState(false)
  const [option, setOption] = useState(location.state.option)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)


  const {data, loading, error, reFetch} = useFetch(
    `/hotels?city=${destination}&min=${min || 1}&max=${max || 999}`
  )

  const handleClick = () => {
    reFetch();
  }

  return (
    <div>
      <Navbar />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            
            <div className="lsItem">
              <label htmlFor="">Destination</label>
              <input placeholder={ destination } type="text" />
            </div>

            <div className="lsItem">
              <label htmlFor="">Check-in Date</label>
              <span onClick={ () => setOpenDate(!openDate) }> 
                {`${format(dates[0].startDate, 'dd/MM/yyyy')} to
                  ${format(dates[0].endDate, 'dd/MM/yyyy')}`} 
              </span>
              {openDate && 
              <DateRange 
                onChange={ item => setDates([item.selection])} 
                                   minDate={ new Date() }
                                   ranges={dates}
              />}
            </div>
            <div className="lsItem">
              <label htmlFor="">Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">Min price <small>/night</small> </span>
                  <input type="number" 
                         onChange={e => setMin(e.target.value)} 
                         className="lsOptionInput" />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Max price <small>/night</small> </span>
                  <input type="number" 
                         onChange={e => setMax(e.target.value)}
                         className="lsOptionInput" />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Adults</span>
                  <input type="number" min={1} className="lsOptionInput" placeholder={ option.adult }/>
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input type="number" min={0} className="lsOptionInput" placeholder={ option.children }/>
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input type="number" min={1} className="lsOptionInput" placeholder={ option.room }/>
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>

          <div className="listResult">
            {loading ? 'LOADING' : <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id}/>
                ))}
            </>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List