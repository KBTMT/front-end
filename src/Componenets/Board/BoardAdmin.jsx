import React from "react";
import styled from "styled-components";

const BoardAdminContainer = styled.div`
background-color: #e5ecf6;
height: auto;
width: 70vw; /* 내가 보는 창 기준 80% 의미 */
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 10px;
padding : 20px 0px;
border-radius: 10px;
`;

const InnerBox = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  width:95%
  
`;

const AdminTitle = styled.div`
  display: flex;
  margin : 0px 0px;
  align-items: left;
  width: 60%;
`;

export default function BoardAdmin() {
    return (
      <BoardAdminContainer>
        <InnerBox>
          <AdminTitle>
          <h2>공지사항 : {"이건 공지사항입니다."}</h2>
          </AdminTitle>
        </InnerBox>
      </BoardAdminContainer>
    );
  };