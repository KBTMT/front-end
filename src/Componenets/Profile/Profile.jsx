import React from 'react';
import styled from 'styled-components';

// 스타일드 컴포넌트를 사용하여 스타일을 정의합니다.
const ProfileContainer = styled.div`
  text-align: center;
   border-radius: 10px; /* 원하는 값을 설정하세요 */
  background-color: #f0f0f0; /* 배경색 설정 */
  padding: 20px; /* 내부 여백 설정 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 설정 */
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const Greeting = styled.h2`
  margin: 10px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #f8c291;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e17055; /* 호버 시 색상 변경 */
  }
`;

const Profile = ({ name, profileImage }) => {
  return (
    <ProfileContainer>
      <ProfileImage src={"https://www.svgrepo.com/show/492683/avatar-girl.svg"} alt="Profile Image" />
      <Greeting>{`${name}님 환영합니다.`}</Greeting>
      <ButtonContainer>
        <Button >내 정보</Button>
        <Button>내 활동</Button>
        <Button>내 금융</Button>
      </ButtonContainer>
    </ProfileContainer>
  );
};

export default Profile;
