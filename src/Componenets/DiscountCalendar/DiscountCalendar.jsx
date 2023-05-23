import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './DiscountCalendar.css';
import axios from 'axios';
import Modal from "react-modal";
import styled from 'styled-components';

const UpdateButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-right: 8px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-right: 8px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background-color: #bdbdbd;
  color: white;
  border: none;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
`;

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


  const [discountSeq, setDiscountSeq] = useState('');
  const [brand, setBrand] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [discountContent, setDiscountContent] = useState('');
  const [consumptionCat, setConsumptionCat] = useState('');
  const [events, setEvents] = useState([]);

  const [discountUrl, setDiscountUrl] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [calLike, setCalLike] = useState('');


  //const [eventDetails, setEventDetails] = useState(null);

  const [updatedBrand, setUpdatedBrand] = useState('');
  const [updatedStartDate, setUpdatedStartDate] = useState('');
  const [updatedEndDate, setUpdatedEndDate] = useState('');
  const [updatedDiscountContent, setUpdatedDiscountContent] = useState('');
  const [updatedConsumtionCat, setUpdatedConsumtionCat] = useState('');

  useEffect(() => { 
    axios.get('http://localhost:8899/discount-calendar')
        .then(response => {
            const modifiedData = response.data.map(item => ({
              seq : item.discountSeq,
              title: item.brand,
              start: item.startDate,
              end: item.endDate,
              description: item.discountContent,
              category: item.consumptionCat,
              discounturl : item.url,
              imgpath : item.imagePath,
              calLike : item.calendarLike,
            }));
            setEvents(modifiedData);
            console.log(modifiedData);
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

const handleDeleteEvent = () => {
  axios.delete(`http://localhost:8899/discount-calendar/delete/${discountSeq}`)
  .then(response=>{
    console.log(response);
    setEvents(events.filter(event=> event.seq !== discountSeq));
    setModal2IsOpen(false);
  })
  .catch(error=>{
    console.error(error);
  });
};
const handleModal3Open = () => {

  setUpdatedBrand(brand);
  setUpdatedStartDate(startDate);
  setUpdatedEndDate(endDate);
  setUpdatedDiscountContent(discountContent);
  setUpdatedConsumtionCat(consumptionCat);
  setDiscountSeq(discountSeq);
  setDiscountUrl();
  setModal3IsOpen(true);
};

const handleModal3Close = () => {
  setModal3IsOpen(false);
};

const handleModalSubmit = () => {
    const newEvent = {
        seq : discountSeq,
        title: brand,
        start: startDate,
        end: endDate,
        description: discountContent,
        category : consumptionCat,
    };

    setEvents([...events, newEvent]);

    axios.post('http://localhost:8899/discount-calendar/register', { discountSeq, brand, startDate, endDate, discountContent,consumptionCat })
            .then(response => {
                console.log(response);
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
  setConsumptionCat(updatedConsumtionCat);
  setDiscountSeq(discountSeq);
  setDiscountUrl(discountUrl);
  setImagePath(imagePath);

  console.log(discountUrl);
   
  const updatedEvent = {
    discountSeq : discountSeq,
    brand: updatedBrand,
    startDate: updatedStartDate,
    endDate: updatedEndDate,
    discountContent: updatedDiscountContent,
    consumptionCat: consumptionCat,
    discountUrl : discountUrl,
    imagePath : imagePath,
  };

  console.log("updatedEvent : " + discountSeq);

  axios.put('http://localhost:8899/discount-calendar/update', updatedEvent)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });


  setModal3IsOpen(false);
};
const categoryColors = {
  1: '#CDB4DB', // 카테고리 1에 대한 색상 (라일락)
  2: '#FFC3A0', // 카테고리 2에 대한 색상 (프렌치 로즈)
  3: '#ABEBC6', // 카테고리 3에 대한 색상 (민트 크림)
  4: '#73C6B6', // 카테고리 4에 대한 색상 (베이비 블루)
  5: '#FFAAA5', // 카테고리 5에 대한 색상 (로즈 퀴즈)
  6: '#FFDAB9', // 카테고리 6에 대한 색상 (피치 퓨티)
  7: '#A3E4D7', // 카테고리 7에 대한 색상 (터키스 그린)
  8: '#D7DBDD', // 카테고리 8에 대한 색상 (라이트 그레이)
};

  const categorizedEvents = events.map((event) => ({
    ...event,
    backgroundColor: categoryColors[event.category],
  }));


  const handleEventClick = (info) => {
    console.log(info.event);
    console.log(info.event.extendedProps);

    const { description, category, seq, discounturl, imgpath} = info.event.extendedProps;
    const {title , start, end} = info.event;
    setBrand(title);
    console.log(start);
    console.log("discounturl : " + discounturl);
    console.log("imgpath : " + imgpath);

    setStartDate(start.toLocaleDateString());
    setEndDate(end.toLocaleDateString());
    setDiscountContent(description);
    setConsumptionCat(category);
    setDiscountSeq(seq);
    setDiscountUrl(discounturl);
    setImagePath(imgpath);
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
                <UpdateButton  onClick={handleModal3Open}>수정하기</UpdateButton >
                <DeleteButton onClick={handleDeleteEvent}> 삭제하기 </DeleteButton>
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
                <SubmitButton onClick={handleModal3Submit}>수정완료</SubmitButton>
                <CancelButton onClick={handleModal3Close}>취소하기</CancelButton>
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