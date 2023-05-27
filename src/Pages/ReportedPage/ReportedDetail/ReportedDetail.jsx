import React, { useState, useEffect } from "react";
import "./ReportedDetail.css";
import axios from 'axios';
import { useLocation, useParams, useNavigate } from "react-router-dom";

const ReportedDetail = () => {
  const navigate = useNavigate();
  const [itemData, setItemData] = useState(null);
  const location = useLocation();
  const reportedInfo = { ...location.state };
  const targetSeq = reportedInfo.targetSeq
  const status = reportedInfo.status
  const reportedFlag = reportedInfo.reportedFlag



  // useEffect(() => {
  //   axios.get(`http://localhost:8899/admin/reported/detail/${targetSeq}/${status}/${reportedFlag}`)
  //     .then(response => {
  //       setData(response.data);
  //     })
  //     .catch(error => console.log(error));
  // }, [targetSeq, status, reportedFlag]);

  useEffect(() => {
    // 선택한 아이템에 대한 데이터를 가져오는 비동기 요청
    // 예를 들어, axios.get() 등을 사용하여 서버로부터 데이터를 요청할 수 있습니다.
    // 아래의 예시 코드는 임시적인 예시이며 실제 데이터 요청을 구현해야 합니다.
    const fetchData = async () => {
      try {
        // 데이터 요청을 수행하고 받아온 데이터를 상태에 설정합니다.
        const response = await fetch(`http://localhost:8899/admin/reported/detail/${targetSeq}/${status}/${reportedFlag}`);
        const data = await response.json();
        setItemData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [targetSeq, status, reportedFlag]);


  const handleDelete = () => {
    const requestData = {
      data: {
        targetSeq,
        status,
        reportedFlag
      }
    };
    axios.delete('http://localhost:8899/admin/reported/detail/delete', requestData)
      .then(response => {
        alert("삭제되었습니다.");
        console.log(response.data);
        navigate("/admin/reported");
      })
      .catch(error => {
        // 요청이 실패한 경우 처리할 작업
        alert("삭제 실패")
        console.error(error);
      });
  };
  const handleApproved = () => {
    const data = {
      targetSeq,
      status,
      reportedFlag
    }
    axios.put('http://localhost:8899/admin/reported/detail/approve', data)
      .then(response => {
        alert("승인 처리되었습니다");
        console.log(response.data);
        navigate("/admin/reported");
      })
      .catch(error => {
        alert("에러 발생")
        console.error(error);
      });
  };
  return (
    <div className="reported-detail-container">
      <div className="reported-header">
        <h1 className="centered-heading">Reported</h1>
      </div>
      <hr className="reported_underline"></hr>
      <div>대상 시퀀스 : {reportedInfo.targetSeq}</div>
      {/* <div className="reported_content">{JSON.stringify(itemData)}</div> */}
      <button className="reported-delete-button" onClick={handleDelete}>
        삭제하기(대상도 삭제)
      </button>
      <button className="reported-pass-button" onClick={handleApproved}>
        검토완료
      </button>
      <hr className="reported_underline"></hr>
    </div>
  );
};

export default ReportedDetail;