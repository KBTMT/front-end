import React, { useState } from 'react';
import styled from 'styled-components';
import "./BoardPost.css"
import ReplyForm from "../../../Componenets/Board/BoardReply";

const Title = styled.h2`
  display: flex;
  align-items: left;
  width: 60%;
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
  word-break: break-word;
`;

const Reply = styled.p`
  margin-left: 20px;
  color: #777;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap:15px;
  justify-content: flex-end;

`;

const Button = styled.button`
  background-color: #555;
  color: #fff;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  // margin-right: 10px;
  cursor: pointer;
`;


const CommentContainer = styled.div`
  text-align: left;
`;

const BoardPost = () => {
  const [post, setPost] = useState({
    title: '게시물 제목',
    date: '2023-05-22',
    author: '작성자',
    content: '게시물 내용입니다.',
  });
  const [comments, setComments] = useState([
    {
      id: 1,
      content: '첫 번째 댓글',
      replies: [],
    },
    {
      id: 2,
      content: '두 번째 댓글',
      replies: [],
    },
    {
      id: 3,
      content: '세 번째 댓글',
      replies: [],
    },
  ]);

  const handleEdit = () => {
    // 수정하기 버튼 클릭 시 수행할 작업
    console.log('Edit button clicked');
  };

  const handleDelete = () => {
    // 삭제하기 버튼 클릭 시 수행할 작업
    console.log('Delete button clicked');
  };

  const handleReplySubmit = (commentId, replyContent) => {
    // 답글 작성 후 수행할 작업
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const newReply = {
          id: comment.replies.length + 1,
          content: replyContent,
        };
        return {
          ...comment,
          replies: [...comment.replies, newReply],
          isReplying: false, // 답글 작성 완료 후 폼 숨김
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleReplyClick = (commentId) => {
    // 답글 작성 버튼 클릭 시 수행할 작업
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isReplying: true, // 답글 작성 폼 보여줌
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };
  


  return (
    <div className="post-container">
      <div className='post-read'>
        
      <Title>{post.title}</Title>
      <div className='post-info'>
        <Date>Date: {post.date}</Date>
        <Author>Author: {post.author}</Author>
      </div>
      <ButtonContainer>
          <Button onClick={handleEdit}>수정하기</Button>
          <Button onClick={handleDelete}>삭제하기</Button>
        </ButtonContainer>

      <div className='post-content'>
        <Content>{post.content}</Content>
      </div>
      <hr></hr>

      <div className='post-comment'>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <CommentContainer key={comment.id} style={{ wordBreak: 'break-word'}}>
          <Comment>{comment.content}</Comment>
          {comment.replies.map((reply) => (
            <Reply key={reply.id}>{reply.content}</Reply>
          ))}
          {comment.isReplying ? (
            <ReplyForm
              commentId={comment.id}
              onReplySubmit={handleReplySubmit}
            />
          ) : (
            <Button onClick={() => handleReplyClick(comment.id)}>답글 작성</Button>
          )}
        </CommentContainer>
      ))}
    </div>
        </div>
    </div>
  );
};

export default BoardPost;
