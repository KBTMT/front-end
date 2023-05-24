import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "react-modal";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const Accountbook = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => { 
    axios.get('http://localhost:8899/account-book')
      .then(response => {
        const modifiedData = response.data.map(item => ({
          title: `수입: ${item.INCOME}`,
          start: item.DATE2,
          backgroundColor: 'rgba(46, 154, 254, 0.8)'  // 수입 이벤트의 배경 색상
        })).filter(item => item.title !== '수입: 0'); // 수입이 0인 이벤트 필터링

        const modifiedExpenseData = response.data.map(item => ({
          title: `지출: ${item.EXPENSE}`,
          start: item.DATE2,
          backgroundColor: 'rgba(252, 126, 126, 0.8)' // 지출 이벤트의 배경 색상
        })).filter(item => item.title !== '지출: 0'); // 지출이 0인 이벤트 필터링

        setEvents([...modifiedData, ...modifiedExpenseData]);
      })
      .catch(error => console.log(error))
  }, []);

  const handleEventClick = (eventinfo) => {
    const clickedDate = eventinfo.event.start;
    console.log(clickedDate);
    const nextDay = new Date(clickedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const formattedDate = nextDay.toISOString().substring(0, 10);

    navigate(`/accountbook/details/${formattedDate}`);

  }

  return (
    <div>
      <h2>내 가계부</h2>
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
