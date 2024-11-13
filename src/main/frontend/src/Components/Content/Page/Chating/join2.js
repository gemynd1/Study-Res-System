import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "../../../../style/Chating.css";

function Join2({open, onClose}) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    if (!open) return null;

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
                    <span>이름과 결제하신 방 이름을 입력해주세요.</span>
                </div>
                <div className="joinInput">
                    <input
                        placeholder='이름'
                        className='joinInput'
                        type='text'
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div className="joinInput2">
                    <input
                        placeholder='채팅방'
                        className='joinInput mt-20'
                        type='text'
                        onChange={(event) => setRoom(event.target.value)}
                    />
                </div>
                <Link
                    onClick={(e) => (!name || !room ? e.preventDefault() : null)}
                    to={`/chating/chat?name=${name}&room=${room}`}
                    style={{textDecoration: 'none'}}
                >
                    <div className="ButtonContent">
                        <button className="joinButton" type='submit'>
                            채팅방 입장하기
                        </button>
                    </div>

                </Link>
            </div>
        </div>
    );
}

export default Join2;
