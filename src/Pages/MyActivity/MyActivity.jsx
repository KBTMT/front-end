import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  width: 1500px;
  margin: 30px auto;
  padding: 40px;
  background-color: #E5ECF6;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  border-radius: 10px;
`;

const MyContainer = styled.div`
  width: 1500px;
  height: auto;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #333333;
`;

const SubHeading = styled.h3`
  margin-bottom: 10px;
  color: #555555;
`;

const List = styled.ul`
  padding: 0;
`;

const ListItem = styled.li`
  list-style: none;
  margin-bottom: 5px;
  color: #777777;
`;

const MyActivity = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const userFromSession = JSON.parse(sessionStorage.getItem('vo'));
    if (userFromSession) {
      setUser(userFromSession);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8899/myactivity/myboard', {
        params: {
            generalId: user.generalId,
        }
      });
      const boardList = response.data;
      setPosts(boardList);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Container>
      <MyContainer>
        <Heading>내 활동</Heading>
        <div>
          <SubHeading>찜한 할인정보</SubHeading>
          <List>
            <ListItem>할인정보 1</ListItem>
            <ListItem>할인정보 2</ListItem>
            <ListItem>할인정보 3</ListItem>
          </List>
        </div>
        <div>
          <SubHeading>내 게시글 모아보기</SubHeading>
          <List>
            {posts.map(post => (
              <ListItem key={post.id}>{post.title}</ListItem>
            ))}
          </List>
        </div>
      </MyContainer>
    </Container>
  );
};

export default MyActivity;