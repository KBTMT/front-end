import styled from "styled-components";

const HeadlineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: auto;
  width: 95%;
  padding: 24px 0;
  background-color: #F0FFFF;
  border-radius: 15px;
  margin : 10px 0px;
`;

const HeadlineTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
`;

const HeadlineInfo = styled.div`
  width: 40%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

const HeadlineDate = styled.div`
  margin-right: 80px;
`;

const HeadlineWritter = styled.div``;

export default function BoardHeadline({title, boardDate, userNickname}) {
  return (
    <HeadlineContainer>
      <HeadlineTitle>
        <h2>{title}</h2>
      </HeadlineTitle>
      <HeadlineInfo>
        <HeadlineDate>q
          <p>{boardDate}</p>
        </HeadlineDate>
        <HeadlineWritter>
          <p>{userNickname}</p>
        </HeadlineWritter>
      </HeadlineInfo>
    </HeadlineContainer>
  );
}