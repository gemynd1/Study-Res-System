import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import "../../../../style/Chating.css";
import Chat from "./Chat";
import Messages from "./Messages";
import {Modal} from "@mui/material";
import Message from "./Message/Message";

function Join2({open, onClose, onEnterCheck}) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState('')
    const [url, setUrl] = useState('');
    const navigate = useNavigate();

    const handleEnterChat = (e) => {
        if (sessionStorage.getItem("name") || room) {
            setShowChat(true);
            // setUrl(`/chating/join2?name=${sessionStorage.getItem("name")}&room=${room}`);
            // name과 room 정보로 채팅 페이지로 이동
            navigate(`?name=${sessionStorage.getItem("name")}&room=${room}`);
        } else {
            return null;
        }
        // // 세션에 name이 없거나 room이 비어 있으면 이동을 막음
        // if (!sessionStorage.getItem("name") || !room) {
        //     e.preventDefault();
        //     return;
        // }

    };

    // const handleOverlayClick = (e) => {
    //     if (e.target === e.currentTarget) {
    //         onClose();
    //     }
    // }

    return (
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                {/*<div className='heading'>*/}
                {/*    <img src="/img/icon/chat(white).png" alt="채팅" style={{width: "24px", height: "24px", marginLeft: "3%"}}/>*/}
                {/*    <span>채팅방에 오신 것을 환영합니다</span>*/}
                {/*</div>*/}
                <div className="chatJoinContent">
                    <span>채팅방에 입장하시려면</span>
                    <span>채팅방 번호를 입력해주세요.</span>
                </div>
                <div className="joinInput">
                    <input
                        placeholder='이름'
                        className='joinInput'
                        type='text'
                        readOnly
                        value={sessionStorage.getItem("name")}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div className="joinInput2">
                    <input
                        placeholder='채팅방 번호'
                        className='joinInput mt-20'
                        type='text'
                        value={room}
                        onChange={(event) => setRoom(event.target.value)}
                    />
                </div>
                {/*<Link*/}
                {/*    onClick={(e) => (!sessionStorage.getItem("name") || !room ? e.preventDefault() : null)}*/}
                {/*    to={`/chating/chat?name=${sessionStorage.getItem("name")}&room=${room}`}*/}
                {/*    style={{textDecoration: 'none'}}*/}
                {/*>*/}
                    <div className="ButtonContent">
                        <button className="joinButton" type='button' onClick={handleEnterChat}>
                            채팅방 입장하기
                        </button>
                    </div>
                {/*</Link>*/}
            </div>
            <div className="ChatStyle">
                {showChat && (
                    <div className="ChatContent">
                        {/*<Modal open={showChat} />*/}
                        <Chat open={showChat} room={room}/>
                        {/*<Message message={message} name={name} />*/}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Join2;
