import React, { useState } from "react";
import "./RegisterGeneral.css";


const RegisterGeneral = () => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmUserPassword, setConfirmUserPassword] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userBirthday, setUserBirthday] = useState("");
  const [userJob, setUserJob] = useState("");
  const [userConsumptionInterest, setUserConsumptionInterest] = useState([]);
  const [userFinancialInterest, setUserFinancialInterest] = useState("");

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleUserPasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const handleUserConfirmPasswordChange = (e) => {
    setConfirmUserPassword(e.target.value);
  };

  const handleUserNicknameChange = (e) => {
    setUserNickname(e.target.value);
  };

  const handleUserEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleUserBirthdayChange = (e) => {
    setUserBirthday(e.target.value);
  };

  const handleUserJobChange = (e) => {
    setUserJob(e.target.value);
  };
  const handleUserConsumptionInterestChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setUserConsumptionInterest(selectedOptions);
  };
  const handleUserFinancialInterestChange = (e) => {
    setUserFinancialInterest(e.target.value);
  };

  const handleUserIdDuplicationCheck = () => {};

  const handleUserNicknameDuplicationCheck = () => {};

  const handleSubmit = (e) => {
    e.preventDeefault();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>일반회원 회원가입</h2>
        <div className="form-group">
          <label htmlFor="userId"> 아이디 </label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={handleUserIdChange}
            required
          />
          <button type="button" onClick={handleUserIdDuplicationCheck}>
            중복확인
          </button>
        </div>
        <div className="form-group">
          <label htmlfor="userPassword">비밀번호</label>
          <input
            type="password"
            id="userPassword"
            value={userPassword}
            onChange={handleUserPasswordChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmUserPassword"> 비밀번호 확인</label>
          <input
            type="password"
            id="confirmUserPassword"
            value={confirmUserPassword}
            onChange={handleUserConfirmPasswordChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userNickname">닉네임</label>
          <input
            type="text"
            id="userNickname"
            value={userNickname}
            onChange={handleUserNicknameChange}
            required
          />
          <button type="button" onClick={handleUserNicknameDuplicationCheck}>
            중복확인
          </button>
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

        <div className="form-group">
          <label htmlFor="userBirthday">생일</label>
          <input
            type="date"
            id="userBirthday"
            value={userBirthday}
            onChange={handleUserBirthdayChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userJob"> 직업군 </label>
          <select
            id="userJob"
            value={userJob}
            onChange={handleUserJobChange}
            required
          >
            <option value=""> 직업군을 선택하세요 </option>
            <option value="0">무직</option>
            <option value="1">학생</option>
            <option value="2">프리렌서</option>
            <option value="3">기획, 전략</option>
            <option value="4">마케팅, 홍보, 조사</option>
            <option value="5">회계, 세무, 재무 </option>
            <option value="6">인사, 노무, HRD</option>
            <option value="7">총무, 법무, 사무</option>
            <option value="8">IT, 개발, 데이터</option>
            <option value="9">디자인</option>
            <option value="10">영업, 판매, 무역</option>
            <option value="11">고객상담, TM </option>
            <option value="12">구매, 자재, 물류</option>
            <option value="13">상품기획, MD </option>
            <option value="14">운전, 운송, 배송</option>
            <option value="15">서비스</option>
            <option value="16">생산</option>
            <option value="17">의료</option>
            <option value="18">연구, R&D</option>
            <option value="19">교육</option>
            <option value="20">미디어, 문화, 스포츠</option>
            <option value="21">금융, 보험</option>
            <option value="22">공공, 복지</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="userConsumptionInterest">관심 소비분야 </label>
          {/* checkbox로 하는 게 좋을 것 같기도?? */}
          <select
            id="userConsumptionInterest"
            multiple
            value={userConsumptionInterest}
            onChange={handleUserConsumptionInterestChange}
            required
          >
            <option value="1">식비</option>
            <option value="2">주거비</option>
            <option value="3">교통비</option>
            <option value="4">의료/건강</option>
            <option value="5">생활용품</option>
            <option value="6">여가/문화</option>
            <option value="7">패션/미용</option>
            <option value="8">기타</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="userFinancialInterest">관심 금융분야 </label>
          <select
            id="userFinancialInterest"
            value={userFinancialInterest}
            onChange={handleUserFinancialInterestChange}
            required
          >
            <option value="1">금융</option>
            <option value="2">증권</option>
            <option value="3">산업/재계</option>
            <option value="4">중기/벤처</option>
            <option value="5">부동산</option>
            <option value="6">글로벌경제</option>
            <option value="7">생활경제</option>
            <option value="8">경제 일반</option>
          </select>
        </div>
        <button type="submit"> 회원가입 </button>
      </form>
    </div>
  );
};

export default RegisterGeneral;
