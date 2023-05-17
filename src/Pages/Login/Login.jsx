import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [userType, setUserType] = useState("general");
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleUserType = (e) => {
    setUserType(e.target.value);
  };

  const handleUserId = (e) => {
    setUserId(e.target.value);
  };

  const handleUserPassword = (e) => {
    setUserPassword(e.target.value);
  };

  const handleLogin = () => {};

  const handleForgetUserId = () => {};

  const handleForgetUserPassword = () => {};

  return (
    <div className="container1">
      <div className="login-box">
        <h2>로그인</h2>
        <div className="radio-btn-container">
          <input
            type="radio"
            id="general"
            name="usertype"
            value="general"
            checked={userType === "general"}
            onChange={handleUserType}
            className="radio-btn"
          />
          <label htmlFor="general" className="radio-btn-label">
            일반 회원
          </label>
          <input
            type="radio"
            id="business"
            name="usertype"
            value="business"
            checked={userType === "business"}
            onChange={handleUserType}
            className="radio-btn"
          />
          <label htmlFor="business" className="radio-btn-label">
            사업자 회원
          </label>
        </div>
        <input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={handleUserId}
          className="inputLogin"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={userPassword}
          onChange={handleUserPassword}
          className="inputLogin"
        />
        <button onClick={handleLogin} className="button">
          로그인
        </button>
        <div className="link-container">
          <Link to="/findid" onClick={handleForgetUserId}>
            아이디 찾기
          </Link>
          <span> | </span>
          <Link to="/findpassword" onClick={handleForgetUserPassword}>
            비밀번호 찾기
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
