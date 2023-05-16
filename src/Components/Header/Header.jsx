import React from "react";
import "./Header.css";
import { useNavigate, Link } from "react-router-dom";


const Header = () => {
  return(
    <header className="header">
        <div className="logo">
          <Link to = "/">로고가 표시될 부분입니다.</Link>
        </div>
        <div className="right-section">
          <div className="user-auth">
            <Link to ="/login">로그인</Link>
            <Link to = "/registerGeneral">회원가입</Link>
          </div>
        </div>
        
          <nav className="menu-bar">
          <ul>
              <li>
                <Link to="/page1">페이지1</Link>
              </li>
              <li>
                <Link to="/page2">페이지2</Link>
              </li>
              <li>
                <Link to="/page3">페이지3</Link>
              </li>
              <li>
                <Link to="/page4">페이지4</Link>
              </li>
              <li>
                <Link to="/page5">페이지5</Link>
              </li>
            </ul>
          </nav>
    </header>
  ); 
};

export default Header;
