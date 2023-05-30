import React from 'react';
import RegisterBusinness from '../../../Componenets/Register/RegisterBusiness/RegisterBusiness'
import styled from 'styled-components';

const Img = styled.img`
  width: 600px;
  margin-top: 20px;
`;

const RegisterBusinessPage = () => {
    return (
        <div style={{ width: '90%', margin:'0 auto'}}>
            <Img src={require('../../../img/tickle_register_bar.png')} />
            <RegisterBusinness />
        </div>
    );
};

export default RegisterBusinessPage;