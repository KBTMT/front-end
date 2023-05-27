import React, {  useState } from 'react';
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
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen, setIsOpen] = useState(false);
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
            name:"게시판",
            icon: <FaRegChartBar />
        },
        {
            path:"/financialnews",
            name:"금융뉴스",
            icon: <FaCommentAlt />
        },
        {
            path:"/generalMypage",
            name:"마이페이지",
            icon: <FaShoppingBag />
        },
        
    ]

    return (
        <div className='container-sidebar'>
            <div style={{ width : isOpen ? "250px" : "80px"}} className='sidebar'>
                <div className="sidebar_top_section">
                    <h1 style={{ display : isOpen ? "block" : "none"}} className="sidebar_logo">TMT</h1>
                    <div style={{ marginLeft : isOpen ? "30px" : "30px"}} className="sidebar_bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                <div className='sidebar_login_container' style={{ display : isOpen ? "flex" : "none"}}>
                    <div className="sidebar_login"><NavLink to={"/login"}> 로그인</NavLink></div>
                    <div className='sidebar_login_bar'>  | </div>
                    <div className="sidebar_register">회원가입</div>
                </div>

                {
                    menuItem.map((item, index) =>(
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