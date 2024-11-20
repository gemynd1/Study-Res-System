import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import InfoBar from "../Chating/InfoBar";
import Input from "../Chating/Input";
import Messages from "../Chating/Messages";

// import './Chat.css'
import TextContainer from "../Chating/TextContainer";

const ENDPOINT = 'http://localhost:3001'

let socket

const Chat = ({ location, open, onClose, onClick, url}) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const [showChat, setShowChat] = useState(true);
    const [XChat, setXChat] = useState(true);

    const handleClick = () => {
        setShowChat(prevState => !prevState);
    }

    const handleClose = () => {
        setXChat(false);
        if(socket) {
            socket.disconnect();
        }
    }

    useEffect(() => {
        // 여기선 name과 room을 url에서 가져온다.
        // 이유는 setRoom과 setName이 적용되기 전에 socket.emit('join')이 실행되기 때문이다.
        // url에서 가져오는 방법이 아닌 다른 방법으로 name과 room을 가져오려면
        // 미리 정해진 방법으로 name과 room을 가져오는 것이 아닌
        // socket.emit('join')이 실행되기 전에 setRoom과 setName이 실행되도록 해야 한다.
        const { name = '', room = '' } = queryString.parse(window.location.search)

        console.log(name, room)

        if (!name.trim() || !room.trim()) {
            console.warn("Invalid name or room"); // 디버깅용 경고 메시지
            return;
        }

        if (socket) {
            socket.disconnect();
        }

        socket = io(ENDPOINT)

        setRoom(room)
        setName(name)

        socket.emit('/chating/join2', { name, room }, (error) => {
            if (error) {
                alert(error)
            }
        })

        return () => {
            if (socket) {
                socket.disconnect(); // 컴포넌트가 언마운트될 때 소켓 연결 종료
            }
        };
    }, [window.location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((messages) => [...messages, message])
        })

        socket.on('roomData', ({ users }) => {
            setUsers(users)
        })
    }, [])

    const sendMessage = (event) => {
        event.preventDefault()

        if (message) {
            // console.log(message)
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }
    console.log("Sending message:", message);

    if (!XChat) {
        return null; // UI를 완전히 숨김
    }

    return (

        <div className='outerContainer'>
            <div className='container'>
                {showChat ? (
                    <InfoBar room={room} onClose={handleClose} onToggle={handleClick} />) : null}

                {showChat ? (
                    <>
                        <div className="messageContent">
                            <Messages messages={messages} name={name} />
                        </div>
                        <div className="inputContent">
                            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                        </div>
                    </>
                    ): null}

                {!showChat && (
                    <button
                        onClick={handleClick}
                        style={{
                            position: 'fixed',
                            bottom: '10px',
                            right: '10px',
                            padding: '10px',
                            backgroundColor: '#268B5F',
                            color: '#FFF',
                            border: 'none',
                            cursor: 'pointer',
                            width: '300px',
                            height: '40px',
                            borderRadius: "20px 20px 0 0",
                            fontSize: '16px'

                        }}
                    >
                        채팅방 열기
                    </button>
                )}
            </div>
            {/*<TextContainer users={users} />*/}
        </div>
    )
}

export default Chat;