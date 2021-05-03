import React from 'react';
import ChatArea from '../chatarea/chatarea';
import Sidebar from '../sidebar/sidebar';
import './chat.css';

const Chat=()=>{
    return (
        <div className="imessage">
            <Sidebar/>
            <ChatArea/>
        </div>
    )
}

export default Chat;