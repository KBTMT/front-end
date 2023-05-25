import React, { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  margin-top: 10px;
  
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 60px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: #555;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ReplyForm = ({ commentId, onReplySubmit }) => {
  const [replyContent, setReplyContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onReplySubmit(commentId, replyContent);
    setReplyContent('');
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <TextArea
          placeholder="답글을 작성해주세요."
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
        />
        <ButtonContainer>
          <Button type="submit">작성하기</Button>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};

export default ReplyForm;