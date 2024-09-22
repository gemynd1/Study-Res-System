import {React, useState} from "react";
import "../../style/header.css";
// import "../../style/reset.css"
import { Link, Outlet } from "react-router-dom";

const Header = () => {
    const [active_index, setActive_index] = useState(null);
    const [active_message_index, setActive_message_index] = useState(0);

    const index_choice = (index) => {
        if(active_index === index) {
            setActive_index(null);
        }else{
            setActive_index(index);
        }
    }

    const message_type_choice = (index) => {
        setActive_message_index(index);
    }

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
                        <li>
                            <img src="/img/icon/bell.png" alt="bell" className="bell" onClick={() => {index_choice(0)}} />
                        </li>
                        <li>
                            <img src="/img/icon/chat.png" alt="chat" className="chat" onClick={() => {index_choice(1)}} />
                        </li>
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

                <div className="test" style={{display: active_index === 0 ? "block" : "none"}}>
                    <div className="test2">
                        <div className="notification-headerBar">
                            <img src="/img/icon/bell(white).png" alt="bellIcon" className="notification-icon" />
                            <span className="notification-text">알림</span>
                            <div className="clear-button">
                                <div className="clear-button-text">모두 지우기</div>
                            </div>
                        </div>
                        <div className="notification-section">
                            <div className="notification">
                                <img src="/img/icon/x.png" alt="XIcon" className="notification-XIcon" />
                                <p className="notification-content">
                                    김지민 님의 모임에 참여하였습니다.김지민 님의 모임에 참여하였습니다.
                                </p>
                                <span className="notification-date">
                                    2024-09-08 22:51
                                </span>
                            </div>
                            <div className="notification">
                                <img src="/img/icon/x.png" alt="XIcon" className="notification-XIcon" />
                                <p className="notification-content">
                                    김지민 님의 모임에 참여하였습니다.김지민 님의 모임에 참여하였습니다.
                                </p>
                                <span className="notification-date">
                                    2024-09-08 22:51
                                </span>
                            </div> 
                            <div className="notification">
                                <img src="/img/icon/x.png" alt="XIcon" className="notification-XIcon" />
                                <p className="notification-content">
                                    김지민 님의 모임에 참여하였습니다.김지민 님의 모임에 참여하였습니다.
                                </p>
                                <span className="notification-date">
                                    2024-09-08 22:51
                                </span>
                            </div> 
                            <div className="notification">
                                <img src="/img/icon/x.png" alt="XIcon" className="notification-XIcon" />
                                <p className="notification-content">
                                    김지민 님의 모임에 참여하였습니다.김지민 님의 모임에 참여하였습니다.
                                </p>
                                <span className="notification-date">
                                    2024-09-08 22:51
                                </span>
                            </div> 
                            <div className="notification">
                                <img src="/img/icon/x.png" alt="XIcon" className="notification-XIcon" />
                                <p className="notification-content">
                                    김지민 님의 모임에 참여하였습니다.김지민 님의 모임에 참여하였습니다.
                                </p>
                                <span className="notification-date">
                                    2024-09-08 22:51
                                </span>
                            </div> 
                        </div>
                    </div>
                </div>

                <div className="first-background" style={{display: active_index === 1 ? "block" : "none"}}>
                    <div className="second-background">

                        <div className="message-headerBar">
                            <img src="/img/icon/chat(white).png" alt="chatIcon" className="message-icon" />
                            <span className="message-text">채팅</span>
                        </div>

                        <div className="message-section">

                            <div className="typeBar">
                                <div className={active_message_index === 0 ? "personal-message active" : "personal-message" } onClick={() => {message_type_choice(0)}}>
                                    <span className="personal-message-text">받은 메시지함</span>
                                </div>
                                <div className={active_message_index === 1 ? "group-message active" : "group-message"} onClick={() => {message_type_choice(1)}}>
                                    <span className="group-message-text">모임</span>
                                </div>
                            </div>

                            <div className="personal-message-section" style={{display: active_message_index === 1 ? "none" : "block"}}>
                                <div className="personal-message-content">
                                    <img src="/img/icon/person(comment).png" alt="personIcon" className="personIcon" />
                                    <div className="text-group">
                                        <span className="sender-text">정희수</span>
                                        <p className="message-content">오늘은 무슨 공부할껀가요?</p>
                                    </div>
                                    <img src="/img/icon/redDot.png" alt="redDot" className="redDot" />
                                </div>
                                <div className="personal-message-content">
                                    <img src="/img/icon/person(comment).png" alt="personIcon" className="personIcon" />
                                    <div className="text-group">
                                        <span className="sender-text">정희수</span>
                                        <p className="message-content">오늘은 무슨 공부할껀가요?</p>
                                    </div>
                                    <img src="/img/icon/redDot.png" alt="redDot" className="redDot" />
                                </div>
                                <div className="personal-message-content">
                                    <img src="/img/icon/person(comment).png" alt="personIcon" className="personIcon" />
                                    <div className="text-group">
                                        <span className="sender-text">정희수</span>
                                        <p className="message-content">오늘은 무슨 공부할껀가요?</p>
                                    </div>
                                    <img src="/img/icon/redDot.png" alt="redDot" className="redDot" />
                                </div>
                                <div className="personal-message-content">
                                    <img src="/img/icon/person(comment).png" alt="personIcon" className="personIcon" />
                                    <div className="text-group">
                                        <span className="sender-text">정희수</span>
                                        <p className="message-content">오늘은 무슨 공부할껀가요?</p>
                                    </div>
                                    <img src="/img/icon/redDot.png" alt="redDot" className="redDot" />
                                </div>
                                <div className="personal-message-content">
                                    <img src="/img/icon/person(comment).png" alt="personIcon" className="personIcon" />
                                    <div className="text-group">
                                        <span className="sender-text">정희수</span>
                                        <p className="message-content">오늘은 무슨 공부할껀가요?</p>
                                    </div>
                                    <img src="/img/icon/redDot.png" alt="redDot" className="redDot" />
                                </div>
                                <div className="personal-message-content">
                                    <img src="/img/icon/person(comment).png" alt="personIcon" className="personIcon" />
                                    <div className="text-group">
                                        <span className="sender-text">정희수</span>
                                        <p className="message-content">오늘은 무슨 공부할껀가요?</p>
                                    </div>
                                    <img src="/img/icon/redDot.png" alt="redDot" className="redDot" />
                                </div>
                                <div className="personal-message-content">
                                    <img src="/img/icon/person(comment).png" alt="personIcon" className="personIcon" />
                                    <div className="text-group">
                                        <span className="sender-text">정희수</span>
                                        <p className="message-content">오늘은 무슨 공부할껀가요?</p>
                                    </div>
                                    <img src="/img/icon/redDot.png" alt="redDot" className="redDot" />
                                </div>
                            </div>

                            <div className="group-message-section" style={{display: active_message_index === 0 ? "none" : "block"}}>
                                <div className="group-message-content">
                                    <img src="/img/icon/group(message).png" alt="groupIcon" className="groupIcon" />
                                    <div className="text-group">
                                        <span className="groupName-text">(123) 백지민, 김지민....</span>
                                        <p className="message-content">오늘은 무슨 공부할껀가요?</p>
                                    </div>
                                    <img src="/img/icon/redDot.png" alt="redDot" className="redDot" />
                                </div>
                                <div className="group-message-content">
                                    <img src="/img/icon/group(message).png" alt="groupIcon" className="groupIcon" />
                                    <div className="text-group">
                                        <span className="groupName-text">(123) 백지민, 김지민....</span>
                                        <p className="message-content">오늘은 무슨 공부할껀가요?</p>
                                    </div>
                                    <img src="/img/icon/redDot.png" alt="redDot" className="redDot" />
                                </div>
                                <div className="group-message-content">
                                    <img src="/img/icon/group(message).png" alt="groupIcon" className="groupIcon" />
                                    <div className="text-group">
                                        <span className="groupName-text">(123) 백지민, 김지민....</span>
                                        <p className="message-content">오늘은 무슨 공부할껀가요?</p>
                                    </div>
                                    <img src="/img/icon/redDot.png" alt="redDot" className="redDot" />
                                </div>
                                <div className="group-message-content">
                                    <img src="/img/icon/group(message).png" alt="groupIcon" className="groupIcon" />
                                    <div className="text-group">
                                        <span className="groupName-text">(123) 백지민, 김지민....</span>
                                        <p className="message-content">오늘은 무슨 공부할껀가요?</p>
                                    </div>
                                    <img src="/img/icon/redDot.png" alt="redDot" className="redDot" />
                                </div>
                                <div className="group-message-content">
                                    <img src="/img/icon/group(message).png" alt="groupIcon" className="groupIcon" />
                                    <div className="text-group">
                                        <span className="groupName-text">(123) 백지민, 김지민....</span>
                                        <p className="message-content">오늘은 무슨 공부할껀가요?</p>
                                    </div>
                                    <img src="/img/icon/redDot.png" alt="redDot" className="redDot" />
                                </div>
                                <div className="group-message-content">
                                    <img src="/img/icon/group(message).png" alt="groupIcon" className="groupIcon" />
                                    <div className="text-group">
                                        <span className="groupName-text">(123) 백지민, 김지민....</span>
                                        <p className="message-content">오늘은 무슨 공부할껀가요?</p>
                                    </div>
                                    <img src="/img/icon/redDot.png" alt="redDot" className="redDot" />
                                </div>
                                <div className="group-message-content">
                                    <img src="/img/icon/group(message).png" alt="groupIcon" className="groupIcon" />
                                    <div className="text-group">
                                        <span className="groupName-text">(123) 백지민, 김지민....</span>
                                        <p className="message-content">오늘은 무슨 공부할껀가요?</p>
                                    </div>
                                    <img src="/img/icon/redDot.png" alt="redDot" className="redDot" />
                                </div>
                                <div className="group-message-content">
                                    <img src="/img/icon/group(message).png" alt="groupIcon" className="groupIcon" />
                                    <div className="text-group">
                                        <span className="groupName-text">(123) 백지민, 김지민....</span>
                                        <p className="message-content">오늘은 무슨 공부할껀가요?</p>
                                    </div>
                                    <img src="/img/icon/redDot.png" alt="redDot" className="redDot" />
                                </div>
                                <div className="group-message-content">
                                    <img src="/img/icon/group(message).png" alt="groupIcon" className="groupIcon" />
                                    <div className="text-group">
                                        <span className="groupName-text">(123) 백지민, 김지민....</span>
                                        <p className="message-content">오늘은 무슨 공부할껀가요?</p>
                                    </div>
                                    <img src="/img/icon/redDot.png" alt="redDot" className="redDot" />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </header>
        </>
        
    );
};

export default Header;