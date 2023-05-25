import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import styled from "styled-components";
import { Calendar } from "@fullcalendar/core";



const MiniAccountbook = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState([]);
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
      // 데이터 처리 로직

      const modifiedData = response.data.map(item => ({
        title: `${item.INCOME}`,
        start: item.DATE2,
        backgroundColor: 'rgba(46, 154, 254, 0.8)'  // 수입 이벤트의 배경 색상
      })).filter(item => item.title !== '0'); // 수입이 0인 이벤트 필터링

      const modifiedExpenseData = response.data.map(item => ({
        title: `${item.EXPENSE}`,
        start: item.DATE2,
        backgroundColor: 'rgba(252, 126, 126, 0.8)' // 지출 이벤트의 배경 색상
      })).filter(item => item.title !== '0'); // 지출이 0인 이벤트 필터링

      setEvents([...modifiedData, ...modifiedExpenseData]);
      
    } catch (error) {
      console.log(error);
    }
  };


  const handleEventClick = (eventinfo) => {
    const clickedDate = eventinfo.event.start;
    console.log("clickedDate : " + clickedDate);
    const nextDay = new Date(clickedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const formattedDate = nextDay.toISOString().substring(0, 10);
    navigate(`/accountbook/${formattedDate}`);

  }

  return (
    <div>
        <div className="miniAccountBook-container">
            <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                start : "",
                center:"title",
                right : ""
            }}
            // footerToolbar={{
            //     center : "prev,next"
            // }}
            titleFormat={{ year: 'numeric', month: 'short'}}
            events={events}
            eventClick={handleEventClick}
            height="500px"
            width = "450px"
        />

        </div>
      
    </div>
  );
};

export default MiniAccountbook;
