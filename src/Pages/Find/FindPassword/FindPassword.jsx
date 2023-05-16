import React, { useState } from "react";
import "./FindPassword.css";

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
    <div>
      <h2>비밀번호찾기</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="userId"> ID : </label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={handleUserIdChange}
          />
        </div>
        <div>
          <label htmlFor="userEmail"> Email : </label>
          <input
            type="email"
            value={userEmail}
            onChange={handleUserEmailChange}
          />
        </div>
        <button type="submit"> 비밀번호 찾기 </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage} </p>}
    </div>
  );
};

export default FindPassword;
