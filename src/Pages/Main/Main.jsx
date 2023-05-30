import React , { useState, useEffect } from 'react';
import DiscountCalendar from "../../Componenets/DiscountCalendar/DiscountCalendar"
import styled from 'styled-components';
import axios from 'axios';


const Main = () => {

    const [generalId, setGeneralId] = useState();
    const [myTickleNum, setMyTickleNum] = useState(0);

    useEffect(() => {
    const userFromSession = JSON.parse(sessionStorage.getItem('vo'));
    if (userFromSession) {
    //   setUser(userFromSession);
      setGeneralId(userFromSession.generalId);
      console.log("mytickle - userId : " + generalId);
    }
    }, []);

    useEffect(() => {
        fetchData();
      }, [generalId]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8899/discount-calendar/myTickle/${generalId}`);
            console.log("my tickle : " + response.data);
            setMyTickleNum(response.data);
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <Wrapper>
      <Img src={require('../../img/tickle_info_bar.png')} />
      <ContentWrapper>
        <TickleWrapper>
            <Tickle>
                {myTickleNum === 0 && <img src={require("../../img/tickle1.png")} style={{ width : "200px"}} alt="Image 1" />}
                {myTickleNum === 1 && <img src={require("../../img/tickle2.png")} style={{ width : "200px"}} alt="Image 2" />}
                {myTickleNum === 2 && <img src={require("../../img/tickle3.png")} style={{ width : "200px"}} alt="Image 3" />}
                {myTickleNum === 3 && <img src={require("../../img/tickle4.png")} style={{ width : "200px"}} alt="Image 4" />}
                {myTickleNum >= 4 && <img src={require("../../img/tickle5.png")} style={{ width : "200px"}} alt="Image 5" />}   
            </Tickle>
        </TickleWrapper>
        <CalendarWrapper>
            <DiscountCalendar />
        </CalendarWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  width: 500px;
  margin-top: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;

const TickleWrapper = styled.div`
    margin-right: 30px;
    // background-color : #e2edfd;
    height : 350px;
    width : 250px;
    border-radius : 10px;
    display: flex; /* 수평 및 수직 가운데 정렬을 위해 flex 설정 */
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center; /* 수직 가운데 정렬 */

`;

const CalendarWrapper = styled.div`
    // background-color : #e2edfd;
    padding : 40px;
    width: 800px;
    border-radius : 10px;
`;
const Tickle = styled.h2`
    width : 200px;
`;

export default Main;
