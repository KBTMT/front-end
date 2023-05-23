import React, { useState, useEffect } from "react";
import "./ReportedDetail.css";
import axios from 'axios';
import { useParams,  useNavigate } from "react-router-dom";

const ReportedDetail = () => {
  const { reportedSeq, status, reportedFlag } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:8899/admin/reported/detail/${reportedSeq}/${status}/${reportedFlag}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.log(error));
  }, [reportedSeq, status, reportedFlag]);

  const handleDelete = () => {
    axios.delete(`http://localhost:8899/admin/reported/detail/delete/${reportedSeq}/${status}/${reportedFlag}`)
    .then(response => {
      alert("삭제되었습니다.");
      console.log(response.data);
      navigate("/admin/reported");
    })
    .catch(error => {
      // 요청이 실패한 경우 처리할 작업
      console.error(error);
    });
  };
  const handleApproved = () => {
    axios.put(`http://localhost:8899/admin/reported/detail/approve/${reportedSeq}/${status}/${reportedFlag}`,data)
    .then(response => {
      alert("승인 처리되었습니다");
      console.log(response.data);
      navigate("/admin/reported");
    })
    .catch(error => {
      console.error(error);
    });
  };
  return (
    <div className="reported-detail-container">
      <div className="reported-header">
        <h1 className="centered-heading">Reported</h1>
      </div>
      <hr className="reported_underline"></hr>
      <div>123123123</div>
      <div className="reported_content">{JSON.stringify(data)}</div>
      <button className="reported-delete-button" onClick={handleDelete}>
          삭제하기
      </button>
      <button className="reported-pass-button" onClick={handleApproved}>
          승인완료
      </button>
      <hr className="reported_underline"></hr>
    </div>
  );
};

export default ReportedDetail;