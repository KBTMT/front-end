import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal from "react-modal";
import 'remixicon/fonts/remixicon.css'
import Select from 'react-dropdown-select';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

const Container = styled.div`
  width: 1500px;
  margin: 30px auto;
  padding: 40px;
  background-color: #E5ECF6;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  border-radius: 10px;
`;

const MyContainer = styled.div`
  width: 1500px;
  height: auto;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #333333;
`;

const SubHeading = styled.h3`
  margin-bottom: 10px;
  color: #555555;
`;

const List = styled.ul`
  padding: 0;
`;

const ListItem = styled.li`
  list-style: none;
  margin-bottom: 5px;
  color: #777777;
`;

const MyActivity = () => {
  const [boardList, setBoardList] = useState([]);
  const [mypickList, setMypickList] = useState([]); 
  const [user, setUser] = useState(null);
  const [generalId, setGeneralId] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState(null); // 추가: 선택된 할인 정보
  const [mypickFlag, setMypickFlag] = useState(false);
  const [calLike, setCalLike] = useState('');

  // 리뷰 작성
  const [score, setScore]= useState();
  const [userReview, setUserReview] = useState('');
 //리뷰들...
 const [review, setReview] = useState([]);
 
  useEffect(() => {
    const userFromSession = JSON.parse(sessionStorage.getItem('vo'));
    if (userFromSession) {
      setUser(userFromSession);
      setGeneralId(userFromSession.generalId);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8899/myactivity', {
        params: {
          generalId: user.generalId,
        },
      });
      console.log(response.data);
      setBoardList(response.data.board);
      setMypickList(response.data.mypick);

    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    console.log(boardList);
    console.log(mypickList);
  }, [boardList, mypickList]);
  

  const [discountSeq, setDiscountSeq] = useState("");
  const openModal = (selectedMypick) => {
    console.log("modal open");
    // 추가함
    axios.get(`http://localhost:8899/mypick/isExist/${selectedMypick.discountSeq}/${generalId}`)
      .then(response => {
        console.log(response);
        setMypickFlag(response.data);
      })
      .catch(error => console.log(error));

      axios.get(`http://localhost:8899/mypick/getReviews/${selectedMypick.discountSeq}`)
      .then(response => {
        console.log(response.data);
        setReview(response.data);
      })
      .catch(error => console.log(error));
    setDiscountSeq(selectedMypick.discountSeq);
    setSelectedDiscount(selectedMypick);
    
  };

  const closeModal = () => {
    setSelectedDiscount(null);
    setDiscountSeq("");
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
    setCalLike(response.data.newLike);
  })
  .catch(error => {
    console.error(error);
    return;
  });
  setMypickFlag(false); 
};


// 리뷰작성
const handleModalReviewSubmit = () => {
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
  return (
    <Container>
      <MyContainer>
        <Heading>내 활동</Heading>
        <div>
          <SubHeading>내가 찜한 티끌</SubHeading>
          <List>
          {mypickList.filter(mypick => mypick !== null).map(mypick => (
            <ListItem key={mypick.discountSeq} onClick={() => openModal(mypick)}>{mypick.brand} : {mypick.discountContent}</ListItem>
          ))}
          </List>
        </div>
        <div>
          <SubHeading>내가 쓴 글</SubHeading>
          <List>
            {boardList.map(board => (
              <Link to={`/board/boardpost/${board.boardSeq}`}>
                <ListItem key={board.boardSeq}>{board.title} : {board.boardContent}</ListItem>
              </Link>
            ))}
          </List>
        </div>
      </MyContainer>
      {/* 내 할인정보 모달 */}
      {selectedDiscount && (
      <Modal isOpen={true} onRequestClose={closeModal} className="modal" overlayClassName="overlay">
          <div className='calendar_detail_content'>
            <div className='detailContent'>
                <h1>{selectedDiscount.brand}</h1>  
                  {mypickFlag ? (
                    <button onClick={clickDislikeButton} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>
                      <i className="ri-heart-3-fill ri-3x" style={{ color: 'crimson' }}></i>
                    </button>
                  ):(
                    <button onClick={clickLikeButton} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>
                      <i className="ri-heart-3-line ri-3x" style={{ color: 'crimson' }}></i>
                    </button>
                  )}
                : {selectedDiscount.calendarLike}
                <p> 시작일자 : {selectedDiscount.startDate}</p>
                <p> 종료일자 : {selectedDiscount.endDate}</p>
                <p> 카테고리 : {selectedDiscount.consumptionCat}</p>
                <p> 내용 : {selectedDiscount.discountContent}</p>
            </div>
            <div className='reviewAndScore'>
              <button className='reportBtn' onClick={clickReport} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}><i class="ri-alarm-warning-fill ri-3x"></i></button>
              <br/><br/>
              <div className='reviews'>
                {review.map((r)=>(
                  <div className='reviewContent'>
                    <div className='scoreImage'>
                    {r.score === 1 && (
                      <img src={require("../../img/tickle1.png")} style={{ height: '30px' }} />
                    )}
                    {r.score === 2 && (
                      <img src={require("../../img/tickle2.png")} style={{ height: '30px' }} />
                    )}
                    {r.score === 3 && (
                      <img src={require("../../img/tickle3.png")} style={{ height: '30px' }} />
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
              </div>
            </div>
            </div>
      </Modal>
      )}
    </Container>
  );
};

export default MyActivity;