import { Avatar } from '@material-ui/core';
import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import './message.css';

const Message = forwardRef(
    (
        {id, contents:{timestamp,name, photo,email, message, uid}}
        ,ref
    )=>{

    const user = useSelector(selectUser);

    return (
        <div ref={ref} className={`message ${user.email === email && "message-sender"}`}>
            <Avatar title={name? name: email} className="message-photo" src={photo} />
            <p>{message}</p>
            <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
        </div>
    )
})

export default Message;