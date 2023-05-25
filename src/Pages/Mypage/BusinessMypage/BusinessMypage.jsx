import React from 'react';
import Profile from '../../../Componenets/Profile/Profile';
import GeneralMyInfo from '../../../Componenets/MyInfo/BusinessMyInfo/BusinessMyInfo'
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const LeftContainer = styled.div`
  flex: 0 0 40%;
`;

const RightContainer = styled.div`
  flex: 0 0 55%;
`;

const BusinessMypage = () => {
  return (
    <Container>
      <LeftContainer>
        <Profile />
      </LeftContainer>
      <RightContainer>
        <GeneralMyInfo />
      </RightContainer>
      <br></br>
    </Container>
  );
};

export default BusinessMypage;