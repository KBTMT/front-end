import React from "react";
import "./Header.css";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="../tmt.jpeg" width="200px" />
        </Link>
      </div>
      <div className="right-section">
        <div className="user-auth">
          <Link to="/login">로그인</Link>
          <Link to="/registerGeneral">회원가입</Link>
        </div>
      </div>
      <nav className="menu-bar">
        <ul>
          <li>
            <Link to="/">할인달력</Link>
          </li>
          <li>
            <Link to="/acoountbook">가계부</Link>
          </li>
          <li>
            <Link to="/board">게시판</Link>
          </li>
          <li>
            <Link to="/financialnews">금융소식</Link>
          </li>
          <li>
            <Link to="/mypage">마이페이지</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
