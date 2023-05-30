import React, { useState } from "react";
import styled from "styled-components";

//import "./FindId.css";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FindIdForm = styled.div`
  width: 500px;
  padding: 20px;
  background-color: #c9f4e2ba;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  display : flex;
  align-items: center;

`;

const Label = styled.label`
  margin-bottom: 8px;
  margin: 0 auto;

`;

const Input = styled.input`
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0 auto;

`;

const FindUserIdBtn = styled.button`
  display: block;
  width: 50%;
  margin: 0 auto;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
`;

const FoundUserIdResult = styled.div`
  margin-top: 20px;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
`;


const FindId = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [foundUserId, setFoundUserId] = useState("");

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleUserEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleFindId = () => {
    const foundUserId = "found_id";
    setFoundUserId(foundUserId);
  };

  return (
    <Container>
      <FindIdForm>
        <h2>ID 찾기</h2>
        <FormGroup>
          <Label htmlFor="userName"> 이름 </Label>
          <Input
            type="text"
            id="userName"
            value={userName}
            onChange={handleUserNameChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="userEmail">이메일</Label>
          <Input
            type="email"
            id="userEmail"
            value={userEmail}
            onChange={handleUserEmailChange}
            required
          />
        </FormGroup>
        <FindUserIdBtn onClick={handleFindId}>아이디 찾기</FindUserIdBtn>
        {foundUserId && (
          <FoundUserIdResult>
            <p> 찾은 아이디 : {foundUserId} </p>
          </FoundUserIdResult>
        )}
      </FindIdForm>
    </Container>
  );
};

export default FindId;
