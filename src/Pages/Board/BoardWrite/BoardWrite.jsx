import React, { useEffect,useState } from "react";
import styled from "styled-components";
import axios from "axios";

const WriteContainer = styled.div`
  max-width: 1000px;
  margin: 30px auto;
  padding: 40px;
  background-color: #E5ECF6;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  border-radius: 10px;
`;

const FormContainer = styled.div`
width: 1000px;
height: auto;
background-color: #ffffff;
padding: 20px;
border-radius: 10px;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
  width: 100%;
  display : flex;
  align-items : center;
  justify-content: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  /* 추가한 스타일 */
  height: 500px; /* 원하는 높이로 조절 */
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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

  const [user, setUser] = useState([]);
  const [generalId, setGeneralId] = useState([]);
  const [userNickname, setUserNickname] = useState([]);

  useEffect(() => {
    const userFromSession = JSON.parse(sessionStorage.getItem('vo'));
    if (userFromSession) {
      setUser(userFromSession);
      setGeneralId(userFromSession.generalId);
      setUserNickname(userFromSession.setUserNickname);

    }
  }, []);

  // useEffect(() => {
  //     fetchData();
  //   }, [user]);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    setTitle("");
    setBoardContent("");
    setImage(null);
    axios
      .post("http://localhost:8899/board/register", { title, boardContent, generalId, userNickname  })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <WriteContainer>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="text"
              id="title"
              placeholder="제목을 입력해주세요!"
              value={title}
              onChange={handleTitleChange}
            />
          </FormGroup>
          <FormGroup>
            <TextArea
              id="boardContent"
              placeholder="내용을 입력해주세요!"
              value={boardContent}
              onChange={handleContentChange}
            ></TextArea>
          </FormGroup>
          <FormGroup>
            <Input
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
          </FormGroup>
          <ButtonContainer>
            <Button type="submit">글 등록</Button>
          </ButtonContainer>
        </form>
      </FormContainer>
    </WriteContainer>
  );
};

export default BoardWrite;