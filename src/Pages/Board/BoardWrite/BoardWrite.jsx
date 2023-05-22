import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Form = styled.form`
  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  input[type="text"],
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button[type="submit"] {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const Preview = styled.div`
  margin-top: 1rem;

  img {
    max-width: 100%;
    height: auto;
  }
`;

const BoardWrite = () => {
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
    event.preventDefault();
    setTitle("");
    setBoardContent("");
    setImage(null);
    axios
      .post("http://localhost:8899/board/register", { title, boardContent })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      <Title>글쓰기</Title>
      <Form onSubmit={handleSubmit}>
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
            <Preview>
              <img src={image} alt="이미지 미리보기" />
            </Preview>
          )}
        </div>
        <button type="submit">글 등록</button>
      </Form>
    </Container>
  );
};

export default BoardWrite;
