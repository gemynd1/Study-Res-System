import React from "react";
import "../../style/header.css";
// import "../../style/reset.css"
import { Link, Outlet } from "react-router-dom";

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
                            <Link to="/info">정보</Link>
                        </li>
                        <li>
                            <Link to="/board">게시판</Link>
                        </li>
                        <li>
                            <Link to="/review">리뷰</Link>
                        </li>
                    </ul>
                    {/* <ul className="menuList2-fail"> 
                        <li><img src="/img/icon/bell.png" alt="bell" className="bell" /></li>
                        <li><img src="/img/icon/chat.png" alt="chat" className="chat" /></li>
                        <li>
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <div className="menuList2-login">
                                    <img src="/img/icon/login.png" alt="login" className="login" />
                                    <span>로그인</span>
                                </div>
                            </Link>
                        </li>
                        <li className="menuList2-box"></li>
                        <li>
                            <Link to="/join" style={{ textDecoration: 'none' }}>
                                <div className="menuList2-join">
                                    <img src="/img/icon/join.png" alt="join" className="join" />
                                    <span>회원가입</span>
                                </div>
                            </Link>
                        </li>
                    </ul> */}
                    <ul className="menuList2-sucs"> 
                        <li><img src="/img/icon/bell.png" alt="bell" className="bell" /></li>
                        <li><img src="/img/icon/chat.png" alt="chat" className="chat" /></li>
                        <li>
                            <Link to="/mypage" style={{ textDecoration: 'none' }}>
                                <div className="menuList2-mypage">
                                    <img src="/img/icon/mypage.png" alt="Main" className="mypage" />
                                    <span>마이페이지</span>
                                </div>
                            </Link>
                            
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