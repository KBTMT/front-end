import React, { useState } from "react";
import "./FindId.css";

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
    <div className="container">
      <div className="findIdForm">
        <h2>ID 찾기</h2>
        <div className="form-group">
          <label htmlFor="userName"> 이름 </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={handleUserNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userEmail">이메일</label>
          <input
            type="email"
            id="userEmail"
            value={userEmail}
            onChange={handleUserEmailChange}
            required
          />
        </div>
        <button className="findUserIdBtn" onClick={handleFindId}>
          아이디 찾기
        </button>
        {foundUserId && (
          <div className="foundUserIdResult">
            <p> 찾은 아이디 : {foundUserId} </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindId;
