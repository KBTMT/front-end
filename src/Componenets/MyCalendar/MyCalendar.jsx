import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './MyCalendar.css';
import axios from 'axios';
import Modal from "react-modal";


const MyCalendar = () => {

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

  const [modal2IsOpen, setModal2IsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [brand, setBrand] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [discountContent, setDiscountContent] = useState('');
  const [consumptionCat, setConsumptionCat] = useState('');
  const [events, setEvents] = useState([]);

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
const handleModalClose2 = () => {
    setModal2IsOpen(false);
}

const handleModalSubmit = () => {
    const newEvent = {
        title: brand,
        start: startDate,
        end: endDate,
        description: discountContent,
    };

    setEvents([...events, newEvent]);
    axios.post('http://localhost:8899/discount-calendar/register', { brand, startDate, endDate, discountContent,consumptionCat })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
        setModalIsOpen(false);
}

  // const events = [
  //   {
  //     title: '스타벅스',
  //     start: '2023-05-19',
  //     end: '2023-05-25',
  //     description: '아메리카노 1+1',
  //     imageUrl: 'https://www.svgrepo.com/show/513511/star.svg',
  //     category: 1,
  //   },
  //   {
  //     title: '이벤트 2',
  //     start: '2023-05-21',
  //     end: '2023-05-22',
  //     description: '이벤트 내용',
  //     imageUrl: 'https://www.svgrepo.com/show/513511/star.svg',
  //     category: 2,
  //   },
  //   {
  //     title: '이벤트 3',
  //     start: '2023-05-24',
  //     end: '2023-05-28',
  //     description: '이벤트 내용',
  //     imageUrl: 'https://www.svgrepo.com/show/513511/star.svg',
  //     category: 3,
  //   },
  //   {
  //     title: '이벤트 4',
  //     start: '2023-05-29',
  //     end: '2023-05-30',
  //     description: '이벤트 내용',
  //     imageUrl: 'https://www.svgrepo.com/show/513511/star.svg',
  //     category: 4,
  //   },
  //   {
  //     title: '이벤트 5',
  //     start: '2023-05-1',
  //     end: '2023-05-2',
  //     description: '이벤트 내용',
  //     imageUrl: 'https://www.svgrepo.com/show/513511/star.svg',
  //     category: 5,
  //   },
  //   {
  //     title: '이벤트 6',
  //     start: '2023-05-11',
  //     end: '2023-05-12',
  //     description: '이벤트 내용',
  //     imageUrl: 'https://www.svgrepo.com/show/513511/star.svg',
  //     category: 6,
  //   },
  // ];

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

  return (
    <div className="App">
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={categorizedEvents}
        eventContent={renderEventContent}
      />
      <Modal isOpen={modal2IsOpen} onRequestClose={handleModalClose2} className="modal" overlayClassName="overlay">
                <h1>{brand}</h1>
                <p>{startDate}</p>
                <p>{endDate}</p>
                <p>{consumptionCat}</p>
                <p>{discountContent}</p>
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

export default MyCalendar;