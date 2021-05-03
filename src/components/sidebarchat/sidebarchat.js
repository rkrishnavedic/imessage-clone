import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChatId, setChat } from '../../features/chatSlice';
import db from '../../firebase/firebase';
import './sidebarchat.css';
import {format as timeagoFormat} from 'timeago.js';

const SidebarChat=(props)=>{
    const {
        id,
        chatName,
    } = props;

    const dispatch = useDispatch();
    const [chatInfo, setChatInfo] = useState([]);
    const selectedChatId = useSelector(selectChatId);

    const handleChatClick=()=>{
        dispatch(
            setChat({
                chatId: id,
                chatName: chatName
            })
        )
    }

    useEffect(()=>{
        db.collection('chats').doc(id).collection('messages')
            .orderBy('timestamp', 'desc')
            .limit(1)
            .onSnapshot(snapshot=>{
                setChatInfo(snapshot.docs.map(doc=>doc.data()))
            })
    },[id])


    return(
        <div>
            <div onClick={handleChatClick} className={selectedChatId && selectedChatId===id? "sidebar-chat-active":"sidebar-chat"}>
                <Avatar src={chatInfo[0]?.photo} />
                <div className="sidebar-chat-info">
                    <h3>{chatName}</h3>
                    <p>{chatInfo[0]?.message}</p>
                    <small>{timeagoFormat(new Date(chatInfo[0]?.timestamp?.toDate()))}</small>
                </div>
            </div>
        </div>
    )
}

export default SidebarChat;