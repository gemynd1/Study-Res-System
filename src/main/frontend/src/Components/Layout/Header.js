import React from "react";
import "../../style/layout.css";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <>
            <header className="header"> 
                <div className="menu">
                    <ul className="menuList1">
                        <li>
                            <Link to="/">
                                <img src="/img/snlogo.png" alt="logo" className="logo"/>
                            </Link>
                        </li>
                        <li>
                            <Link to="/">홈</Link>
                        </li>
                        <li>
                            <Link to="/">정보</Link>
                        </li>
                        <li>
                            <Link to="/">게시판</Link>
                        </li>
                        <li>
                            <Link to="/">리뷰</Link>
                        </li>
                    </ul>
                    <ul className="menuList2"> 
                        <li><img src="/img/icon/bell.png" alt="bell" className="bell" /></li>
                        <li><img src="/img/icon/chat.png" alt="chat" className="chat" /></li>
                        <li>
                            <div className="menuList2-mypage">
                                <img src="/img/icon/mypage.png" alt="mypage" className="mypage" />
                                <span>마이페이지</span>
                            </div>
                        </li>
                        <li className="menuList2-box"></li>
                        <li>
                            <div className="menuList2-logout">
                                <img src="/img/icon/logout.png" alt="logout" className="logout" />
                                <span>로그아웃</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </header>
        </>
        
    );
};

export default Header;