import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "react-modal";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const Accountbook = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => { 
    axios.get('http://localhost:8899/account-book')
      .then(response => {
        const modifiedData = response.data.map(item => ({
          title: `수입: ${item.INCOME}`,
          start: item.DATE2,
          backgroundColor: '#2E9AFE' // 수입 이벤트의 배경 색상
        })).filter(item => item.title !== '수입: 0'); // 수입이 0인 이벤트 필터링

        const modifiedExpenseData = response.data.map(item => ({
          title: `지출: ${item.EXPENSE}`,
          start: item.DATE2,
          backgroundColor: '#FC7E7E' // 지출 이벤트의 배경 색상
        })).filter(item => item.title !== '지출: 0'); // 지출이 0인 이벤트 필터링

        setEvents([...modifiedData, ...modifiedExpenseData]);
      })
      .catch(error => console.log(error))
  }, []);

  return (
    <div>
      <h2>내 가계부</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
};

export default Accountbook;
