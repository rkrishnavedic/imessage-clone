import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './sidebar.css';
import {
     RateReviewOutlined as RateReviewOutlinedIcon,
     Search as SearchIcon
 } from '@material-ui/icons';
import SidebarChat from '../sidebarchat/sidebarchat';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import db, { auth } from '../../firebase/firebase';


const Sidebar=()=>{

    const user = useSelector(selectUser);
    const [chats, setChats] = useState([]);

    useEffect(()=>{
        db.collection('chats').onSnapshot(snapshot=>{
            setChats(snapshot.docs.map(doc=>({
                id: doc.id,
                data: doc.data()
            })));
        })
    },[])

    const addChat = ()=>{

        const chatName = prompt("Please enter a chat name");

        if(chatName){
            db.collection('chats').add({
                chatName: chatName,
            })
        }
    }

    return (
        <div>
            <div className="sidebar">
                <div className="sidebar-header">
                    <Avatar onClick={()=> auth.signOut()} src='https://randomuser.me/api/portraits/women/11.jpg' />
                    <div className="sidebar-search">
                        <SearchIcon/>
                        <input placeholder="Search"/>
                    </div>
                    <IconButton variant="outlined" className="sidebar-input-button">
                            <RateReviewOutlinedIcon onClick={addChat}/>
                    </IconButton>
                    
                </div>
                <div className="sidebar-chats">
                    {chats.map(chat=>{
                        return(
                        <SidebarChat key={chat.id} id={chat.id} chatName={chat.data.chatName} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;