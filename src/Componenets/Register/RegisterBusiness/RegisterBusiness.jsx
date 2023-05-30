import React, { useState } from "react";
import "./RegisterBusiness.css";
import axios from 'axios';
import DaumPostCode from 'react-daum-postcode'

const RegisterBusiness = () => {
  const [generalId, setGeneralId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userName, setUserName] = useState("")

  const [userNickname, setUserNickname] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [job, setJob] = useState("");

  const [consumptionCat1, setConsumptionCat1] = useState("");
  const [salary, setSalary] = useState("");
  const [saving, setSaving] = useState("");


  const [financeCat, setFinanceCat] = useState("");
  const [businessNum, setBusinessNum] = useState("");
  const [tradeName, setTradeName] = useState("");
  const [location, setLocation] = useState("");

  //오류메시지 상태저장
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("")


  //유효성 검사
  const [isConfirmPassword, setIsConfirmPassword] = useState(false)
  const [isGeneralIdAvailable, setIsGeneralIdAvailable] = useState(false)
  const [isUserNicknameAvailable, setIsUserNicknameAvailable] = useState(false)


  //postcode
  const [openPostcode, setOpenPostcode] = useState(false);



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
  const handleConsumptionCat1Change = (e) => {
    // const selectedOptions = Array.from(
    //   e.target.selectedOptions,
    //   (option) => option.value
    // );
    setConsumptionCat1(e.target.value);
  };

  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
  };

  const handleSavingChange = (e) => {
    setSaving(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleFinanceCatChange = (e) => {
    setFinanceCat(e.target.value);
  };

  const handleBusinessNumChange = (e) => {
    setBusinessNum(e.target.value);
  };
  const handleTradeNameChange = (e) => {
    setTradeName(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleGeneralIdDuplicationCheck = () => {
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

  const handleBusinnessNicknameDuplicationCheck = () => {
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


  // 구현해야 될 부분들,,,
  const handleBusinessNumberCheck = () => { };

//   const handleBusinessAddressSearch = () => {
//     new daum.Postcode({
//       oncomplete: function (data) {
//         document.getElementsByName("address")[0].value = data.sido;
//         document.getElementsByName("address")[1].value = data.sigungu;
//         document.getElementsByName("address")[2].value = data.bname;
//         document.getElementById("addr").value = data.sido + " " + data.sigungu + " " + data.bname;
//       }
//     }).open();
//   }




  const handleSubmit = (e) => {
    setGeneralId("");
    setPassword("");
    setConfirmPassword("");
    setUserName("")
    setUserNickname("");
    setEmail("");
    setBirthDate("");
    setJob("");
    setConsumptionCat1("");
    setSalary("");
    setSaving("");
    setFinanceCat("");
    setBusinessNum("");
    setTradeName("");
    setLocation("");

    if (!isGeneralIdAvailable || !isUserNicknameAvailable) {
      alert("아이디와 닉네임 중복 확인이 필요합니다.");
      return e.preventDefault();
    }

    const data = {
      tmtUser: {
        generalId,
        password,
        userName,
        userNickname,
        email,
        birthDate,
        job,
        consumptionCat1,
        financeCat,
        salary,
        saving,
      },
      businessInfo: {
        generalId,
        businessNum,
        tradeName,
        location,
      }
    };

    axios.post('http://localhost:8899/register/businessUser', data)
      .then(response => {
        console.log(response);
        document.location.href = '/'
      })
      .catch(error => {
        console.error(error);
      });
   };

   const handleLocationFind = {
    // Button click event
    clickButton: () => {
        setOpenPostcode((current) => !current);
    },

    // Address selection event
    selectAddress: (data) => {
        console.log(`
            주소: ${data.address},
            우편번호: ${data.zonecode}
        `);
        setOpenPostcode(false);
    },
  };

  return (

    <div className="business-container">
      <form onSubmit={handleSubmit} className="signup-form" action="/">
        <h2>사업자 회원가입</h2>
        <div className="registerBusiness-form-group">
          <label className="registerBusiness-label" htmlFor="businnessId"> 아이디 </label>
          <input
            type="text"
            id="businnessId"
            value={generalId}
            onChange={handleGeneralIdChange}
            className="registerBusiness-input"
            required
          />
          <button className="registerBusiness-submit"  type="button" onClick={handleGeneralIdDuplicationCheck}>
            중복확인
          </button>
        </div>
        <div className="registerBusiness-form-group">
          <label className="registerBusiness-label" htmlfor="businnessPassword">비밀번호</label>
          <input
            type="password"
            id="businnessPassword"
            value={password}
            onChange={handlePasswordChange}
            className="registerBusiness-input"
            required
          />
        </div>
        <div className="registerBusiness-form-group">
          <label className="registerBusiness-label" htmlFor="confirmBusinnessPassword"> 비밀번호 확인</label>
          <input
            type="password"
            id="confirmBusinnessPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="registerBusiness-input"
            required
          />
          <br></br>
          {confirmPassword.length > 0 && (
            <span className={`message ${isConfirmPassword ? 'success' : 'error'}`}>{confirmPasswordMessage}</span>
          )}
        </div>

        <div className="registerBusiness-form-group">
          <label className="registerBusiness-label" htmlFor="userName">이름</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={handleUserNameChange}
            className="registerBusiness-input"
            required
          />
        </div>


        <div className="registerBusiness-form-group">
          <label className="registerBusiness-label" htmlFor="businnessNickname">닉네임</label>
          <input
            type="text"
            id="businnessNickname"
            value={userNickname}
            onChange={handleUserNicknameChange}
            className="registerBusiness-input"
            required
          />
          <button
            type="button"
            className="registerBusiness-submit" 
            onClick={handleBusinnessNicknameDuplicationCheck}>
            중복확인
          </button>
        </div>
        <div className="registerBusiness-form-group">
          <label className="registerBusiness-label" htmlFor="businnessEmail">이메일</label>
          <input
            type="email"
            id="businnessEmail"
            value={email}
            onChange={handleEmailChange}
            className="registerBusiness-input"
            required
          />
        </div>
        <div className="registerBusiness-form-group">
          <label className="registerBusiness-label" htmlFor="businnessBirthday">생일</label>
          <input
            type="date"
            id="businnessBirthday"
            value={birthDate}
            onChange={handleBirthDateChange}
            className="registerBusiness-input"
            required
          />
        </div>
        <div className="registerBusiness-form-group">
          <label className="registerBusiness-label" htmlFor="businnessJob"> 직업군 </label>
          <select
            id="businnessJob"
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
        <div className="registerBusiness-form-group">
          <label className="registerBusiness-label" htmlFor="businnessConsumptionInterest">관심 소비분야 </label>
          {/* checkbox로 하는 게 좋을 것 같기도?? */}
          <select
            id="businnessConsumptionInterest"
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
        <div className="registerBusiness-form-group">
          <label className="registerBusiness-label" htmlFor="businnessFinancialInterest">관심 금융분야 </label>
          <select
            id="businnessFinancialInterest"
            className="registerBusiness-select"
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


        <div className="registerBusiness-form-group">
          <label className="registerBusiness-label" htmlFor="salary">월급</label>
          <input
            type="number"
            id="salary"
            value={salary}
            onChange={handleSalaryChange}
            className="registerBusiness-input"
            required
          />
        </div>

        <div className="registerBusiness-form-group">
          <label className="registerBusiness-label" htmlFor="saving">월 목표 저축액</label>
          <input
            type="number"
            id="saving"
            value={saving}
            onChange={handleSavingChange}
            className="registerBusiness-input"
            required
          />
        </div>


        <div className="registerBusiness-form-group">
          <label className="registerBusiness-label" htmlFor="businessNumber"> 사업자 번호</label>
          <input
            type="text"
            id="businessNumber"
            value={businessNum}
            onChange={handleBusinessNumChange}
            required
            className="registerBusiness-input"
          />
          <button className="registerBusiness-submit"  type="button" onClick={handleBusinessNumberCheck}>
            인증하기
          </button>
        </div>
        <div className="registerBusiness-form-group">
          <label className="registerBusiness-label" htmlFor="businessTradeName">상호명</label>
          <input
            type="text"
            id="businessTradeName"
            value={tradeName}
            onChange={handleTradeNameChange}
            required
            className="registerBusiness-input"
          />
        </div>
        <div className="registerBusiness-form-group">
          <label className="registerBusiness-label" htmlFor="businessAddress">주소</label>
          <input
            type="text"
            id="businessAddress"
            value={location}
            onChange={handleLocationChange}
            required
            className="registerBusiness-input"
          />
          {/* <button type="button" onClick={handleBusinessAddressSearch}> */}
          <button onClick={handleLocationFind.clickButton} className="registerBusiness-submit">
            찾기
          </button>
          {openPostcode && (
            <DaumPostCode 
              style={ { width : '500px'}}
              onComplete = {handleLocationFind.selectAddress}
              autoClose = {false}
            />
          )}
        </div>
        <button className="registerBusiness-submit-btn" type="submit" disabled={!(isConfirmPassword)}> 회원가입 </button>
      </form>
    </div>
  );
};

export default RegisterBusiness;