import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

import "./BoardMain.css";
import BoardHeadline from "../../../Componenets/Board/BoardHeadline";
import BoardAdmin from "../../../Componenets/Board/BoardAdmin";

const BoardMain = () => {
  const [posts,setPost] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8899/board')
      .then(response => setPost(response.data))
      .catch(error => console.log(error))
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("title"); // 검색 조건 상태

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // 검색 기능
  const filteredPosts = posts.filter((post) => {
    if (post && post.title && searchType === "title") {
      return post.title.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (post && post.author && searchType === "author") {
      return post.author.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (post && post.content && searchType === "content") {
      return post.content.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return false;
  });


  // 현재 페이지에서 보여줄 게시물
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  console.log(currentPosts);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const navigate = useNavigate();

  const navigateToWrite = () => {
    navigate("/board/register");
  };

  // 페이지 번호 버튼들
  const pageNumbers = Math.ceil(filteredPosts.length / postsPerPage);
  const pagination = [];

  for (let i = 1; i <= pageNumbers; i++) {
    pagination.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={currentPage === i ? "active" : ""}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="container">
      <img src={require('../../../img/tickle_board_bar.png')} style={ {width : "500px"}} />

      <BoardAdmin title={`공지사항`}/>
      <div className="board-section">
        <div className="board-top">
        <button onClick={navigateToWrite}>글쓰기</button>
        </div>

        {currentPosts.map((post) => ( 
            // <Link to={`/board/detail/${post.boardSeq}`} key={post.boardSeq} style={{ textDecoration: 'none' }}>
          //   <Link to={{pathname :`/board/detail/${post.boardSeq}`,
          //   state : {
              // 링크 라우터? 네비게이션?
          //   } 
          // }}>  
              <BoardHeadline key={post.boardSeq} title={post.title} boardDate={post.boardDate} userNickname={post.userNickname}/>

            // </Link>
          ))}
        <div className="search-bar">
          <select value={searchType} onChange={handleSearchTypeChange}>
            <option value="title">제목</option>
            <option value="author">작성자</option>
            <option value="content">내용</option>
          </select>

          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="검색"
          />
        </div>
        {/* <div classname = "post-list"> */}
          
        {/* </div> */}
        <div className="pagination">{pagination}</div>
        
      </div>
    </div>
  );
};

export default BoardMain;
