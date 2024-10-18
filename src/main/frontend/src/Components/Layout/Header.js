import {React, useState} from "react";
import "../../style/header.css";
import axios from "axios";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    const {id = '', name = ''} = location.state?.userData || {}; 
    const navigate = useNavigate();
    const [active_index, setActive_index] = useState(null);
    const [active_message_index, setActive_message_index] = useState(0);

    const logoutHandle = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8099/api/logout")
        .then(response => {
            if(response.data === true) {
                console.log(response.data);
                sessionStorage.clear();
                alert("로그아웃 되었습니다.");
                navigate("/");
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

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

    // notification에 대한 정보
    const [notifications, setNotifications] = useState([
        {id: 1, content: "1김지민 님의 모임에 참여하였습니다.김지민 님의 모임에 참여하였습니다.", date: "2024-09-08 22:51"},
        {id: 2, content: "2김지민 님의 모임에 참여하였습니다.김지민 님의 모임에 참여하였습니다.", date: "2024-09-08 22:51"},
        {id: 3, content: "3김지민 님의 모임에 참여하였습니다.김지민 님의 모임에 참여하였습니다.", date: "2024-09-08 22:51"},
        {id: 4, content: "4김지민 님의 모임에 참여하였습니다.김지민 님의 모임에 참여하였습니다.", date: "2024-09-08 22:51"},
        {id: 5, content: "5김지민 님의 모임에 참여하였습니다.김지민 님의 모임에 참여하였습니다.", date: "2024-09-08 22:51"}
    ]);

    const del_notification = (event) => {
        const id = event.target.getAttribute('data-id');
        // db에 있는 알림을 지우고 다시 select한 결과로 notifications변경해야함
        setNotifications(notifications.filter(notification => notification.id !== parseInt(id)));
    }

    const delAll_notification = () => {
        setNotifications ([]);
        // 실제로 db 알림에 해당하는 데이터를 delete시켜야함
    }

    // chat-section에 대한 정보
    const [chatHeaderBars, setChatHeaderBars] = useState([
        {id: 1, groupName: "snake", groupMember: "정희수, 김태랑, 백지민, 김지민"},
        {id: 2, groupName: "dev", groupMember: "정희수, 김태랑, 백지민, 김지민"},
    ]);

    const toggleChat = (id) => {

        const chat_section = document.querySelector(`.chat-main-${id}`);
        
        if (chat_section && chat_section.style.display !== "none") {
            chat_section.style.display = "none";
            const chat_arrow = document.querySelector(`.arrow-icon-${id}`);
            chat_arrow.src = "/img/icon/arrow(top).png";
        }else if (chat_section && chat_section.style.display === "none") {
            chat_section.style.display = "flex";
            const chat_arrow = document.querySelector(`.arrow-icon-${id}`);
            chat_arrow.src = "/img/icon/arrow(down).png";
        }
    }

    const closeChat = (id) => {
        const chat_background = document.querySelector(`.chat-background-${id}`);
        chat_background.style.display = "none";
        // 실제로 db에 있는 채팅에 대한 데이터를 지워야함
    }

    const showChat = (id) => {
        console.log(id);
        const chat_background = document.querySelector(`.chat-background-${id}`);
        chat_background.style.display = "block";
    }

    // chat-content-group에 대한 정보
    const [chatContents, setChatContents] = useState([
        {id: 1, chatgroup: 1, senderType:"recipient", name: "정희수", content: "안녕하세요.", chatNum:1},
        {id: 2, chatgroup: 1, senderType:"sender", name: "백지민", content: "안녕하세요.", chatNum:2},
        {id: 3, chatgroup: 1, senderType:"recipient", name: "김지민", content: "hi~", chatNum:3},
        {id: 4, chatgroup: 2, senderType:"recipient", name: "정희수", content: "안녕하세요.", chatNum:1},
        {id: 5, chatgroup: 2, senderType:"sender", name: "백지민", content: "안녕하세요.", chatNum:2},
        {id: 6, chatgroup: 2, senderType:"recipient", name: "김지민", content: "hi~", chatNum:3},
    ]);

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
                    {sessionStorage.getItem('id') === null ? (
                        <ul className="menuList2-fail"> 
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
                        </ul>
                    ) : (
                        <ul className="menuList2-sucs"> 
                            <li>
                                <img src="/img/icon/bell.png" alt="bell" className={active_index === 0 ? "bell active" : "bell"} onClick={() => {index_choice(0)}} />
                            </li>
                            <li>
                                <img src="/img/icon/chat.png" alt="chat" className={active_index === 1 ? "chat active" : "chat"} onClick={() => {index_choice(1)}} />
                            </li>
                            <li>
                                <Link to="/mypage/mypageAccount" style={{ textDecoration: 'none' }}>
                                    <div className="menuList2-mypage">
                                        <img src="/img/icon/mypage.png" alt="Main" className="mypage" />
                                        <span>마이페이지</span>
                                    </div>
                                </Link>
                                
                            </li>
                            <li className="menuList2-box"></li>
                            <li>
                                <Link onClick={logoutHandle} style={{ textDecoration: 'none' }}>
                                    <div className="menuList2-logout">
                                        <img src="/img/icon/logout.png" alt="logout" className="logout" />
                                        <span>로그아웃</span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>

                <div className="test" style={{display: active_index === 0 ? "block" : "none"}}>
                    <div className="test2">
                        <div className="notification-headerBar">
                            <img src="/img/icon/bell(white).png" alt="bellIcon" className="notification-icon" />
                            <span className="notification-text">알림</span>
                            <div className="clear-button" onClick={delAll_notification}>
                                <div className="clear-button-text">모두 지우기</div>
                            </div>
                        </div>
                        <div className="notification-section">
                            {notifications.map((notification) => (
                                <div className="notification" key={notification.id}>
                                    <img src="/img/icon/x.png" alt="XIcon" className="notification-XIcon" data-id={notification.id} onClick={del_notification} />
                                    <p className="notification-content">
                                        {notification.content}
                                    </p>
                                    <span className="notification-date">
                                        {notification.date}
                                    </span>
                                </div>
                            ))}
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

                                {chatHeaderBars.map((chatHeaderBar) => (
                                    <div className="group-message-content" onClick={() => {showChat(chatHeaderBar.id)}}>
                                    <img src="/img/icon/group(message).png" alt="groupIcon" className="groupIcon" />
                                    <div className="text-group">
                                        <span className="groupName-text">({chatHeaderBar.groupName}) {chatHeaderBar.groupMember.length > 8 ? chatHeaderBar.groupMember.substring(0,8) + "..." : chatHeaderBar.groupMember}</span>
                                        {chatContents.map((chatContent) => (
                                            chatContent.chatgroup === chatHeaderBar.id && 
                                            chatContent.chatNum === Math.max(...chatContents.map(chatContent => chatContent.chatNum)) && (
                                                <p className="message-content">{chatContent.content}</p>
                                            )
                                        ))}
                                    </div>
                                    <img src="/img/icon/redDot.png" alt="redDot" className="redDot" />
                                </div>
                                ))}

                                {/* <div className="group-message-content">
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
                                </div> */}
                            </div>

                        </div>

                    </div>
                </div>

                <div className="chat-section">
                    <div className="test">

                        {chatHeaderBars.map((chatHeaderBars) => (
                            <div className={`chat-background chat-background-${chatHeaderBars.id}`}>

                                <div className="chat-headerBar">
                                    <p className="chat-partner">{chatHeaderBars.groupMember}</p>
                                    <img src="/img/icon/arrow(down).png" alt="arrow-icon" className={`arrow-icon arrow-icon-${chatHeaderBars.id}`} onClick={() => {toggleChat(chatHeaderBars.id)}} />
                                    <img src="/img/icon/x.png" alt="x-icon" className="x-icon" onClick={() => {closeChat(chatHeaderBars.id)}}/>
                                </div>

                                <div className={`chat-main chat-main-${chatHeaderBars.id}`} >

                                    <div className="chatbox">
                                        <div className="chatbox-background">
                                            <input />
                                            <img src="/img/icon/send-chat.png" alt="send-chat-icon" className="send-chat-icon" />
                                        </div>
                                    </div>

                                    <div className="chat-content-group">

                                        {chatContents.map((chatContent) => (
                                            chatContent.chatgroup === chatHeaderBars.id && (
                                                chatContent.senderType === "recipient" ? (
                                                    <div className="chat-recipient">
                                                        <img src="/img/icon/person(comment).png" alt="recipient-icon" className="recipient-icon" />
                                                        <div className="chat-info">
                                                            <span className="chat-recipient-name">{chatContent.name}</span>
                                                            <div className="chat-text-box">
                                                                <p className="chat-content">{chatContent.content}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="chat-sender">
                                                        <div className="chat-text-box">
                                                            <p className="chat-content">{chatContent.content}</p>
                                                        </div>
                                                    </div>
                                                )
                                        )))}
                                        
                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>
                </div>

            </header>
        </>
        
    );
};

export default Header;