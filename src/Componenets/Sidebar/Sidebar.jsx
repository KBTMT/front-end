import React, {  useState, useEffect } from 'react';
import './Sidebar.css'
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
} from "react-icons/fa";
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';



const Sidebar = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userFromSession = JSON.parse(sessionStorage.getItem('vo'));
        if (JSON.parse(sessionStorage.getItem('vo'))) {
          setIsLoggedIn(true);
        }
    }, []);

    const logout = () => {
        axios.post('http://localhost:8899/logout')
          .then(response => {
            alert("로그아웃 성공!")
            sessionStorage.removeItem('vo');
            //alert("세션 삭제됨")
            document.location.href = '/'
        })
        .catch(error => {
          console.error(error);
        });
    }

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggle = () => setIsOpen(!isOpen);

    const menuItem = [
        {
            path:"/",
            name:"티끌안내소",
            icon: <img src={require('../../img/info_t.png')} style={ {width : "50px"}} />
        },
        {
            path:"/accountbook",
            name:"티끌기록이",
            icon: <img src={require('../../img/write_t.png')} style={ {width : "50px"}} />
        },
        {
            path:"/boardMain",
            name:"티끌광장",
            icon: <img src={require('../../img/tickle_board.png')} style={ {width : "50px"}} />
        },
        {
            path:"/financialnews",
            name:"금융뉴스",
            icon: <img src={require('../../img/tickle_news.png')} style={ {width : "50px"}} />
        },
        {
            path:"/generalMypage",
            name:"마이페이지",
            icon: <img src={require('../../img/tickle_mypage.png')} style={ {width : "50px"}} />
        },
        
    ]


    const menuItemAdmin = [
        {
            path: "/",
            name: "티끌안내소",
            icon: <img src={require('../../img/info_t.png')} style={{ width: "50px" }} />
        },
        {
            path: "/accountbook",
            name: "티끌기록이",
            icon: <img src={require('../../img/write_t.png')} style={{ width: "50px" }} />
        },
        {
            path: "/boardMain",
            name: "게시판",
            icon: <img src={require('../../img/tickle_board.png')} style={ {width : "50px"}} />
        },
        {
            path: "/financialnews",
            name: "금융뉴스",
            icon: <img src={require('../../img/tickle_news.png')} style={ {width : "50px"}} />
        },
        {
            path: "/admin/reported",
            name: "신고 관리",
            icon: <img src={require('../../img/tickle_mypage.png')} style={ {width : "50px"}} />
        }

    ]

    const isAdmin = sessionStorage.getItem("admin");
    const menuItems = isAdmin ? menuItemAdmin : menuItem;

    return (
        <div className='container-sidebar'>
            <div style={{ width : isOpen ? "230px" : "80px"}} className='sidebar'>
                <div className="sidebar_top_section">
                    <Link to={"/"} className='sidebar_title'>
                        <h1 style={{ display : isOpen ? "block" : "none"}} className="sidebar_logo">TMT</h1>
                    </Link>
                    <div style={{ marginLeft : isOpen ? "30px" : "10px"}} className="sidebar_bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                <div className='sidebar_login_container' style={{ display : isOpen ? "flex" : "none"}}>
                    <div className='user-auth'>
                        {isLoggedIn ? (
                            <>
                            <Link onClick={logout} style={{ alignItems : "center"}}>로그아웃</Link>
                            </>
                        ): (
                            <>
                            <div className="sidebar_login"><NavLink to={"/login"}> 로그인</NavLink></div>
                            <div className="sidebar_login_bar"> | </div>
                            <div className="sidebar_register dropdown">
                                <button onClick={toggleDropdown} className='register-btn'>
                                    회원가입
                                </button>
                                {showDropdown && (
                                    <div className="dropdown-content">
                                        <Link to="/registerGeneral">일반회원 회원가입</Link>
                                        <Link to="/registerBusiness">사업자회원 회원가입</Link>
                                    </div>
                                    )}
                            </div>
                            </>
                        )}
                    </div>
                    
                </div>

                {
                    menuItems.map((item, index) =>(
                        <NavLink className="sidebar_link" to={item.path} key={index}  activeclassName="sidebar_active">
                            <div  style = {{ display : isOpen ? "flex" : "30px"}} className="sidebar_icon">{item.icon}</div>
                            <div style={{display : isOpen ? "block" : "none"}} className="sidebar_link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;