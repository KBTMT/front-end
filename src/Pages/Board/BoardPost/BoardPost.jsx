import React, { useState } from 'react';
import styled from 'styled-components';

const StyledPost = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
`;

const Title = styled.h2`
  color: #333;
`;

const Date = styled.p`
  color: #777;
`;

const Author = styled.p`
  color: #777;
`;

const Content = styled.p`
  color: #333;
`;

const Comment = styled.p`
  color: #555;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #555;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
`;

const BoardPost = () => {
  const [post, setPost] = useState({
    title: '게시물 제목',
    date: '2023-05-22',
    author: '작성자',
    content: '게시물 내용입니다.',
  });
  const [comments, setComments] = useState([
    '첫 번째 댓글',
    '두 번째 댓글',
    '세 번째 댓글',
  ]);

  const handleEdit = () => {
    // 수정하기 버튼 클릭 시 수행할 작업
    console.log('Edit button clicked');
  };

  const handleDelete = () => {
    // 삭제하기 버튼 클릭 시 수행할 작업
    console.log('Delete button clicked');
  };

  return (
    <StyledPost>
      <Title>{post.title}</Title>
      <Date>Date: {post.date}</Date>
      <Author>Author: {post.author}</Author>
      <Content>{post.content}</Content>

      <h3>Comments</h3>
      {comments.map((comment, index) => (
        <Comment key={index}>{comment}</Comment>
      ))}

      <ButtonContainer>
        <Button onClick={handleEdit}>수정하기</Button>
        <Button onClick={handleDelete}>삭제하기</Button>
      </ButtonContainer>
    </StyledPost>
  );
};

export default BoardPost;
