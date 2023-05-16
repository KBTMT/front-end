import React, { useState } from "react";
import "./RegisterBusiness.css";

const RegisterBusiness = () => {
  const [businnessId, setBusinnessId] = useState("");
  const [businnessPassword, setBusinnessPassword] = useState("");
  const [confirmBusinnessPassword, setConfirmBusinnessPassword] = useState("");
  const [businnessNickname, setBusinnessNickname] = useState("");
  const [businnessEmail, setBusinnessEmail] = useState("");
  const [businnessBirthday, setBusinnessBirthday] = useState("");
  const [businnessJob, setBusinnessJob] = useState("");
  const [
    businnessConsumptionInterest,
    setBusinnessConsumptionInterest
  ] = useState([]);
  const [businnessFinancialInterest, setBusinnessFinancialInterest] = useState(
    ""
  );
  const [businessNumber, setBusinessNumber] = useState("");
  const [businessTradeName, setBusinessTradeName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");

  const handleBusinnessIdChange = (e) => {
    setBusinnessId(e.target.value);
  };

  const handleBusinnessPasswordChange = (e) => {
    setBusinnessPassword(e.target.value);
  };

  const handleBusinnessConfirmPasswordChange = (e) => {
    setConfirmBusinnessPassword(e.target.value);
  };

  const handleBusinnessNicknameChange = (e) => {
    setBusinnessNickname(e.target.value);
  };

  const handleBusinnessEmailChange = (e) => {
    setBusinnessEmail(e.target.value);
  };

  const handleBusinnessBirthdayChange = (e) => {
    setBusinnessBirthday(e.target.value);
  };

  const handleBusinnessJobChange = (e) => {
    setBusinnessJob(e.target.value);
  };
  const handleBusinnessConsumptionInterestChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setBusinnessConsumptionInterest(selectedOptions);
  };
  const handleBusinnessFinancialInterestChange = (e) => {
    setBusinnessFinancialInterest(e.target.value);
  };
  const handleBusinessNumberChange = (e) => {
    setBusinessNumber(e.target.value0);
  };
  const handleBusinessTradeNameChange = (e) => {
    setBusinessTradeName(e.target.value);
  };

  const handleBusinessAddressChange = (e) => {
    setBusinessAddress(e.taret.value);
  };

  const handleBusinnessIdDuplicationCheck = () => {};

  const handleBusinnessNicknameDuplicationCheck = () => {};

  const handleBusinessNumberCheck = () => {};

  const handleBusinessAddressSearch = () => {};

  const handleSubmit = (e) => {
    e.preventDeefault();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>사업자 회원가입</h2>
        <div className="form-group">
          <label htmlFor="businnessId"> 아이디 </label>
          <input
            type="text"
            id="businnessId"
            value={businnessId}
            onChange={handleBusinnessIdChange}
            required
          />
          <button type="button" onClick={handleBusinnessIdDuplicationCheck}>
            중복확인
          </button>
        </div>
        <div className="form-group">
          <label htmlfor="businnessPassword">비밀번호</label>
          <input
            type="password"
            id="businnessPassword"
            value={businnessPassword}
            onChange={handleBusinnessPasswordChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmBusinnessPassword"> 비밀번호 확인</label>
          <input
            type="password"
            id="confirmBusinnessPassword"
            value={confirmBusinnessPassword}
            onChange={handleBusinnessConfirmPasswordChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="businnessNickname">닉네임</label>
          <input
            type="text"
            id="businnessNickname"
            value={businnessNickname}
            onChange={handleBusinnessNicknameChange}
            required
          />
          <button
            type="button"
            onClick={handleBusinnessNicknameDuplicationCheck}
          >
            중복확인
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="businnessEmail">이메일</label>
          <input
            type="email"
            id="businnessEmail"
            value={businnessEmail}
            onChange={handleBusinnessEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="businnessBirthday">생일</label>
          <input
            type="date"
            id="businnessBirthday"
            value={businnessBirthday}
            onChange={handleBusinnessBirthdayChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="businnessJob"> 직업군 </label>
          <select
            id="businnessJob"
            value={businnessJob}
            onChange={handleBusinnessJobChange}
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
          <label htmlFor="businnessConsumptionInterest">관심 소비분야 </label>
          {/* checkbox로 하는 게 좋을 것 같기도?? */}
          <select
            id="businnessConsumptionInterest"
            multiple
            value={businnessConsumptionInterest}
            onChange={handleBusinnessConsumptionInterestChange}
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
          <label htmlFor="businnessFinancialInterest">관심 금융분야 </label>
          <select
            id="businnessFinancialInterest"
            value={businnessFinancialInterest}
            onChange={handleBusinnessFinancialInterestChange}
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
        <div className="form-group">
          <label htmlFor="businessNumber"> 사업자 번호</label>
          <input
            type="text"
            id="businessNumber"
            value={businessNumber}
            onChange={handleBusinessNumberChange}
            required
          />
          <button type="button" onClick={handleBusinessNumberCheck}>
            인증하기
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="businessTradeName">상호명</label>
          <input
            type="text"
            id="businessTradeName"
            value={businessTradeName}
            onChange={handleBusinessTradeNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="businessAddress">주소</label>
          <input
            type="text"
            id="businessAddress"
            value={businessAddress}
            onChange={handleBusinessAddressChange}
            required
          />
          <button type="button" onClick={handleBusinessAddressSearch}>
            찾기
          </button>
        </div>
        <button type="submit"> 회원가입 </button>
      </form>
    </div>
  );
};

export default RegisterBusiness;
