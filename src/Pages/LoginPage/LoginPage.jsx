import React from 'react';
import Login from '../../Componenets/Login/Login';
import styled from 'styled-components';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-left: 50%;
`;

const LoginPage = () => {
  return (
    <CenteredContainer>
      <Login />
    </CenteredContainer>
  );
};

export default LoginPage;