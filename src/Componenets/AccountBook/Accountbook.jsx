import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "react-modal";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const Accountbook = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState([]);
  // const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const userFromSession = JSON.parse(sessionStorage.getItem('vo'));
    if (userFromSession) {
      setUser(userFromSession);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [user]);


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8899/account-book', {
        params: {
          generalId: user.generalId
        }
      });
      const data = response.data;
      // console.log(data);
      const modifiedData = response.data.map(item => ({
        title: `수입: ${item.INCOME}`,
        start: item.DATE2,
        backgroundColor: 'rgba(46, 154, 254, 0.8)'  
      })).filter(item => item.title !== '수입: 0'); 
      const modifiedExpenseData = response.data.map(item => ({
        title: `지출: ${item.EXPENSE}`,
        start: item.DATE2,
        backgroundColor: 'rgba(252, 126, 126, 0.8)' 
      })).filter(item => item.title !== '지출: 0');
      setEvents([...modifiedData, ...modifiedExpenseData]);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleEventClick = (eventinfo) => {
    const clickedDate = eventinfo.event.start;
    console.log("clickedDate1123 : " + clickedDate);
    const nextDay = new Date(clickedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const formattedDate = nextDay.toISOString().substring(0, 10);

    navigate(`/accountbook/${formattedDate}`);
  }

  return (
    <div className="AccountBook_container" style={{ width : '1000px'}}>
      {/* <h2>티끌 기록이</h2>
      <h3>{user.generalId}</h3>  */}
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default Accountbook;
