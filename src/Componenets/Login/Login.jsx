import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useLocation, useNavigate, useNavigation, Link } from "react-router-dom";
import axios from 'axios';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;
`;

const LoginBox = styled.form`
  width: 350px;
  padding: 40px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const RadioContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const RadioInput = styled.input`
//   display: none;
`;

const RadioLabel = styled.label`
  font-weight: bold;
  cursor: pointer;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  align-items : center;
`;

const Button = styled.button`
  width: 80%;
  padding: 8px;
  background-color: #A8E1FA;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const LinkContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const CustomLink = styled(Link)`
  color: #333;
  text-decoration: none;
`;

const Separator = styled.span`
  margin: 0 10px;
`;

const Login = () => {
  const [flag, setFlag] = useState("general");
  const [generalId, setGeneralId] = useState("");
  const [password, setPassword] = useState("");

  const handleFlag = (e) => {
    setFlag(e.target.value);
  };

  const handleGeneralId = (e) => {
    setGeneralId(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    console.log('click login')
    setGeneralId("");
    setPassword("");
    setFlag("");

    axios.post('http://localhost:8899/login', { generalId, password })
      .then(response => {
        if (response.data === "") {
          alert("로그인 실패");
          document.location.href = '/login'
        } else {
          alert("로그인 성공");
          sessionStorage.setItem("vo", JSON.stringify(response.data));
          document.location.href = '/'
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleForgetUserId = () => { };

  const handleForgetUserPassword = () => { };

  return (
    <Container>
      <LoginBox onSubmit={handleLogin} action="/">
        <Title>로그인</Title>
        <RadioContainer>
          <RadioLabel>
            <RadioInput
              type="radio"
              id="general"
              name="usertype"
              value="general"
              checked={flag === "general"}
              onChange={handleFlag}
            />
            일반 회원
          </RadioLabel>
          <RadioLabel>
            <RadioInput
              type="radio"
              id="business"
              name="usertype"
              value="business"
              checked={flag === "business"}
              onChange={handleFlag}
            />
            사업자 회원
          </RadioLabel>
        </RadioContainer>
        <Input
          type="text"
          placeholder="아이디"
          value={generalId}
          onChange={handleGeneralId}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handlePassword}
        />
        {/* <Button type="submit">로그인</Button> */}
        <Button type="submit" style={{ backgroundColor: "#A8E1FA" }} onMouseOver={(e) => e.target.style.backgroundColor = "#75C0E0"} onMouseOut={(e) => e.target.style.backgroundColor = "#A8E1FA"}>
            로그인
        </Button>
        <LinkContainer>
          <CustomLink to="/findid" onClick={handleForgetUserId}>
            아이디 찾기
          </CustomLink>
          <Separator>|</Separator>
          <CustomLink to="/findpassword" onClick={handleForgetUserPassword}>
            비밀번호 찾기
          </CustomLink>
        </LinkContainer>
      </LoginBox>
    </Container>

    
  );
};

export default Login;
