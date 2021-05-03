import { IconButton } from '@material-ui/core';
import {  ControlPoint as PlusIcon, MicNone as MicNoneIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChatId, selectChatName } from '../../features/chatSlice';
import db from '../../firebase/firebase';
import Message from '../message/message';
import './chatarea.css';
import firebase from 'firebase';
import { selectUser } from '../../features/userSlice';
import FlipMove from 'react-flip-move';

const ChatArea=()=>{

    const [text, setText] = useState('');
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);
    const [messages, setMessages] = useState([]);
    const user = useSelector(selectUser);

    useEffect(()=>{
        if(chatId){
            db.collection('chats').doc(chatId).collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot=>
                    setMessages(snapshot.docs.map((doc)=>(
                        {
                            id: doc.id,
                            data: doc.data(),
                        }
                    )))
                )
        }
    },[chatId])

    const sendMessage=(e)=>{
        e.preventDefault();
        
        db.collection('chats').doc(chatId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: text,
            uid: user.uid,
            email: user.email
        })

        setText('');
    }

    return(
        <div>
            <div className="chat">
                <div className="chat-header">
                    <h4>
                        To: 
                        <span className="channel-name"> {chatName}</span>
                    </h4>
                    <IconButton>
                        <PlusIcon/>
                    </IconButton>
                </div>
                <div className="chat-messages">
                    <FlipMove>
                        {messages.map(message=>{
                            return(
                                <Message key={message.id} contents={message.data}/>
                            )
                        })}
                    </FlipMove>
                </div>
                <div className="chat-input">
                    <form>
                        <input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Type something" type="text"/>
                        <button onClick={sendMessage}>Send Message</button>
                    </form>

                    <IconButton>
                        <MicNoneIcon/>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default ChatArea;