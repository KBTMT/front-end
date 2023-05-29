import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Profile from '../../../Componenets/Profile/Profile'
import GeneralMyInfo from '../../../Componenets/MyInfo/GeneralMyInfo/GeneralMyInfo'
import styled from 'styled-components';

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

const GeneralMypage = () => {
  const sessionData = JSON.parse(sessionStorage.getItem("vo"));
  const [data, setData] = useState(false);
  const [generalId, setGeneralId] = useState();

  useEffect(() => {
    if (sessionData) {
      setGeneralId(sessionData.generalId);
      axios.get(`http://localhost:8899/account/${sessionData.generalId}/isExist`)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const scope = urlParams.get('scope');
    const state = urlParams.get('state');
    console.log(code);
    console.log(generalId);
    if (code && generalId) {
      axios.post('http://localhost:8899/account/register', { code, scope, state, generalId })
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
    window.location.href = 'https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=27cbcd6b-8cdc-4499-a076-d058c4132ce7&redirect_uri=http://localhost:3000/generalMypage&scope=login inquiry transfer&state=23323452345398798793453454390233&auth_type=0';
  };

  return (
    <div>
    {sessionData ? (
      <Container>
        <LeftContainer>
          <Profile />
        </LeftContainer>
        <RightContainer>
          <GeneralMyInfo />
          {data == false ? (
              <button onClick={handleAddAccount}>계좌 추가</button>
            ) : null}
        </RightContainer>
      </Container>
    ) : (
      <div>
        <h1>로그인을 해주세요!</h1>
      </div>
    )}
  </div>
    
  );
};

export default GeneralMypage;
