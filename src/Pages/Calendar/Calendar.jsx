import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "react-modal";
import "./Calendar.css"

// import { C } from "@fullcalendar/core/internal-common";

const Calendar = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [eventTitle, setEventTitle] = useState('');
    const [eventStartDate, setEventStartDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventCategory, setEventCategory] = useState('');
    const [events, setEvents] = useState([

        {title : 'event1', start: "2023-05-15", end : "2023-05-17", description : "hi~~~", category:"cat"},
        {title : 'event2', start: "2023-05-17", end : "2023-05-20", description : "hi~~my name is soomin~", category:"cat"}
     
    ]);

    const handleEventClick = (info) => {
        console.log(info.event)
    }

    const handleModalOpen = () => {
        setModalIsOpen(true);
    }

    const handleModalClose = () => {
        setModalIsOpen(false);
    }

    const handleModalSubmit = () => {
        const newEvent = {
            title : eventTitle,
            start : eventStartDate,
            end : eventEndDate,
            description : eventDescription,
            category : eventCategory
        };
 
        setEvents([... events, newEvent]);

        setModalIsOpen(false);
       
    }

    return(
        <div>
            <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={handleEventClick}
            />
            <button onClick={handleModalOpen}> Add Event</button>
            <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose} className="modal" overlayClassName="overlay">
                <h2>Add Event</h2>
                <form onSubmit={handleModalSubmit}>
                    <label className="form-label"> 
                        Title : 
                        <input 
                            type="text" 
                            value={eventTitle} 
                            className="form-input"
                            onChange={(e) => setEventTitle(e.target.value)}
                        />
                    </label>
                    <label className="form-label">
                        Start Date :
                        <input
                            type="date"
                            value={eventStartDate}
                            className="form-input"
                            onChange={(e) => setEventStartDate(e.target.value)}
                        />
                    </label>
                    <label className="form-label">
                        End Date :
                        <input
                            type="date"
                            value={eventEndDate}
                            className="form-input"
                            onChange={(e) => setEventEndDate(e.target.value)}
                        />
                    </label>
                    <label className="form-label">
                        내용:
                        <input
                        type="text"
                        value={eventDescription}
                        className="form-input"
                        onChange={(e) => setEventDescription(e.target.value)}
                        />
                        </label>
                    <label className="form-label">
                        카테고리:
                        <input
                        type="text"
                        value={eventCategory}
                        className="form-input"
                        onChange={(e) => setEventCategory(e.target.value)}
                        />
                    </label>
                    <button type="submit" className="form-button">Add</button>
                    <button onClick={handleModalClose} className="form-button">취소</button>
                    </form>
            </Modal>

        </div>
        
    );
};

export default Calendar;