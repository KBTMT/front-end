import React, { useState } from "react";
import "./Header.css";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

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
          <div className="dropdown">
            <button onClick={toggleDropdown} className="register-btn">회원가입</button>
            {showDropdown && (
              <div className="dropdown-content">
                <Link to="/registerGeneral">일반회원 회원가입</Link>
                <Link to="/registerBusiness">사업자회원 회원가입</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <nav className="menu-bar">
        <ul>
          <li>
            <Link to="/">할인달력</Link>
          </li>
          <li>
            <Link to="/accountbook"><img src={require("../../img/accountbook.png")} style={{ width : '50px'}}/>가계부</Link>
          </li>
          <li>
            <Link to="/boardMain">게시판</Link>
          </li>
          <li>
            <Link to="/financialnews"><img src={require("../../img/news.png")} style={{ width : '50px'}}/>금융소식 </Link>
          </li>
          <li>
            <Link to="/generalmypage">마이페이지</Link>
            {/* <Link to="/businessmypage">마이페이지</Link> */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
