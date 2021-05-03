import { Avatar } from '@material-ui/core';
import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import './message.css';

const Message = forwardRef(
    (
        {id, contents:{timestamp, email, message, uid}}
        ,ref
    )=>{

    const user = useSelector(selectUser);

    return (
        <div ref={ref} className={`message ${user.email === email && "message-sender"}`}>
            <Avatar className="message-photo" src="https://randomuser.me/api/portraits/women/63.jpg" />
            <p>{message}</p>
            <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
        </div>
    )
})

export default Message;