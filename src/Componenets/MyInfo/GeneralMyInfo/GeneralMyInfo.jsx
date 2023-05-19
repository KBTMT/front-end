import React, { useState } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  text-align: center;
  border-radius: 10px;
  background-color: #f0f0f0;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Row = styled.div`
  display: flex;
  align-items: center;  
  justify-content: center;
  margin-bottom : 10px;
`;

const Label = styled.label`
  flex: 0 0 30%;
  text-align: right;
  margin-right: 10px;
  padding-bottom : 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right : 120px;
  background-color : white;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #f8c291;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin : 5px;
  &:hover {
    background-color: #e17055;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const EditProfile = ({ sessionData }) => {
  const [editing, setEditing] = useState(false);
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState(sessionData);

  const handleInputChange = (e) => {
    // const { name, value } = e.target;
    // setUserInfo((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  };

  const handleEditButtonClick = () => {
    setEditing(true);
  };

  const handleSaveButtonClick = () => {
    // 여기에서 수정된 회원정보를 저장하는 로직을 구현하세요.
    console.log(userInfo);
    setEditing(false);
  };

  const handleDeleteButtonClick = () => {
    // 여기에서 회원 탈퇴 로직을 구현하세요.
    console.log('회원 탈퇴');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = () => {
    // 여기에서 비밀번호 확인 로직을 구현하세요.
    // 비밀번호가 올바르면 handleSaveButtonClick()을 호출하세요.
    console.log('비밀번호 확인');
    handleSaveButtonClick();
  };

  return (
    <ProfileContainer>
      <Row>
        <Label>이름:</Label>
        <Input
          type="text"
          // name="name"
          // value={userInfo.name}
          onChange={handleInputChange}
          disabled={!editing}
        />
      </Row>
      <Row>
        <Label>아이디:</Label>
        <Input
          type="text"
          // name="username"
          // value={userInfo.username}
          onChange={handleInputChange}
          disabled={!editing}
        />
      </Row>
      <Row>
        <Label>비밀번호:</Label>
        <Input
          type="password"
          //name="password"
          //value={userInfo.password}
          onChange={handleInputChange}
          disabled={!editing}
        />
      </Row>
      <Row>
        <Label>닉네임:</Label>
          <Input
            type="text"
            //name="nickname"
            //value={userInfo.nickname}
            onChange={handleInputChange}
            disabled={!editing}
          />
      </Row>
      <Row>
      <Label>이메일:</Label>
        <Input
          type="email"
          //name="email"
          //value={userInfo.email}
          onChange={handleInputChange}
          disabled={!editing}
        />
      </Row>
      <Row>
      <Label>생일:</Label>
        <Input
          type="text"
          //name="birthday"
          //value={userInfo.birthday}
          onChange={handleInputChange}
          disabled={!editing}
        />
      </Row>
      <Row>
      <Label>직업군:</Label>
        <Input
          type="text"
          //name="occupation"
          //value={userInfo.occupation}
          onChange={handleInputChange}
          disabled={!editing}
        />
      </Row>
      
      <Row>
      <Label>관심 소비분야: </Label>
        <Input
          type="text"
          //name="interests"
          //value={userInfo.interests}
          onChange={handleInputChange}
          disabled={!editing}
        />
      </Row>
      <Row>
      <Label>관심 금융분야:</Label>
        <Input
          type="text"
          //name="finance"
          //value={userInfo.finance}
          onChange={handleInputChange}
          disabled={!editing}
        />
      </Row>
      {!editing && (
        <Button onClick={handleEditButtonClick}>수정하기</Button>
      )}
      {editing && (
        <>
          <Label>
            비밀번호 확인:
            <Input
              type="password"
              //name="confirmPassword"
              //value={password}
              onChange={handlePasswordChange}
            />
          </Label>
          <Button onClick={handleConfirmPassword}>저장하기</Button>
        </>
      )}
      <DeleteButton onClick={handleDeleteButtonClick}>
        탈퇴하기
      </DeleteButton>
    </ProfileContainer>
  );
};

export default EditProfile;
