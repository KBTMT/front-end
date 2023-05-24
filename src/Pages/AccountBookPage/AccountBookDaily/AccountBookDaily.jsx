import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import './AccountBookDaily.css' 
import MiniAccountbook from '../../../Componenets/MiniAccountBook/MiniAccountBook';

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
`;

const AddEmojiButton = styled(StyledButton)`
  background-color : 'white';
`

const AccountBookDaily = () => {
    
    const { formattedDate } = useParams();
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newMemo, setNewMemo] = useState('');

    console.log(formattedDate);
    useEffect(()=> {
        axios.get(`http://localhost:8899/account-book/daily/${formattedDate}`)
        .then(response => {
            
            setData(response.data);
            console.log(response.data);
        })
        .catch(error => console.log(error))
    }, [formattedDate]);

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
        let text = '';
        switch (consumptionCat) {
        case 0:
            text = '수입'
            break;
        case 1:
            text = '식비';
            break;
        case 2:
            text = '주거비';
            break;
        case 3:
            text = '교통비';
            break;
        case 4 :
            text = '의료/건강';
            break;
        case 5 :
            text = '생활용품';
            break;
        case 6 :
            text = '의료/건강';
            break;
        case 7 :
            text = '여가/문화';
            break;
        case 8 :
            text = '의료/건강';
            break;

        default :
            text = "카테고리 미지정";
            break;
        }   
        return text;
    };
    
    const handleAddMemo = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setNewMemo('');
    }

    const handleSaveMemo = () =>{
        console.log('save memo : ', newMemo);
        handleCloseModal();
    }

    const handleAddEmoji = () => {

    }

    return (
        <div className='accountBook-daily-container'>

            <div className = 'accountBook-daily-calendar' style={{ float : "left", width : "30%"}}>
                <MiniAccountbook />

            </div>
            <div className='accountBook-daily' style={{ float : "left", width :"40%", margin : "10px"}}>
            

            {data.map((item, index)=>(
                <table key={index} className="accountBook-daily-item-container" style={{ backgroundColor: getColorByPrice(item.price) }}>
                    <tbody>
                        <tr>
                            <td className="accountBook-daily-item-consumptionCat" >{getTextByconsumptionCat(item.consumptionCat)}</td>
                            <td></td>
                            <td className="accountBook-daily-item-time" >{item.time}</td>
                        </tr>
                        <tr>
                            <td className="accountBook-daily-item-accountContent">{item.accountContent}</td>
                            <td className="accountBook-daily-item-price">{item.price}</td>
                            <td rowSpan={2} className="accountBook-daily-item-emoji"> {item.emoji !== 0 ? (
                                item.emoji
                            ) : ( <AddEmojiButton onClick={handleAddEmoji}> 이모티콘을 추가하세요 </AddEmojiButton> )}
                            
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="accountBook-daily-item-memo"> {item.memo !== null ? (
                                item.memo
                            ) : ( <AddMemoButton onClick={handleAddMemo} isPositive={item.price > 0} > <img src={require("../../../img/document.png")}  style={{ height : '30px'}}/>메모를 추가하세요.</AddMemoButton> )} 
                            </td>
                        </tr>
                    </tbody>
                </table>
            ))}
            {showModal && (
                <div className="modal" style={{ height : "30%", width : "30%"}}>
                    <div className="modal-content" style={{ height :"70%"}}>
                        <textarea
                        value={newMemo}
                        style={{ height: "100%", width: "80%" }}
                        onChange={(e) => setNewMemo(e.target.value)}
                        placeholder="메모를 작성하세요 😊"
                        />
                        <div>
                        <SaveButton  onClick={handleSaveMemo}>메모 저장</SaveButton>
                        <CloseButton onClick={handleCloseModal}>창 닫기</CloseButton>
                        </div>
                    </div>
                </div>
            )}
        </div>

        </div>
        
    );
};

export default AccountBookDaily;