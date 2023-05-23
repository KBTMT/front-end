import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "react-modal";
// import "./Calendar.css"
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
// import 'react-calendar/dist/Calendar.css';
const Accountbook = () => {

    const [modal2IsOpen, setModal2IsOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [brand, setBrand] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [content, setContent] = useState('');
    const [consumptionCat, setConsumptionCat] = useState('');
    const [events, setEvents] = useState([]);
    
    useEffect(() => { 
        axios.get('http://localhost:8899/account-book')
            .then(response => {
                const modifiedData = response.data.map(item => ({
                    title: item.INCOME +"\n"+item.EXPENSE,
                    date: item.DATE2
                }));
                setEvents(modifiedData);
                alert(events[0].content);
            })
            .catch(error => console.log(error))
    }, []);

    const handleEventClick = (info) => {
        setBrand(info.event.title);
        setStartDate(info.event.date.toLocaleString());
        setContent(info.event.extendedProps.description);
        setModal2IsOpen(true);
    }

    const handleModalOpen = () => {
        setModalIsOpen(true);
    }

    const handleModalClose = () => {
        setModalIsOpen(false);
    }
    const handleModalClose2 = () => {
        setModal2IsOpen(false);
    }

    const handleModalSubmit = () => {
        const newEvent = {
            title: brand,
            start: startDate,
            end: endDate,
            description: content
        };

        setEvents([...events, newEvent]);
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
            <Modal isOpen={modal2IsOpen} onRequestClose={handleModalClose2} className="modal" overlayClassName="overlay">
                <h1>{brand}</h1>
                <p>{startDate}</p>
                <p>{endDate}</p>
                <p>{consumptionCat}</p>
                <p>{content}</p>
            </Modal>
            <button onClick={handleModalOpen}>Add Event</button>
            <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose} className="modal" overlayClassName="overlay">
                <h2>Add Event</h2>
                <form onSubmit={handleModalSubmit}>
                    <label className="form-label">
                        Title :
                        <input
                            type="text"
                            value={brand}
                            className="form-input"
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </label>
                    <label className="form-label">
                        Start Date :
                        <input
                            type="date"
                            value={startDate}
                            className="form-input"
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </label>
                    <label className="form-label">
                        End Date :
                        <input
                            type="date"
                            value={endDate}
                            className="form-input"
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </label>
                    <label className="form-label">
                        내용:
                        <input
                            type="text"
                            value={content}
                            className="form-input"
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </label>
                    <label className="form-label">
                        카테고리:
                        <input
                            type="text"
                            value={consumptionCat}
                            className="form-input"
                            onChange={(e) => setConsumptionCat(e.target.value)}
                        />
                    </label>
                    <button type="submit" className="form-button">Add</button>
                    <button onClick={handleModalClose} className="form-button">취소</button>
                </form>
            </Modal>

        </div>

    );
};

export default Accountbook;