import React, { useState } from "react";
import "./BoardWrite.css";
import axios from 'axios';
//import { useHistory  } from 'react-router-dom';


const BoardWrite = ({  }) => {
  const [title, setTitle] = useState("");
  const [boardContent, setBoardContent] = useState("");
  const [image, setImage] = useState(null);
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setBoardContent(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    setTitle("");
    setBoardContent("");
    setImage(null);
    axios.post('http://localhost:8899/board/register', { title, boardContent })
      .then(response => {
        console.log(response);
        // history.push('/board');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h2>글쓰기</h2>
      <form onSubmit={handleSubmit} action="/board">
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="boardContent">내용</label>
          <textarea
            id="boardContent"
            value={boardContent}
            onChange={handleContentChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">사진</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && (
            <div className="preview">
              <img src={image} alt="이미지 미리보기" />
            </div>
          )}
        </div>
        <button type="submit">글 등록</button>
      </form>
    </div>
    
  );
};

export default BoardWrite;
