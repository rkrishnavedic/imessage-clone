import React, { useEffect, useRef } from 'react';
import FlipMove from 'react-flip-move';
import Message from '../message/message';
import './chatarea.css';

const MessagesDisplay=({messages})=>{

    const messageEndRef=useRef();

    useEffect(()=>{
        messageEndRef.current?.scrollIntoView({behavior: "smooth"});
        //console.log('scrolling bottom');
    },[messages]);


    return(
        <div className="chat-messages">
            <FlipMove>
                        
                {messages.map(message=>{
                    return(
                        <Message key={message.id} contents={message.data}/>
                    )
                })}
                    
            </FlipMove>
            <div ref={messageEndRef}></div>
        </div>
    )
}

export default MessagesDisplay;