import React, { useState, useEffect } from "react";
import "./Reported.css";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Reported = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [dataList, setDataList] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    axios.get('http://localhost:8899/admin/reported')
      .then(response => {
        setDataList(response.data);
      })
      .catch(error => console.log(error))
  }, []);

  // 현재 페이지에 해당하는 아이템들을 추출하는 함수
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return dataList.slice(startIndex, endIndex);
  };

  // 이전 페이지로 이동하는 함수
  const goToPreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  // 다음 페이지로 이동하는 함수
  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const goDetail = (target) => {
    navigate(`/admin/reported/detail/${target.targetSeq}/${target.status}/${target.reportedFlag}`, {
      state: {
        targetSeq: target.targetSeq,
        status: target.status,
        reportedFlag: target.reportedFlag
      }
    })
    alert(target.targetSeq)
  }

  const totalPages = Math.ceil(dataList.length / itemsPerPage);

  return (
    <div className="reported-container">
      <div className="reported-header">
        <h1 className="centered-heading">Reported</h1>
      </div>
      <hr className="reported_underline"></hr>
      <ul className="reported-custom-list">
        {getCurrentItems().map((item, index) => (
          <text onClick={() => goDetail(item)}
            className="reported_get_detail"
            style={{ textDecoration: 'none' }}>
            {/* <li key={index}>{index}   :   {JSON.stringify(item)}</li> */}
            <li key={index}>targetSeq : {item.targetSeq}, status : {item.status}, flag : {item.reportedFlag} </li>
          </text>
        ))}
      </ul>
      <hr className="reported_underline"></hr>
      <div className="pagination">
        <button className="reported-button" onClick={goToPreviousPage} disabled={currentPage === 1}>
          이전
        </button>
        <button className="reported-button" onClick={goToNextPage} disabled={currentPage === totalPages}>
          다음
        </button>
      </div>
    </div>
  );
};

export default Reported;