import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './DiscountCalendar.css';
import axios from 'axios';
import Modal from "react-modal";
import styled from 'styled-components';
import 'remixicon/fonts/remixicon.css'
import { isDateSpansEqual } from '@fullcalendar/core/internal';
import Select from 'react-dropdown-select';
import { useNavigate } from 'react-router-dom';



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
          (eventInfo.event.extendedProps.calLike >=10 ?
            (<img src={require("../../img/goldTickle.png")} style={{ height: '30px' }} />
          ):(
            (eventInfo.event.extendedProps.calLike >=5 ?(
              <img src={require("../../img/silverTickle.png")} style={{ height: '30px' }} />
            ):(
              <img src={require("../../img/bronzeTickle.png")} style={{ height: '30px' }} />
            ))
          ))
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
  
  // 리뷰 작성
  const [score, setScore]= useState();
  const [userReview, setUserReview] = useState('');
  //const [eventDetails, setEventDetails] = useState(null);

  const [updatedBrand, setUpdatedBrand] = useState('');
  const [updatedStartDate, setUpdatedStartDate] = useState('');
  const [updatedEndDate, setUpdatedEndDate] = useState('');
  const [updatedDiscountContent, setUpdatedDiscountContent] = useState('');
  const [updatedConsumtionCat, setUpdatedConsumtionCat] = useState('');
  const [generalId, setGeneralId] = useState('');
  const [user, setUser] = useState([]);


  //카테고리 선택
  const [selectedCategory, setSelectedCategory] = useState(''); // 선택된 카테고리 상태
  const [selectedEvents, setSelectedEvents] = useState([]);

  //리뷰들...
  const [review, setReview] = useState([]);
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
              calLike : item.calendarLike
            }));
            setEvents(modifiedData);
            console.log(modifiedData);
            const userFromSession = JSON.parse(sessionStorage.getItem('vo'));
          if (userFromSession) {
            setUser(userFromSession);
            setGeneralId(userFromSession.generalId);
            // setSelectedCategory(userFromSession.consumptionCat);
            // console.log(selectedCategory);
          }
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
    setCalLike('');
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


// 좋아요 버튼 클릭
const clickLikeButton = () => {
  axios.put('http://localhost:8899/mypick/like', {discountSeq, generalId})
  .then(response => {
    console.log(response);
    alert(response.data.result);
    setCalLike(response.data.newLike);
  })
  .catch(error => {
    console.error(error);
    return;
  });
  setMypickFlag(true); 
};

// 좋아요 취소
const clickDislikeButton = () => {
  alert("찜 취소");
  axios.put('http://localhost:8899/mypick/dislike', {discountSeq, generalId})
  .then(response => {
    console.log(response);
    alert(response.data.result);
    setCalLike(response.data.newLike);
  })
  .catch(error => {
    console.error(error);
    return;
  });
  setMypickFlag(false); 
};


 // 신고
 const clickReport = () => {
  // alert("신고하기");
  const targetSeq = discountSeq;
  const status = 0;
  const reportedFlag = 0;

axios.post('http://localhost:8899/admin/register/report', { targetSeq, status, reportedFlag })
.then(response => {
  console.log(response);
  alert("신고되었습니다")
})
.catch(error => {
  alert(targetSeq)
  alert(status)
  alert("에러 발생")
  console.error(error);
});
};


// 리뷰작성
const handleModalReviewSubmit = () => {
  console.log(generalId);
  console.log(discountSeq);
  console.log(userReview);
  console.log(score);
  axios.put('http://localhost:8899/mypick/register', {generalId, discountSeq, review : userReview, score})
            .then(response => {
              alert(response.data);
              console.log(response);
            })
            .catch(error => {
              alert(error);
              console.error(error);
  });
};

// 달력 정보 등록
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

  const updatedEvent = {
    discountSeq : discountSeq,
    brand: updatedBrand,
    startDate: updatedStartDate,
    endDate: updatedEndDate,
    discountContent: updatedDiscountContent,
    consumptionCat: consumptionCat,
    discountUrl : discountUrl,
    imagePath : imagePath,
    calLike : calLike,

  };

  axios.put('http://localhost:8899/discount-calendar/update', updatedEvent)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error(error);
  });


  setModal3IsOpen(false);
};

// 카테고리별 컬러
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

  const categorizedEvents = selectedEvents.map((event) => ({
    ...event,
    backgroundColor: categoryColors[event.category],
  }));

  const [mypickFlag, setMypickFlag] = useState(false);

  const handleEventClick = (info) => {
    console.log(info.event);
    console.log(info.event.extendedProps);

    const { description, category, seq, discounturl, imgpath, calLike} = info.event.extendedProps;
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
    setCalLike(calLike);
    // 추가함
    axios.get(`http://localhost:8899/mypick/isExist/${seq}/${generalId}`)
      .then(response => {
        console.log(response);
        setMypickFlag(response.data);
      })
      .catch(error => console.log(error));

      axios.get(`http://localhost:8899/mypick/getReviews/${seq}`)
      .then(response => {
        console.log(response.data);
        setReview(response.data);
      })
      .catch(error => console.log(error));

    setModal2IsOpen(true);
    console.log("like " + calLike);
  };

  const isAdmin = sessionStorage.getItem("admin");


  
  const handleCatOptions = (selectedOption) => {
    console.log(selectedOption[0].value);
    setSelectedCategory(selectedOption[0].value);
  }
  useEffect(() => {
    if (selectedCategory === '0') {
      setSelectedEvents(events);
    } else {
      const filteredEvents = events.filter(event => event.category === selectedCategory);
      setSelectedEvents(filteredEvents);
    }
  }, [selectedCategory, events]);


  const navigate = useNavigate();

  const handleBoardBtnClick = () => {
    navigate('/boardMain',{state : { search :  {brand} }});

  };

  
  return (
    <div className="App" style={{ padding : "50px", borderRadius : "10px", backgroundColor : "white", boxShadow : "5px 5px 5px rgb(216, 216, 216)" }}>
      <Select 
      placeholder = "카테고리를 선택하세요     "
      options={[{value : '0', label : '전체'},{value : '1', label : '식비'},{value : '2', label : '주거비'},
      {value : '3', label : '교통비'},{value : '4', label : '의료/건강'},{value : '5', label : '생활용품'},
      {value : '6', label : '여가/문화'},{value : '7', label : '패션/미용'},{value : '8', label : '기타'}
    ]}
      onChange={(selectedOption) => handleCatOptions(selectedOption)}/>
      <br/>
      <FullCalendar
        initialView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={categorizedEvents}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        className="calendar"
      />
    
      <Modal isOpen={modal2IsOpen} onRequestClose={handleModal2Close} className="modal" overlayClassName="overlay">
          <div className='calendar_detail_content'>
            <div className='detailContent'>
                <h1>{brand}</h1>  
                  {mypickFlag ? (
                    <button onClick={clickDislikeButton} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>
                      <i className="ri-heart-3-fill ri-3x" style={{ color: 'crimson' }}></i>
                    </button>
                  ):(
                    <button onClick={clickLikeButton} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>
                      <i className="ri-heart-3-line ri-3x" style={{ color: 'crimson' }}></i>
                    </button>
                  )}
                : {calLike}
                <p> 시작일자 : {startDate}</p>
                <p> 종료일자 : {endDate}</p>
                <p> 카테고리 : {consumptionCat}</p>
                <p> 내용 : {discountContent}</p>
            </div>
            <div className='reviewAndScore'>
              <button className='reportBtn' onClick={clickReport} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}><i class="ri-alarm-warning-fill ri-3x"></i></button>
              <br/><br/>
              <div className='reviews'>
                {review.map((r)=>(
                  <div className='reviewContent'>
                    <div className='scoreImage'>
                    {r.score === 1 && (
                      <img src={require("../../img/score1.png")} style={{ height: '30px' }} />
                    )}
                    {r.score === 2 && (
                      <img src={require("../../img/score2.png")} style={{ height: '30px' }} />
                    )}
                    {r.score === 3 && (
                      <img src={require("../../img/score3.png")} style={{ height: '30px' }} />
                    )}
                    </div>
                    {r.generalId}님   
                    <br/>
                    후기 : {r.review}
                  </div>
                ))}
                <form className='modal-form' onSubmit={handleModalReviewSubmit}>
                    <label className="form-label-calendar"></label>
                <div className='registerReview'>
                    리뷰작성<textarea value={userReview} onChange={(e) => setUserReview(e.target.value)}></textarea>  
                  <br/>
                  점수 
                  <select value={score} onChange={(e) => setScore(e.target.value)}>
                      <option value="0">선택</option>
                      <option value="3">만족</option>
                      <option value="2">보통</option>
                      <option value="1">나쁨</option>
                    </select>
                  <button type="submit" className='form-button' style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>
                    리뷰등록
                  </button>
                </div>
                </form>
                <button className='form-button' onClick={handleBoardBtnClick}>
                    관련 글 보기
                </button>
              </div>
            </div>
            </div>
              <div className='updatebuttons'>
                <UpdateButton  onClick={handleModal3Open}>수정하기</UpdateButton>
                {/* 관리자만 삭제하기 버튼 볼 수 있음 */}
                {isAdmin && <DeleteButton onClick={handleDeleteEvent}> 삭제하기 </DeleteButton>}
              </div>
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