import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import './AccountBookDaily.css'
import MiniAccountbook from '../../../Componenets/MiniAccountBook/MiniAccountBook';
import Select from 'react-dropdown-select';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  width: 500px;
  margin-top: 20px;
  margin-right : 350px;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  width : 1200px;
`;

const StyledButton = styled.button`
  background-color: #f5f5f5;
  color: #333;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

const SaveButton = styled(StyledButton)`
  background-color: #4caf50;
  color: #fff;
  margin-right: 8px;

  &:hover {
    background-color: #45a049;
  }
`;

const CloseButton = styled(StyledButton)`
  background-color: #f44336;
  color: #fff;

  &:hover {
    background-color: #d32f2f;
  }
`;

const AddMemoButton = styled(StyledButton)`
  background-color: ${(props) => (props.isPositive ? 'rgba(138,198,209,1)' : 'rgba(255,182,185,1)')};
  color: #fff;
  &:hover {
    background-color: ${(props) => (props.isPositive ? '#1976d2' : '#d32f2f')};
  }
   z-index: 9999;
`;

const AddEmojiButton = styled(StyledButton)`
  background-color : 'white';
`

const EditModal = styled.div`
//   position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;


const AccountBookDaily = () => {

    const { formattedDate } = useParams();
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showMemoModal, setShowMemoModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newMemo, setNewMemo] = useState('');
    const [user, setUser] = useState([]);
    const [flag, setFlag] = useState(false);
    const [itemInfo, setItemInfo] = useState("");

    useEffect(() => {
        const userFromSession = JSON.parse(sessionStorage.getItem('vo'));
        if (userFromSession) {
            setUser(userFromSession);
        }
        setFlag(true);
        console.log("A")
    }, []);

    useEffect(() => {
        fetchData();
    }, [user]);


    const fetchData = async () => {
        console.log("A")
        try {
            const response = await axios.get(`http://localhost:8899/account-book/daily/${formattedDate}`, {
                params: {
                    generalId: user.generalId
                }
            });
            const data = response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const [discountCalendarOptions, setDiscountCalendarOptions] = useState([]);
    const [optionPlaceHolder, setOptionPlaceHolder] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8899/account-book/daily/${user.generalId}/${formattedDate}`)
            .then(response => {
                setData(response.data.accountBookList);
                console.log(response.data.dicountCalendarList);
                if (response.data.discountCalendarList.length > 0) {
                    const mappedOptions = response.data.discountCalendarList.map((item) => ({
                        value: item.discountSeq.toString(),
                        label: item.brand
                    }));
                    setDiscountCalendarOptions(mappedOptions);
                    setOptionPlaceHolder("티끌 기록하기     ");
                }
                else {
                    setDiscountCalendarOptions([]);
                    setOptionPlaceHolder("해당 날짜에 티끌이 없어요!        ");
                }
                console.log(response.data);
            })
            .catch(error => console.log(error))
    }, [formattedDate, flag]);

    const getColorByPrice = (price) => {
        if (price > 0) {
            console.log("A")
            return 'rgba(187,222,214,1)';
        } else if (price < 0) {
            console.log("A")
            return 'rgba(250,227,217,1)';
        } else {
            console.log("A")
            return '#';
        }
    };

    const getTextByconsumptionCat = (consumptionCat) => {
        let element;
        switch (consumptionCat) {
        case 0:
            element = <img src={require("../../../img/piggy-bank.png")} style={{ width : '50px'}}/>;
            break;
        case 1:
            element = <img src={require("../../../img/dish.png")} style={{ width : '50px'}}/>;            
            break;
        case 2:
            element = <img src={require("../../../img/house-cleaning.png")} style={{ width : '50px'}}/>;            
            break;
        case 3:
            element = <img src={require("../../../img/school-bus.png")} style={{ width : '50px'}}/>;            
            break;
        case 4 :
            element = <img src={require("../../../img/revitalizing.png")} style={{ width : '50px'}}/>;            
            break;
        case 5 :
            element = <img src={require("../../../img/clean-house.png")} style={{ width : '50px'}}/>;            
            break;
        case 6 :
            element = <img src={require("../../../img/cinema.png")} style={{ width : '50px'}}/>;            
            break;
        case 7 :
            element = <img src={require("../../../img/clothes.png")} style={{ width : '50px'}}/>;            
            break;
        case 8 :
            element = <img src={require("../../../img/flying-money.png")} style={{ width : '50px'}}/>;             
            break;

        default :
            element = <span>카테고리 미지정</span>;
            break;
        }   
        return element;
    };

    const getTextByEmoji = (emoji) => {
        let text;
        console.log("A")
        switch (emoji) {
            case 0:
                text = " ";
                break;
            case 1:
                text = "😀";
                break;
            case 2:
                text = "😑";
                break;
            case 3:
                text = "😥";
                break;
            default:
                text = " ";
                break;
        }
        return text;
    };


    const handleItemSelect = (item) => {
        // if (item.memo === null) {
        //     setSelectedItem(item);
        //     setShowEditModal(true);
        //   }
        setSelectedItem(item);
        setShowEditModal(true);
        console.log("A")
    }

    const handleAddMemo = () => {
        setShowMemoModal(true);
        console.log("A")
    }

    const handleCloseMemoModal = () => {
        setShowMemoModal(false);
        setNewMemo('');
        console.log("A")
    }

    const handleSaveMemo = (e) => {
        const data = {
            accountBookSeq: itemInfo.accountBookSeq,
            generalId: itemInfo.generalId,
            accountContent: itemInfo.accountContent,
            time: itemInfo.time,
            price: itemInfo.price,
            memo: e,
            discountSeq: itemInfo.discountSeq,
            emoji: itemInfo.emoji,
            consumptionCat: itemInfo.consumptionCat
        }

        axios.put('http://localhost:8899/account-book/update', data)
            .then(response => {
                alert("업데이트 처리되었습니다");
                console.log("A")
            })
            .catch(error => {
                alert("에러 발생")
                console.error(error);
            });

        handleCloseMemoModal();
        if (flag === true) {
            setFlag(false)
        } else setFlag(true)
    }

    const handleSaveEdit = (e) => {
        const data = {
            accountBookSeq: selectedItem.accountBookSeq,
            generalId: selectedItem.generalId,
            accountContent: e.target.content.value,
            time: e.target.time.value,
            price: e.target.price.value,
            memo: e.target.memo.value,
            discountSeq: selectedItem.discountSeq,
            emoji: e.target.emoji.value,
            consumptionCat: selectedItem.consumptionCat
        }
        console.log(data)
        axios.put('http://localhost:8899/account-book/update', data)
            .then(response => {
                alert("업데이트 처리되었습니다");
                console.log("A")
            })
            .catch(error => {
                alert("에러 발생")
                console.error(error);
            });



        handleCloseEditModal();
        if (flag === true) {
            setFlag(false)
        } else setFlag(true)
    }

    const handleCloseEditModal = () => {
        setSelectedItem(null);
        setShowEditModal(false);
        console.log("A")
    }

    const handleChangeEmoji = (e, target) => {
        const selectedValue = e[0].value

        const data = {
            accountBookSeq: target.accountBookSeq,
            generalId: target.generalId,
            accountContent: target.accountContent,
            time: target.time,
            price: target.price,
            memo: target.memo,
            discountSeq: target.discountSeq,
            emoji: selectedValue,
            consumptionCat: target.consumptionCat
        }

        axios.put('http://localhost:8899/account-book/update', data)
            .then(response => {
                alert("업데이트 처리되었습니다");
                console.log("A")
            })
            .catch(error => {
                alert("에러 발생")
                console.error(error);
            });
        if (flag === true) {
            setFlag(false)
        } else setFlag(true)
    }

    const handleAddEmoji = () => {

    }

    const handleTickle = (selectedOption, index) => {
        const userFromSession = JSON.parse(sessionStorage.getItem('vo'));

        axios.put(`http://localhost:8899/account-book/daily/used/${data[index].accountBookSeq}`, { discountSeq: selectedOption[0].value, generalId: userFromSession.generalId })
            .then(response => {
                console.log(response);
                alert(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <Wrapper>
            <Img src={require('../../../img/tickle_write_bar.png')} style={{ width : "500px" }}/>
            <ContentWrapper>
            <div className='accountBook-daily-calendar' style={{ float: "left", width: "450px" }}>
                <MiniAccountbook />
            </div>
            <div className='accountBook-daily' style={{ float: "left", width: "40%", margin: "10px" }}>
                {data.map((item, index) => (
                    <table
                        key={index}
                        className="accountBook-daily-item-container"
                        style={{ backgroundColor: getColorByPrice(item.price) , border : "none"}}
                        
                    >
                        {/* 금액 누를 시 나오는 요소들 출력하는 부분 */}
                        <tbody>
                            <tr onClick={() => handleItemSelect(item)}>
                                <td className="accountBook-daily-item-consumptionCat" >{getTextByconsumptionCat(item.consumptionCat)}</td>
                                <td></td>
                                <td className="accountBook-daily-item-time" >{item.time}</td>
                            </tr>
                            <tr>
                                <td className="accountBook-daily-item-accountContent" onClick={() => handleItemSelect(item)} >{item.accountContent}</td>
                                <td className="accountBook-daily-item-price" onClick={() => handleItemSelect(item)}>{item.price}</td>
                                <td className="accountBook-daily-item-emoji"> {item.emoji !== 0 ? (
                                    getTextByEmoji(item.emoji)
                                ) : (
                                    // <AddEmojiButton onClick={handleAddEmoji}> 이모티콘을 추가하세요 </AddEmojiButton> 
                                    <Select
                                        placeholder="이모티콘을 선택하세요        "
                                        options={[{ value: '1', label: '😀' }, { value: '2', label: '😐' }, { value: '3', label: '😥' }]}
                                        onChange={(e) => handleChangeEmoji(e, item)}
                                        color='rgb(255, 243, 184)'
                                    />
                                )}
                                </td>
                            </tr>

                            {/* 메모를 추가하세요 버튼 */}
                            <tr>
                                <td colSpan={2} className="accountBook-daily-item-memo">
                                    {item.memo !== null ? (
                                        item.memo
                                    ) : (<AddMemoButton onClick={() => { handleAddMemo(); setItemInfo(item); }} isPositive={item.price > 0} > <img src={require("../../../img/document.png")} style={{ height: '30px' }} />메모를 추가하세요.</AddMemoButton>)}
                                </td>
                                <td>
                                    <Select
                                        placeholder={optionPlaceHolder}
                                        options={discountCalendarOptions}
                                        onChange={(selectedOption) => handleTickle(selectedOption, index)} color='rgb(255, 243, 184)' />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ))}


                {/* 이 부분은 메모를 추가하세요를 누를 시 나오는 화면 */}
                {showMemoModal && (
                    <div className="modal" style={{ height: "30%", width: "30%" }}>
                        <div className="Memo-modal-content" style={{ height: "70%" }}>
                            <textarea
                                value={newMemo}
                                style={{ height: "100%", width: "80%", marginTop:"20px", border : "solid 1px" }}
                                onChange={(e) => setNewMemo(e.target.value)}
                                placeholder="메모를 작성하세요 😊"
                            />
                            <div>
                                <SaveButton onClick={() => handleSaveMemo(newMemo)}>메모 저장</SaveButton>
                                <CloseButton onClick={handleCloseMemoModal}>창 닫기</CloseButton>
                            </div>
                        </div>
                    </div>
                )}


                {/* 이 부분은 클릭 시 수정화면이 뜨는 부분 */}
                {showEditModal && (
                    <div className='modal' style={{ height: '50%', width: '50%' }}>
                        <div className="Edit-modal-content" style={{ height: '90%', marginTop : '20px'}}>
                            {selectedItem && (
                                <form onSubmit={handleSaveEdit} style={{ marginTop : '20px'}}>
                                    <div style={{ marginTop : '10px'}}>
                                        <label> category :</label>
                                        <span>{getTextByconsumptionCat(selectedItem.consumptionCat)}</span>
                                    </div>
                                    <div style={{ marginTop : '15px'}}>
                                        <label style={{ marginRight : '10px'}}> 내역: </label>
                                        <input
                                            name="content"
                                            defaultValue={selectedItem.accountContent} />
                                        {/* <span> {selectedItem.accountContent} </span> */}
                                    </div>
                                    <div style={{ marginTop : '15px'}}>
                                        <label style={{ marginRight : '10px'}}> 금액 : </label>
                                        <input
                                            id="price"
                                            defaultValue={selectedItem.price} />
                                        {/* <span> {selectedItem.price} </span> */}
                                    </div>
                                    <div style={{ marginTop : '15px'}}>
                                        <label style={{ marginRight : '10px'}}> 사용 시간 : </label>
                                        <input
                                            name="time"
                                            defaultValue={selectedItem.time} />
                                        {/* <span> {selectedItem.time} </span> */}
                                    </div>
                                    <div style={{ marginTop : '15px'}}>
                                        <label style={{ marginRight : '10px'}}> 메모 : </label>
                                        <input
                                            name="memo"
                                            defaultValue={selectedItem.memo} />
                                        {/* <span> {selectedItem.memo} </span> */}
                                    </div>
                                    <div style={{ marginTop : '15px'}}>
                                        <label style={{ marginRight : '10px'}}> EMOJI : </label>
                                        <input
                                            name="emoji"
                                            defaultValue={selectedItem.emoji} />
                                        {/* <span> {selectedItem.time} </span> */}
                                    </div>
                                    <div style={{ marginTop : '15px'}}>
                                        <SaveButton type='submit'>저장</SaveButton>
                                        <CloseButton onClick={handleCloseEditModal}>취소</CloseButton>
                                    </div>
                                </form>

                            )}

                        </div>
                    </div>
                )}
            </div>

            </ContentWrapper>
            
        </Wrapper>
    );
};

export default AccountBookDaily;