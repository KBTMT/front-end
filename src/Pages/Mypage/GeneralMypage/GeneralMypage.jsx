import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Profile from '../../../Componenets/Profile/Profile';
import GeneralMyInfo from '../../../Componenets/MyInfo/GeneralMyInfo/GeneralMyInfo';
import styled from 'styled-components';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 50px 0px;
`;

const LeftContainer = styled.div`
  flex: 0 0 40%;
`;

const RightContainer = styled.div`
  width: 600px;
  flex: 0 0 55%;
`;

const AddAccountButton = styled.button`
  display: block;
  padding: 10px 20px;
  background-color: #66d3a8ba;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top : 30px;
  margin-left : 120px;
`;

const GeneralMypage = () => {
  const sessionData = JSON.parse(sessionStorage.getItem('vo'));
  const [data, setData] = useState(false);
  const [generalId, setGeneralId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionData) {
      setGeneralId(sessionData.generalId);
      axios
        .get(`http://localhost:8899/account/${sessionData.generalId}/isExist`)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error(error);
        })
    }else{
      navigate("/login")
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const scope = urlParams.get('scope');
    const state = urlParams.get('state');
    console.log(code);
    console.log(generalId);
    if (code && generalId) {
      axios
        .post('http://localhost:8899/account/register', {
          code,
          scope,
          state,
          generalId,
        })
        .then(response => {
          console.log(response.data);
          alert(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [sessionData, generalId]);

  const handleAddAccount = () => {
    window.location.href =
      'https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=27cbcd6b-8cdc-4499-a076-d058c4132ce7&redirect_uri=http://localhost:3000/generalMypage&scope=login inquiry transfer&state=23323452345398798793453454390233&auth_type=0';
  };

 

  return (
    <div>
      {sessionData ? (
        <Container>
          <LeftContainer>
            <Profile />
            {data === false ? (
              <AddAccountButton onClick={handleAddAccount}>
                계좌 추가
              </AddAccountButton>
            ) : null}
          </LeftContainer>
          <RightContainer>
            <GeneralMyInfo />
          </RightContainer>
        </Container>
      ) : (
       <h2></h2> 
      )}
    </div>
  );
};

export default GeneralMypage;
