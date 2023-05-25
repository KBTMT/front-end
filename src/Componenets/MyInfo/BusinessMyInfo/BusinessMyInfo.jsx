import React, { useState, useEffect } from 'react';
import { redirect, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const ProfileContainer = styled.div`
  text-align: center;
  border-radius: 10px;
  background-color: #f0f0f0;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Row = styled.div`
  display: flex;
  align-items: center;  
  justify-content: center;
  margin-bottom : 10px;
`;

const Label = styled.label`
  flex: 0 0 30%;
  text-align: right;
  margin-right: 10px;
  padding-bottom : 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right : 120px;
  background-color : white;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #f8c291;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin : 5px;
  &:hover {
    background-color: #e17055;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
  margin-top: 20px;
  margin-bottom: 10px;
`;



const EditProfile = () => {


    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("")
    const [editing, setEditing] = useState(false);
    const [sessionData, setSessionData] = useState(JSON.parse(sessionStorage.getItem('vo')));
    const [isConfirmPassword, setIsConfirmPassword] = useState(false)
    const [businessInfo, setBusinessInfo] = useState("");

    useEffect(() => {
        const sessionDataFromStorage = JSON.parse(sessionStorage.getItem('vo'));
        setSessionData(sessionDataFromStorage);
        let generalId = sessionDataFromStorage.generalId;
        axios.get(`http://localhost:8899/getBusiness/${generalId}`, { params: { generalId } })
            .then(response => {
                setBusinessInfo(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    const [password, setPassword] = useState(sessionData.password);
    const [userName, setUserName] = useState(sessionData.userName)
    const [userNickname, setUserNickname] = useState(sessionData.userNickname);
    const [email, setEmail] = useState(sessionData.email);
    const [birthDate, setBirthDate] = useState(sessionData.birthDate);
    const [job, setJob] = useState(sessionData.job);
    const [consumptionCat1, setConsumptionCat1] = useState(sessionData.consumptionCat1);
    const [financeCat, setFinanceCat] = useState(sessionData.financeCat);
    const [salary, setSalary] = useState(sessionData.salary);
    const [saving, setSaving] = useState(sessionData.saving);




    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

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
        setConsumptionCat1(e.target.value);
    };
    const handleFinanceCatChange = (e) => {
        setFinanceCat(e.target.value);
    };


    const handleEditButtonClick = () => {
        setEditing(true);
    };

    const handleSaveButtonClick = () => {
        console.log("click");
        let generalId = sessionData.generalId;
        alert("클릭");
        axios.put('http://localhost:8899/update/generalUser', { generalId, password, userName, userNickname, email, birthDate, job, consumptionCat1, financeCat, salary, saving })
            .then(response => {
                alert("통신성공")
                console.log(response);
                sessionStorage.setItem("vo", JSON.stringify(response.data));
                setEditing(false);

                window.location.reload();
            })
            .catch(error => {
                console.error(error);
            });
    };


    const useConfirm = (message = null, onConfirm, onCancel) => {
        if (!onConfirm || typeof onConfirm !== "function") {
            return;
        }
        if (onCancel && typeof onCancel !== "function") {
            return;
        }

        const confirmAction = () => {
            if (window.confirm(message)) {
                onConfirm();
            } else {
                onCancel();
            }
        };

        return confirmAction;
    };
    const deleteConfirm = () => {
        let generalId = sessionData.generalId;
        alert(generalId)
        axios.delete(`http://localhost:8899/deleteUser/${generalId}`, { params: { generalId } })
            .then(response => {
                alert("회원 탈퇴 됨")
                sessionStorage.removeItem('vo');
                alert("세션 삭제됨")
                document.location.href = '/'
            })
            .catch(error => {
                console.error(error);
            });

    }
    const cancelConfirm = () => console.log("취소했습니다.");
    const confirmDelete = useConfirm(
        "삭제하시겠습니까?",
        deleteConfirm,
        cancelConfirm
    );




    const handleConfirmPasswordChange = (e) => {
        const passwordConfirmCurrent = e.target.value
        setConfirmPassword(passwordConfirmCurrent);
        if (sessionData.password === passwordConfirmCurrent) {
            setConfirmPasswordMessage("비밀번호를 똑같이 입력했어요!")
            setIsConfirmPassword(true)
        } else {
            setConfirmPasswordMessage("비밀번호가 틀려요. 다시 입력해주세요!")
            setIsConfirmPassword(false)
        }
    };


    if (!sessionData) {
        return null; // 데이터를 가져오는 동안 로딩 상태를 표시하거나, 다른 처리를 할 수 있습니다.
    }

    // const {
    //   password,
    //   userName,
    //   userNickname,
    //   email,
    //   birthDate,
    //   job,
    //   consumptionCat1,
    //   financeCat,
    //   salary,
    //   saving,
    // } = sessionData;




    return (
        <ProfileContainer>
            <Row>
                <Label>이름:</Label>
                <Input
                    type="text"
                    // name="name"
                    defaultValue={userName}
                    onChange={handleUserNameChange}
                    disabled={!editing}
                    required
                />
            </Row>
            <Row>
                <Label>비밀번호:</Label>
                <Input
                    type="password"
                    //name="password"
                    defaultValue={password}
                    onChange={handlePasswordChange}
                    disabled={!editing}
                    required
                />
            </Row>
            <Row>
                <Label>닉네임:</Label>
                <Input
                    type="text"
                    //name="nickname"
                    defaultValue={userNickname}
                    onChange={handleUserNicknameChange}
                    disabled={!editing}
                    required
                />
            </Row>
            <Row>
                <Label>이메일:</Label>
                <input
                    type="email"
                    //name="email"
                    defaultValue={email}
                    onChange={handleEmailChange}
                    disabled={!editing}
                    required
                />
            </Row>
            <row>
                <label>생일:</label>
                <input
                    type='text'
                    defaultValue={birthDate}
                    required
                    disabled></input>
                <input
                    type="date"
                    id="userBirthday"
                    onChange={handleBirthDateChange}
                    className="signup-date"
                    disabled={!editing}

                />
            </row>
            <row>
                <label>직업군:</label>
                <select
                    id="userJob"
                    defaultValue={job}
                    onChange={handleJobChange}
                    disabled={!editing}
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
            </row>

            <row>
                <label>관심 소비분야: </label>
                <select
                    id="userConsumptionInterest"
                    // multiple
                    defaultValue={consumptionCat1}
                    onChange={handleConsumptionCat1Change}
                    disabled={!editing}
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
            </row>
            <row>
                <label>관심 금융분야:</label>
                <select
                    id="userFinancialInterest"
                    defaultValue={financeCat}
                    onChange={handleFinanceCatChange}
                    disabled={!editing}
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
            </row>
            <row>
                <label>월급</label>
                <input
                    type="number"
                    //name="finance"
                    defaultValue={salary}
                    onChange={handleSalaryChange}
                    disabled={!editing}
                    required
                />
            </row>
            <row>
                <label>목표 절약 금액</label>
                <input
                    type="number"
                    //name="finance"
                    defaultValue={saving}
                    onChange={handleSavingChange}
                    disabled={!editing}
                    required
                />
            </row>
            <Row>
                <Label>사업자 번호:</Label>
                <Input
                    type="text"
                    id="buNum"
                    value={businessInfo.businessNum}
                    disabled
                    required
                />
            </Row>
            <row>
                <label>상호명:</label>
                <input
                    type="text"
                    //name="nickname"
                    value={businessInfo.tradeName}
                    disabled
                    required
                />
            </row>
            <row>
                <label>주소:</label>
                <input
                    type="text"
                    //name="nickname"
                    value={businessInfo.location}
                    disabled
                    required
                />
            </row>
            {!editing && (
                <Button onClick={handleEditButtonClick}>수정하기</Button>
            )}
            {editing && (
                <>
                    <label>
                        비밀번호 확인:
                        <input
                            type="password"
                            //name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                    </label>
                    <br></br>
                    {confirmPassword.length > 0 && (
                        <span className={`message ${isConfirmPassword ? 'success' : 'error'}`}>{confirmPasswordMessage}</span>
                    )}
                    <Button onClick={handleSaveButtonClick} disabled={!(isConfirmPassword)}>저장하기</Button>
                </>
            )}
            <DeleteButton onClick={confirmDelete}>
                탈퇴하기
            </DeleteButton>
        </ProfileContainer>
    );
};

export default EditProfile;
