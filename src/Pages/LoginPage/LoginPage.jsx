import React from 'react';
import Login from '../../Componenets/Login/Login';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // height: 100vh;
  // padding-left: 50%;
  padding-bottom : 50%;
`;

const Img = styled.img`
  width: 600px;
  margin-top: 20px;
`;

const LoginPage = () => {
  return (
    <Wrapper>
      <Img src={require('../../img/tickle_register_bar.png')} />
      <CenteredContainer>
        <Login />
      </CenteredContainer>
    </Wrapper>
    
  );
};

export default LoginPage;