
import React, { useState, useEffect } from "react";
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import axios from 'axios';

const Widget = ({ type }) => {
  const [amountUser, setamountUser] = useState(0);
  const [amountOrder, setAmountOrder] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [diff, setDiff] = useState(0);

  const fetchData = async () => {
    try {
      // Replace this URL with your API endpoint
      const data_user = await axios.get("/users/");
      const data_order = await axios.get("/payments/");
      const amounts = data_order.data.map(item => item?.amount);
      const sumAmount = amounts.reduce((acc, val) => acc + (val || 0), 0);

      
      // Assuming your API response has 'amount' and 'diff' properties
      setamountUser(data_user.data.length);
      setAmountOrder(data_order.data.length)
      setTotalAmount(sumAmount);
      setDiff(data.diff);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Set up interval to fetch data every 12 hours
    const intervalId = setInterval(fetchData, 12 * 60 * 60 * 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  let data;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        amount: amountUser,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        amount: amountOrder,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        amount: totalAmount,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        {data && (
          <>
            <span className="title">{data.title}</span>
            <span className="counter">
              {data.isMoney && "$"} {data.amount}
            </span>
            <span className="link">{data.link}</span>
          </>
        )}
      </div>
      <div className="right">
        {data && (
          <>
            <div className="percentage positive">
              <KeyboardArrowUpIcon />
              {diff} %
            </div>
            {data.icon}
          </>
        )}
      </div>
    </div>
  );
};

export default Widget;
