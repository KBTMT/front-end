import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './AccountCalendar.css';
import axios from 'axios';
import Modal from "react-modal";

Modal.setAppElement('#root');

const AccountCalendar = () => {

  const renderEventContent = (eventInfo) => {
    return (
      <div
        className="event"
        style={{ backgroundColor: categoryColors[eventInfo.event.extendedProps.category] }}
      >
        {eventInfo.event.extendedProps.imageUrl && (
          <img
            src={eventInfo.event.extendedProps.imageUrl}
            alt="Event"
            className="event-image"
          />
        )}
        <div className="event-details">
          <div className="event-title">{eventInfo.event.title}</div>
          <div className="event-description">
            {eventInfo.event.extendedProps.description}
          </div>
        </div>
      </div>
    );
  };

  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modal2IsOpen, setModal2IsOpen] = useState(false);
  const [modal3IsOpen, setModal3IsOpen] = useState(false);

  const [brand, setBrand] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [discountContent, setDiscountContent] = useState('');
  const [consumptionCat, setConsumptionCat] = useState('');
  const [events, setEvents] = useState([]);
  //const [eventDetails, setEventDetails] = useState(null);

  const [updatedBrand, setUpdatedBrand] = useState('');
  const [updatedStartDate, setUpdatedStartDate] = useState('');
  const [updatedEndDate, setUpdatedEndDate] = useState('');
  const [updatedDiscountContent, setUpdatedDiscountContent] = useState('');

  useEffect(() => { 
    axios.get('http://localhost:8899/discount-calendar')
        .then(response => {
            const modifiedData = response.data.map(item => ({
              title: item.brand,
              start: item.startDate,
              end: item.endDate,
              description: item.discountContent,
              category: item.consumptionCat
            }));
            setEvents(modifiedData);
            //alert(events[0].content);
        })
        .catch(error => console.log(error))
  }, []);

const handleModalOpen = () => {
    setModalIsOpen(true);
    setBrand('');
    setStartDate('');
    setEndDate('');
    setDiscountContent('');
    setConsumptionCat('');
}

const handleModalClose = () => {
  setModalIsOpen(false);
}

const handleModal2Close = () => {
    setModal2IsOpen(false);
}

const handleModal3Open = () => {

  setUpdatedBrand(brand);
  setUpdatedStartDate(startDate);
  setUpdatedEndDate(endDate);
  setUpdatedDiscountContent(discountContent);
  setModal3IsOpen(true);
};

const handleModal3Close = () => {
  setModal3IsOpen(false);
};

const handleModalSubmit = () => {
    const newEvent = {
        title: brand,
        start: startDate,
        end: endDate,
        category : consumptionCat,
        description: discountContent,
    };

    setEvents([...events, newEvent]);
    axios.post('http://localhost:8899/discount-calendar/register', { brand, startDate, endDate, discountContent,consumptionCat })
            .then(response => {
                console.log(response);
                console.log(startDate)
            })
            .catch(error => {
                console.error(error);
            });
        setModalIsOpen(false);
}


const handleModal3Submit = () => {
  setBrand(updatedBrand);
  setStartDate(updatedStartDate);
  setEndDate(updatedEndDate);
  setDiscountContent(updatedDiscountContent);


  setModal3IsOpen(false); // Close the edit modal after submission
};
  const categoryColors = {
    1: '#C7A7E8', // 카테고리 1에 대한 색상
    2: '#FF7F50', // 카테고리 2에 대한 색상
    3: '#98FB98',
    4: '#40E0D0',
    5: '#FD5E53',
    6: '#AED6F',
    7: '#FFDAB9',
    8: '#BEBEBE',
  };

  const categorizedEvents = events.map((event) => ({
    ...event,
    backgroundColor: categoryColors[event.category],
  }));


  const handleEventClick = (info) => {
    const { description, category} = info.event.extendedProps;
    const {title , start, end } = info.event;
    setBrand(title);
    console.log(start);
    setStartDate(start.toLocaleDateString());
    setEndDate(end.toLocaleDateString());
    console.log(description);
    setDiscountContent(description);
    setConsumptionCat(category);
    setModal2IsOpen(true);

    
  };

  return (
    <div className="App">
      <FullCalendar
        initialView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={categorizedEvents}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
      />
      
      <Modal isOpen={modal2IsOpen} onRequestClose={handleModal2Close} className="modal" overlayClassName="overlay">
                <h2>브랜드</h2><h1>{brand}</h1>
                <p> 시작일자 : {startDate}</p>
                <p> 종료일자 : {endDate}</p>
                <p> 카테고리 : {consumptionCat}</p>
                <p>내용 : {discountContent}</p>
                <button onClick={handleModal3Open}>수정하기</button>
                <Modal isOpen={modal3IsOpen} onRequestClose={handleModal3Close} className="modal" overlayClassName="overlay">
                <label className="form-label-calendar">
                  브랜드 :
                  <input
                    type="text"
                    value={updatedBrand}
                    className="form-input"
                    onChange={(e) => setUpdatedBrand(e.target.value)}
                  />
                </label>
                <br />
                <label className="form-label-calendar">
                  시작 날짜 :
                  <input
                    type="date"
                    value={updatedStartDate}
                    className="form-input"
                    onChange={(e) => setUpdatedStartDate(e.target.value)}
                  />
                </label>
                <br />
                <label className="form-label-calendar">
                  끝나는 날짜 :
                  <input
                    type="date"
                    value={updatedEndDate}
                    className="form-input"
                    onChange={(e) => setUpdatedEndDate(e.target.value)}
                  />
                </label>
                <br />
                <label className="form-label-calendar">
                  내용:
                  <input
                    type="textarea"
                    value={updatedDiscountContent}
                    className="form-input textarea"
                    onChange={(e) => setUpdatedDiscountContent(e.target.value)}
                    style={{ height: '150px', width: '300px' }}
                  />
                </label>
                <br />
                <button onClick={handleModal3Submit}>수정 완료</button>
                <button onClick={handleModal3Close}>취소하기</button>
                </Modal>
      </Modal>
      <button onClick={handleModalOpen} className="add-btn">할인 내역 등록</button>
      <Modal isOpen={modalIsOpen} onRequestClose={handleModalClose} className="modal" overlayClassName="overlay">
                <h2  style={{ textAlign: 'center' }} >할인 내역을 입력하세요 😊</h2>
                <form className='modal-form' onSubmit={handleModalSubmit}>
                    <label className="form-label-calendar">
                            카테고리:
                            <select
                                value={consumptionCat}
                                className="form-input"
                                onChange={(e) => setConsumptionCat(e.target.value)}
                            >
                              <option value="0">없음</option>
                              <option value="1">식비</option>
                              <option value="2">주거비</option>
                              <option value="3">교통비</option>
                              <option value="4">의료/건강</option>
                              <option value="5">생활용품</option>
                              <option value="6">여가/문화</option>
                              <option value="7">패션/미용</option>
                              <option value="8">기타</option>
                            </select>
                    </label>
                    <br></br>
                    <label className="form-label-calendar">
                        브랜드 :
                        <input
                            type="text"
                            value={brand}
                            className="form-input"
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </label>
                    <br></br>
                    <label className="form-label-calendar">
                        시작 날짜 :
                        <input
                            type="date"
                            value={startDate}
                            className="form-input"
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </label>
                    <br></br>
                    <label className="form-label-calendar">
                        끝나는 날짜 :
                        <input
                            type="date"
                            value={endDate}
                            className="form-input"
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </label>
                    <br></br>
                    <label className="form-label-calendar">
                        내용:
                        <input
                            type="textarea"
                            value={discountContent}
                            className="form-input textarea"
                            onChange={(e) => setDiscountContent(e.target.value)}
                            style={{height : '150px', width : '300px' }}
                        />
                    </label>
                    <br></br>
                    
                    <div className='form-buttons'>
                      <button type="submit" className="form-button">등록하기</button>
                      <button onClick={handleModalClose} className="form-button">취소하기</button>
                    </div>
                    
                </form>
            </Modal>

            
    </div>
  );
};

export default AccountCalendar;