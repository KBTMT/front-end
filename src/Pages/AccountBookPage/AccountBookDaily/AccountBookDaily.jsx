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
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  width : 1000px;
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

    useEffect(() => {
    const userFromSession = JSON.parse(sessionStorage.getItem('vo'));
    if (userFromSession) {
      setUser(userFromSession);
    }
    setFlag(true);
    }, []);

    useEffect(() => {
        fetchData();
    }, [user]);


    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8899/account-book/daily/${formattedDate}`,{
                params: {
                    generalId : user.generalId
                }
            });
            const data = response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const [discountCalendarOptions, setDiscountCalendarOptions] = useState([]);
    const [optionPlaceHolder, setOptionPlaceHolder] = useState("");

    useEffect(()=> {
        axios.get(`http://localhost:8899/account-book/daily/${user.generalId}/${formattedDate}`)
        .then(response => {
            setData(response.data.accountBookList);
            console.log(response.data.dicountCalendarList);
            if(response.data.discountCalendarList.length > 0){
                const mappedOptions = response.data.discountCalendarList.map((item) => ({
                    value: item.discountSeq.toString(),
                    label: item.brand
                }));
                setDiscountCalendarOptions(mappedOptions);
                setOptionPlaceHolder("티끌 기록하기     ");
            }
            else{
                setDiscountCalendarOptions([]);
                setOptionPlaceHolder("해당 날짜에 티끌이 없어요!        ");
            }
            console.log(response.data);
        })
        .catch(error => console.log(error))
    }, [formattedDate, flag]);

    const getColorByPrice = (price) => {
        if (price > 0) {
          return 'rgba(187,222,214,1)'; 
        } else if (price < 0) {
          return 'rgba(250,227,217,1)'; 
        } else {
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
        default :
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
    }
    
    const handleAddMemo = () => {
        setShowMemoModal(true);
    }

    const handleCloseMemoModal = () => {
        setShowMemoModal(false);
        setNewMemo('');
    }

    const handleSaveMemo = () =>{
        handleCloseMemoModal();
    }

    const handleSaveEdit = () => {
        handleCloseEditModal();
    }

    const handleCloseEditModal= () =>{
        setSelectedItem(null);
        setShowEditModal(false);
    }
   
    const handleAddEmoji = () => {

    }

    const handleTickle = (selectedOption, index) => {
        const userFromSession = JSON.parse(sessionStorage.getItem('vo'));
        
        axios.put(`http://localhost:8899/account-book/daily/used/${data[index].accountBookSeq}`, {discountSeq : selectedOption[0].value, generalId : userFromSession.generalId})
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
                <div className = 'accountBook-daily-calendar' style={{ float : "left", width :"70%"}}>
                <MiniAccountbook />
                </div>
            <div className='accountBook-daily' style={{ float : "left", width :"60%", margin : "10px"}}>
            {data.map((item, index)=>(
                <table 
                key={index} 
                className="accountBook-daily-item-container" 
                style={{ backgroundColor: getColorByPrice(item.price) }} 
                >
                    <tbody>
                        <tr onClick={()=> handleItemSelect(item)}>
                            <td className="accountBook-daily-item-consumptionCat" >{getTextByconsumptionCat(item.consumptionCat)}</td>
                            <td></td>
                            <td className="accountBook-daily-item-time" >{item.time}</td>
                        </tr>
                        <tr>
                            <td className="accountBook-daily-item-accountContent" onClick={()=> handleItemSelect(item)} >{item.accountContent}</td>
                            <td className="accountBook-daily-item-price" onClick={()=> handleItemSelect(item)}>{item.price}</td>
                            <td className="accountBook-daily-item-emoji"> {item.emoji !== 0 ? (
                                getTextByEmoji(item.emoji)
                            ) : ( 
                            // <AddEmojiButton onClick={handleAddEmoji}> 이모티콘을 추가하세요 </AddEmojiButton> 
                            <Select
                                placeholder = "이모티콘을 선택하세요        "
                                options = {[{value : '1', label : '😀'},{value : '2' , label : '😐'},{value : '3' , label : '😥'}]}
                                onChange={(selectedOption) => console.log(selectedOption)}
                                color = 'rgb(255, 243, 184)'
                            />
                            )}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="accountBook-daily-item-memo"> 
                            {item.memo !== null ? (
                                item.memo
                            ) : ( <AddMemoButton onClick={handleAddMemo} isPositive={item.price > 0} > <img src={require("../../../img/document.png")}  style={{ height : '30px'}}/>메모를 추가하세요.</AddMemoButton> )} 
                            </td>
                            <td>
                                <Select
                                placeholder = {optionPlaceHolder}
                                options = {discountCalendarOptions}
                                onChange={(selectedOption) => handleTickle(selectedOption, index)}  color = 'rgb(255, 243, 184)' />
                            </td>
                        </tr>
                    </tbody>
                </table>
            ))}
            {showMemoModal && (
                <div className="modal" style={{ height : "30%", width : "30%"}}>
                    <div className="Memo-modal-content" style={{ height :"70%"}}>
                        <textarea
                        value={newMemo}
                        style={{ height: "100%", width: "80%" }}
                        onChange={(e) => setNewMemo(e.target.value)}
                        placeholder="메모를 작성하세요 😊"
                        />
                        <div>
                        <SaveButton  onClick={handleSaveMemo}>메모 저장</SaveButton>
                        <CloseButton onClick={handleCloseMemoModal}>창 닫기</CloseButton>
                        </div>
                    </div>
                </div>
            )}
            {showEditModal && (
                <div className='modal' style={{ height: '50%', width: '50%' }}>
                    <div className="Edit-modal-content" style={{ height: '90%' }}>

                        {selectedItem && (
                        <form>
                            <div>
                                <label> category :</label>    
                                <span>{getTextByconsumptionCat(selectedItem.consumptionCat)}</span>
                            </div>
                            <div>
                                <label> 내역: </label>
                                <input defaultValue={selectedItem.accountContent} />
                            </div>
                            <div>
                                <label> 금액 : </label>
                                <input defaultValue={selectedItem.price} />
                            </div>
                            <div>
                                <label> 사용처 : </label>
                                <input defaultValue={selectedItem.accountContent} />
                            </div>
                            <div>
                                <label> 사용 시간 : </label>
                                <input defaultValue={selectedItem.time} />
                            </div>
                            <div>
                                <label> 메모 : </label>
                                <input defaultValue={selectedItem.memo} />
                            </div>
                            <div>
                                <label> EMOJI : </label>
                                <input defaultValue={selectedItem.emoji} />
                            </div>
                            <div>
                            <SaveButton onClick={handleSaveEdit}>저장</SaveButton>
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