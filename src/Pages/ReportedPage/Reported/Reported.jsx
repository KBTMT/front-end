import React, { useState, useEffect } from "react";
import "./Reported.css";
import axios from 'axios';
import { Link } from "react-router-dom";

const Reported = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8899/admin/reported')
      .then(response =>{ 
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

  const totalPages = Math.ceil(dataList.length / itemsPerPage);

  return (
    <div className="reported-container">
      <div className="reported-header">
        <h1 className="centered-heading">Reported</h1>
      </div>
      <hr className="reported_underline"></hr>
      <ul className="reported-custom-list">
        {getCurrentItems().map((item, index) => (
          <Link to={`/admin/reported/detail/${item.reportedSeq}/${item.status}/${item.reportedFlag}`} className="reported_get_detail" style={ { textDecoration : 'none' 
          }}> 
          {/* <li key={index}>{index}   :   {JSON.stringify(item)}</li> */}
          <li key={index}>reportedSeq : {item.reportedSeq}, status : {item.status}, flag : {item.reportedFlag} </li>
          </Link>
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