import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Accountbook from '../../../Componenets/AccountBook/Accountbook';
import TargetCompare from '../../../Componenets/Graph/TargetCompare/TargetCompare';
import './AccountBookMain.css';

const AccountBookMain = () => {
  const [sumConsume, setSumConsume] = useState(0);
  const [sumIncome, setSumIncome] = useState(0);
  const [targetSaving, setTargetSaving] = useState(0);
  const [user, setUser] = useState([]);

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
      const response = await axios.get('http://localhost:8899/generalmypage/generalMyFinance', {
        params: { generalId: user.generalId, saving: user.saving }
      });
      setSumConsume(response.data.sumConsumption[0].TOTAL_PRICE);
      setSumIncome(response.data.sumIncome[0].TOTAL_PRICE);
      setTargetSaving(response.data.targetSaving[0].target);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <TopImage src={require('../../../img/tickle_write_bar.png')} />
      <Container>
        <LeftSide>
          <TargetCompare data={[sumIncome, sumConsume, targetSaving]} />
        </LeftSide>
        <RightSide>
          <Accountbook />
        </RightSide>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const TopImage = styled.img`
  width: 500px;
`;

const Container = styled.div`
  display: flex;
`;

const LeftSide = styled.div`
  flex: 1;
  margin-right: 50px;
`;

const RightSide = styled.div`
  flex: 1;
`;

export default AccountBookMain;