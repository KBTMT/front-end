import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import "./BoardPost.css"
import ReplyForm from "../../../Componenets/Board/BoardReply";
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

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

const Comment = styled.h5`
  color: #555;
  word-break: break-word;
  display: inline;

  align:left;
  
`;

const Reply = styled.p`
  margin-left: 20px;
  color: #777;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
`;

const Button = styled.button`
  width: 8%;
  background-color: #555;
  color: #fff;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 90%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right:10px;
`;

const CommentContainer = styled.div`
  
`;

const BoardPost = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const params = useParams();
  const boardSeq = params.boardSeq;
  const nowUserNickname = JSON.parse(sessionStorage.getItem('vo')).userNickname
  const [flag, setFlag] = useState(false)



  const handleEdit = () => {
    console.log('Edit button clicked');
  };

  const handleDelete = () => {
    console.log('Delete button clicked');
  };

  const handleReplySubmit = async (commentId, replyContent) => {
    try {
      const response = await axios.post(`http://localhost:8899/board/comments/${commentId}/replies`, {
        content: replyContent,
      });
      const newReply = response.data;
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply],
            isReplying: false,
          };
        }
        return comment;
      });
      setComments(updatedComments);
    } catch (error) {
      console.log(error);
    }
  };


  const handleCommentChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleReplyClick = (commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isReplying: true,
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleCommentSubmit = async () => {
    const userNickname = nowUserNickname

    try {
      await axios.post('http://localhost:8899/board/create/comments', { boardSeq, userNickname, commentContent })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
      setFlag(true)
      // const newComment = response.data;
      // setComments([...comments, newComment]);
      // setCommentContent("");
    } catch (error) {
      console.log(error);
    }
    setCommentContent("")
  };


  useEffect(() => {
    axios.get(`http://localhost:8899/board/detail/${boardSeq}`)
      .then(response => setPost(response.data), console.log("a"))
      .catch(error => console.log(error));

    axios.get(`http://localhost:8899/board/detail/comment/${boardSeq}`)
      .then(response => setComments(response.data))
      .catch(error => console.log(error));

    setFlag(false)
  }, [boardSeq, flag]);

  return (
    <div className="post-container">
      <div className='post-read'>
        <Title>제목: {post.title}</Title>
        <div className='post-info'>
          <Date>작성시간:  {post.boardDate}</Date>
          <br></br>
          <Author>작성자: {post.userNickname}</Author>
        </div>

        <hr style={{ opacity: 0.5 }}></hr>
        <div className='post-content'>
          <Content>{post.boardContent}</Content> {

          }
        </div>
        <ButtonContainer>
          <Button onClick={handleEdit}>수정하기</Button>
          <Button onClick={handleDelete}>삭제하기</Button>

        </ButtonContainer>
        <hr style={{ opacity: 0.2 }} ></hr>
        <br></br>
        <div className='post-comment'>
          {comments.map((comment) => (
            <CommentContainer key={comment.id} style={{}}>
              <b style={{ float: 'left', fontSize: '15px' }}>작성자: {comment.userNickname}</b>
              <span style={{ textAlign: 'right', float: 'right' }}> {comment.commentDate.slice(0, 16)}</span>
              <br></br><br></br>
              <div style={{ textAlign: 'left', fontSize: '21px' }}>
                <Comment>{comment.commentContent}</Comment>
                <hr style={{ opacity: 0.6 }}></hr>
              </div>
              {/* {comment.replies.map((reply) => (
                <Reply key={reply.id}>{reply.content}</Reply>
              ))}
              {comment.isReplying ? (
                <ReplyForm commentId={comment.id} onReplySubmit={handleReplySubmit} />
              ) : (
                <Button onClick={() => handleReplyClick(comment.id)}>답글 작성</Button>
              )} */}
            </CommentContainer>
          ))}
          <div style={{ display: 'block' }}>
            <Input
              type="text"
              id="comments"
              placeholder="댓글을 입력해주세요!"
              value={commentContent}
              onChange={handleCommentChange}
            />
            <Button onClick={handleCommentSubmit}>댓글 작성</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPost;
