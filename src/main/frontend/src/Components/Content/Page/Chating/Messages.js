import React, {useEffect, useRef} from 'react';

import BasicScrollToBottom from "react-scroll-to-bottom";
import Message from "../Chating/Message/Message";

import "../../../../style/Chating.css";

function Messages({ messages, name }) {
    useEffect(() => {
        console.log(messages);
    }, [messages]);


    return (
        <BasicScrollToBottom className="messages">
            {messages.map((message, i) => {
                return <div key={i}><Message message={message} name={name} /></div>
            })}
        </BasicScrollToBottom>
    );
}

export default Messages;