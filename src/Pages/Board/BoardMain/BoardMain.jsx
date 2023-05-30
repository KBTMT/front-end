import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from 'axios';

import "./BoardMain.css";
import BoardHeadline from "../../../Componenets/Board/BoardHeadline";
import BoardAdmin from "../../../Componenets/Board/BoardAdmin";

const BoardMain = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [posts, setPost] = useState([]);

  const location = useLocation();
  useEffect(() => {
    if(location.state){
      setSearchKeyword(location.state.search.brand);
    }
    axios.get('http://localhost:8899/board')
      .then(response => setPost(response.data))
      .catch(error => console.log(error))
  }, []);
  
  useEffect(()=>{
    if (searchKeyword) {
        setSearchQuery(searchKeyword);
      }
    }, [searchKeyword]);


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

  const goDetail = (e) => {
    navigate(`/board/boardpost/${e.boardSeq}`, {
      state: {
        boardSeq: e.boardSeq
      }
    })


    {/* {currentPosts.map((post) => (
          <Link to={`/board/boardpost/${post.boardSeq}`} key={post.boardSeq} style={{ textDecoration: 'none' }}>
            <BoardHeadline key={post.boardSeq} title={post.title} boardDate={post.boardDate} userNickname={post.userNickname} />
          </Link>
        ))} */}

  }

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
    <div className="boardmain-container">
      <img src={require('../../../img/tickle_board_bar.png')} style={{ width: "700px" }} />

      {/* <BoardAdmin title={`공지사항`} /> */}
      {/* <div className="board-section"> */}
      <button className="boardwrite-btn" style={{ fontSize: '20px', padding: '5px', width: '20%', alignItems:"center", border : "none"}} onClick={navigateToWrite}>글쓰기</button>
      <table className="board-table">
        <tr>
          <th className="board-th" >번호</th>
          <th className="board-th">제목</th>
          <th className="board-th">내용</th>
          <th className="board-th">작성자</th>
          <th className="board-th">작성 일자</th>
        </tr>
        {currentPosts.map((post) => (
          <tr>
            <td className="board-td">{post.boardSeq}</td>
            <td className="board-td" onClick={() => goDetail(post)}>{post.title}</td>
            <td className="board-td" >{post.boardContent.length > 10 ? (post.boardContent.slice(0, 10) + "  ...") : (post.boardContent)}</td>
            <td className="board-td" >{post.userNickname}</td>
            <td className="board-td" >{post.boardDate.slice(0, 16)}</td>
          </tr>
        ))}

      </table>
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

    // </div >
  );
};

export default BoardMain;
