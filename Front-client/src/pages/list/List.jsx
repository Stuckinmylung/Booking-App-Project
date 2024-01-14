import React, { useContext, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./list.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { DateRange } from "react-date-range";
import video from "../../assets/video.mp4";
import Footer from "../../components/footer/Footer";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [option, setOption] = useState(location.state.option);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const datesArray = Object.values(dates).map((dateObj) => [
    dateObj.startDate,
    dateObj.endDate,
  ]);
  const date = datesArray.flat();
  const options = Object.values(option);

  const { data, loading, error } = useFetch(
    `/hotels/search?city=${destination}&min=${min - 1 || 1}&max=${
      max + 1 || 999
    }&dates=${date}&options=${options}`
  );

  const navigate = useNavigate();
  const { dispatch } = useContext(SearchContext);
  const handleOption = (name, operation) => {
    setOption((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? option[name] + 1 : option[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, option } });
    localStorage.setItem("dates", JSON.stringify(dates));
    localStorage.setItem("option", JSON.stringify(option));
    navigate("/hotels", { state: { destination, dates, option } });
  };

  return (
    <>
      <Navbar />
      <section className="list">
        <div className="listContent container">
          <div className="listWrapper flex">
            <div className="listSearch grid">
              <video src={video} muted autoPlay loop type="video/mp4"></video>
              <h1 className="listTitle"> SEARCH </h1>
              <div className="listsItem">
                <label htmlFor="">Destination</label>
                <input
                  placeholder={destination}
                  type="text"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="listsItem">
                <label htmlFor="">Check-in Date</label>
                <span
                  className="dateSearch"
                  onClick={() => setOpenDate(!openDate)}
                >
                  {`${format(dates[0].startDate, "dd/MM/yyyy")} to
                    ${format(dates[0].endDate, "dd/MM/yyyy")}`}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    minDate={new Date()}
                    className="dateRange"
                  />
                )}
              </div>
              <div className="listsItem">
                <label htmlFor="">Options</label>
                <div className="lsOptions">
                  <div className="lsOptionItem flex">
                    <span className="lsOptionText">
                      Min price <small>/night</small>{" "}
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMin(e.target.value)}
                      className="lsOptionInput"
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">
                      Max price <small>/night</small>{" "}
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMax(e.target.value)}
                      className="lsOptionInput"
                    />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Adult</span>
                    <div className="optionCounter">
                      <button
                        disabled={option.adult <= 1}
                        className="optionCounerButton"
                        onClick={() => handleOption("adult", "d")}
                      >
                        {" "}
                        -{" "}
                      </button>
                      <span className="optionCounterNumber">
                        {option.adult}
                      </span>
                      <button
                        className="optionCounerButton"
                        onClick={() => handleOption("adult", "i")}
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Children</span>
                    <div className="optionCounter">
                      <button
                        disabled={option.children <= 0}
                        className="optionCounerButton"
                        onClick={() => handleOption("children", "d")}
                      >
                        {" "}
                        -{" "}
                      </button>
                      <span className="optionCounterNumber">
                        {option.children}
                      </span>
                      <button
                        className="optionCounerButton"
                        onClick={() => handleOption("children", "i")}
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Room</span>
                    <div className="optionCounter">
                      <button
                        disabled={option.room <= 1}
                        className="optionCounerButton"
                        onClick={() => handleOption("room", "d")}
                      >
                        {" "}
                        -{" "}
                      </button>
                      <span className="optionCounterNumber">{option.room}</span>
                      <button
                        className="optionCounerButton"
                        onClick={() => handleOption("room", "i")}
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn" onClick={handleSearch}>
                SEARCH
              </button>
            </div>

            <div className="listResult">
              {loading ? (
                "FINDING YOUR HOTEL, PLEASE WAIT =))"
              ) : (
                <>
                  {data.map((item) => (
                    <SearchItem item={item.hotel} key={item.hotel._id} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default List;
