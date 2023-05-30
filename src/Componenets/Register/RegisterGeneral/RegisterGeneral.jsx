import React, { useState } from "react";
import "./RegisterGeneral.css";
import axios from 'axios';

const RegisterGeneral = ({ }) => {
  const [generalId, setGeneralId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("")
  const [userNickname, setUserNickname] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [job, setJob] = useState("");
  const [consumptionCat1, setConsumptionCat1] = useState("");
  const [financeCat, setFinanceCat] = useState("");
  const [salary, setSalary] = useState("");
  const [saving, setSaving] = useState("");

  //오류메시지 상태저장
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("")


  //유효성 검사
  const [isConfirmPassword, setIsConfirmPassword] = useState(false)
  const [isGeneralIdAvailable, setIsGeneralIdAvailable] = useState(false)
  const [isUserNicknameAvailable, setIsUserNicknameAvailable] = useState(false)


  const handleGeneralIdChange = (e) => {
    setGeneralId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const passwordCurrent = e.target.value
    setPassword(passwordCurrent);
    if (passwordCurrent === confirmPassword) {
      setConfirmPasswordMessage("비밀번호를 똑같이 입력했어요!")
      setIsConfirmPassword(true)
    } else {
      setConfirmPasswordMessage("비밀번호가 틀려요. 다시 입력해주세요!")
      setIsConfirmPassword(false)
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const passwordConfirmCurrent = e.target.value
    setConfirmPassword(passwordConfirmCurrent);
    if (password === passwordConfirmCurrent) {
      setConfirmPasswordMessage("비밀번호를 똑같이 입력했어요!")
      setIsConfirmPassword(true)
    } else {
      setConfirmPasswordMessage("비밀번호가 틀려요. 다시 입력해주세요!")
      setIsConfirmPassword(false)
    }
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleUserNicknameChange = (e) => {
    setUserNickname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleBirthDateChange = (e) => {
    setBirthDate(e.target.value);
  };

  const handleJobChange = (e) => {
    setJob(e.target.value);
  };

  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
  };

  const handleSavingChange = (e) => {
    setSaving(e.target.value);
  };

  const handleConsumptionCat1Change = (e) => {
    // const selectedOptions = Array.from(
    //   e.target.selectedOptions,
    //   (option) => option.value
    // );
    setConsumptionCat1(e.target.value);
  };
  const handleFinanceCatChange = (e) => {
    setFinanceCat(e.target.value);
  };

  const handleUserIdDuplicationCheck = () => {
    axios
      .get(`http://localhost:8899/idExist?generalId=${generalId}`)
      .then(response => {
        if (response.data) {
          setIsGeneralIdAvailable(false);
          alert("이미 사용 중인 아이디입니다.");
        } else {
          setIsGeneralIdAvailable(true);
          alert("사용 가능한 아이디입니다.");
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleUserNicknameDuplicationCheck = () => {
    axios
      .get(`http://localhost:8899/nicknameExist?userNickname=${userNickname}`)
      .then(response => {
        if (response.data) {
          setIsUserNicknameAvailable(false);
          alert("이미 사용 중인 닉네임입니다.");
        } else {
          setIsUserNicknameAvailable(true);
          alert("사용 가능한 닉네임입니다.");
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSubmit = (e) => {

    setUserNickname("");
    setGeneralId("");
    setPassword("");
    setUserName("");
    setEmail("");
    setBirthDate("");
    setJob("");
    setConsumptionCat1("");
    setFinanceCat("");

    if (!isGeneralIdAvailable || !isUserNicknameAvailable) {
      alert("아이디와 닉네임 중복 확인이 필요합니다.");
      return e.preventDefault();
    }
    axios.post('http://localhost:8899/register/generalUser', { generalId, password, userName, userNickname, email, birthDate, job, consumptionCat1, financeCat, salary, saving })
      .then(response => {
        console.log(response);
        document.location.href = '/'
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form" action="/">
        <h2>일반회원 회원가입</h2>
        <div className="registerGeneral-form-group">
          <label className="registerGeneral-label" htmlFor="userId"> 아이디 </label>
          <input
            type="text"
            id="userId"
            value={generalId}
            onChange={handleGeneralIdChange}
            className="signup-input"
            required
          />
          <button type="button" onClick={handleUserIdDuplicationCheck}>
            중복확인
          </button>
        </div>
        <div className="registerGeneral-form-group">
          <label className="registerGeneral-label" htmlfor="userPassword">비밀번호</label>
          <input
            type="password"
            id="userPassword"
            value={password}
            onChange={handlePasswordChange}
            className="signup-input"
            required
          />
        </div>
        <div className="registerGeneral-form-group">
          <label className="registerGeneral-label" htmlFor="confirmUserPassword"> 비밀번호 확인</label>
          <input
            type="password"
            id="confirmUserPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="signup-input"
            required
          />
          <br></br>
          {confirmPassword.length > 0 && (
            <span className={`message ${isConfirmPassword ? 'success' : 'error'}`}>{confirmPasswordMessage}</span>
          )}
        </div>

        <div className="registerGeneral-form-group">
          <label className="registerGeneral-label" htmlFor="userName">이름</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={handleUserNameChange}
            className="signup-input"
            required
          />
        </div>

        <div className="registerGeneral-form-group">
          <label className="registerGeneral-label" htmlFor="userNickname">닉네임</label>
          <input
            type="text"
            id="userNickname"
            value={userNickname}
            onChange={handleUserNicknameChange}
            className="signup-input"
            required
          />
          <button type="button" onClick={handleUserNicknameDuplicationCheck}>
            중복확인
          </button>
        </div>
        <div className="registerGeneral-form-group">
          <label className="registerGeneral-label" htmlFor="userEmail">이메일</label>
          <input
            type="email"
            id="userEmail"
            value={email}
            onChange={handleEmailChange}
            className="signup-input"
            required
          />
        </div>

        <div className="registerGeneral-form-group">
          <label className="registerGeneral-label" htmlFor="userBirthday">생일</label>
          <input
            type="date"
            id="userBirthday"
            value={birthDate}
            onChange={handleBirthDateChange}
            className="signup-date"
            required
          />
        </div>
        <div className="registerGeneral-form-group">
          <label className="registerGeneral-label" htmlFor="userJob"> 직업군 </label>
          <select
            id="userJob"
            value={job}
            onChange={handleJobChange}
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
        <div className="registerGeneral-form-group">
          <label className="registerGeneral-label" htmlFor="userConsumptionInterest">관심 소비분야 </label>
          {/* checkbox로 하는 게 좋을 것 같기도?? */}
          <select
            id="userConsumptionInterest"
            // multiple
            value={consumptionCat1}
            onChange={handleConsumptionCat1Change}
            required
          >
            <option value="0">없음</option>
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
        <div className="registerGeneral-form-group">
          <label className="registerGeneral-label" htmlFor="userFinancialInterest">관심 금융분야 </label>
          <select
            id="userFinancialInterest"
            className="registerGeneral-select"
            value={financeCat}
            onChange={handleFinanceCatChange}
            required
          >
            <option value="0">없음</option>
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

        <div className="registerGeneral-form-group">
          <label className="registerGeneral-label" htmlFor="salary">월급</label>
          <input
            type="number"
            id="salary"
            value={salary}
            onChange={handleSalaryChange}
            className="signup-input"
            required
          />
        </div>

        <div className="registerGeneral-form-group">
          <label className="registerGeneral-label" htmlFor="saving">월 목표 저축액</label>
          <input
            type="number"
            id="saving"
            value={saving}
            onChange={handleSavingChange}
            className="signup-input"
            required
          />
        </div>

        <button className="registerGeneral-btn" type="submit" disabled={!(isConfirmPassword)}> 회원가입 </button>
      </form>
    </div>
  );
};

export default RegisterGeneral;
