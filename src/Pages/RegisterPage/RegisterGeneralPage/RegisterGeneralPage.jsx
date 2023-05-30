import React from 'react';
import RegisterGeneral from '../../../Componenets/Register/RegisterGeneral/RegisterGeneral';
import styled from 'styled-components';


const Img = styled.img`
  width: 600px;
  margin-top: 20px;
`;

const RegisterGeneralPage = () => {
    return (
        <div style={{ width: '70%', margin:'0 auto'}}>
            <Img src={require('../../../img/tickle_register_bar.png')} />
            <RegisterGeneral />
        </div>
    );
};

export default RegisterGeneralPage;