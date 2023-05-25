import React, { useState } from "react";
//import "./FindPassword.css";
import styled from "styled-components";

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Heading = styled.h2`
  text-align: center;
`;

const Form = styled.form`
  margin-top: 20px;
`;

const FormField = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border-radius: 3px;
  border: 1px solid #ddd;
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  margin-top: 10px;
  color: #ff0000;
`;

const FindPassword = () => {
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleUserEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.prevnetDefault();

    if (userId === "사용자 아이디" && userEmail === "사용자 이메일") {
      setSuccessMessage("비밀번호 이메일 전송 완료");
      setErrorMessage("");
    } else {
      setErrorMessage("아이디 또는 이메일이 잘못되었습니다.");
      setSuccessMessage("");
    }
  };

  return (
    <Container>
      <Heading>비밀번호찾기</Heading>
      <Form onSubmit={handleFormSubmit}>
        <FormField>
          <Label htmlFor="userId"> ID : </Label>
          <Input
            type="text"
            id="userId"
            value={userId}
            onChange={handleUserIdChange}
          />
        </FormField>
        <FormField>
          <Label htmlFor="userEmail"> Email : </Label>
          <Input
            type="email"
            value={userEmail}
            onChange={handleUserEmailChange}
          />
        </FormField>
        <SubmitButton type="submit">비밀번호 찾기</SubmitButton>
      </Form>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {successMessage && <p>{successMessage} </p>}
    </Container>
  );
};

export default FindPassword;
