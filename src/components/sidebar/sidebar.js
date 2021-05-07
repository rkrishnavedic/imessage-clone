import { Avatar, Button, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './sidebar.css';
import {
    ArrowBack,
    PowerSettingsNew,
     RateReviewOutlined as RateReviewOutlinedIcon,
     Search as SearchIcon,
     Settings
 } from '@material-ui/icons';
import SidebarChat from '../sidebarchat/sidebarchat';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../../features/userSlice';
import db, { auth } from '../../firebase/firebase';
import UploadAvatar from './uploadavatar';
import {motion} from 'framer-motion';


const Sidebar=()=>{

    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    const [chats, setChats] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [settingsTab, setSettingsTab] = useState(false);
    const [editName, setEditName] = useState(user.displayName);


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

    const handleAvatarClick=()=>{
        setShowDropdown(!showDropdown);
        //console.log(user);
    }

    const handleOutClick=(e)=>{
        if(e.target.classList.contains('settings-modal')) {
            setShowDropdown(false);
            setSettingsTab(false);
        }
    }

    const handleCancelChanges=()=>{
        setSettingsTab(false);
        setEditName(user?.displayName);
    }

    const handleSaveChanges=async ()=>{

        await auth.currentUser.updateProfile({
            displayName: editName,
        })

            dispatch(
                login({
                  uid: auth.currentUser.uid,
                  email: auth.currentUser.email,
                  photoURL: auth.currentUser.photoURL,
                  displayName: auth.currentUser.displayName
                  })
              )
        setSettingsTab(false);

    }

    return (
        <div>
            <div className="sidebar">
                <div className="sidebar-header">
                    <Avatar className="avatar-glow" onClick={handleAvatarClick} src={user.photoURL} />
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
            {showDropdown &&
                <motion.div initial={{opacity:0}} animate={{opacity:1}} onClick={handleOutClick} className="settings-modal">
                    <motion.div initial={{scale:0}} animate={{scale:1}} className="settings-menu">
                        {!settingsTab?
                        <div>
                        <div className="user-det">
                            <Avatar src={user.photoURL} style={{width:'70px', height:"70px"}}/>
                            <span style={{color:'blue', marginTop:'5px'}}>{user.displayName!=null? user.displayName: '<No Name>'}</span>
                             <small>{user.email}</small>
                        </div>
                        <div className="user-menu">
                            <IconButton title="settings">
                                <Settings onClick={()=>setSettingsTab(true)}/>
                            </IconButton>
                            
                            <IconButton onClick={()=>auth.signOut()} title="logout">
                                <PowerSettingsNew/>
                            </IconButton>
                        </div>
                        </div>
                        :
                        <div className="settings-set">
                            <IconButton>
                                <ArrowBack onClick={()=>setSettingsTab(false)}/>
                            </IconButton>
                            <div className="settings-edit">
                                <input value={editName} onChange={(e)=>{setEditName(e.target.value)}} placeholder="your name"/>
                                <UploadAvatar/>
                                <div className="settings-save">
                                    <Button style={{borderRadius:"20px"}} variant="contained" color="primary" onClick={handleSaveChanges}>Save Changes</Button>
                                    <Button style={{borderRadius:"20px"}} variant="contained" color="default" onClick={handleCancelChanges}>Cancel</Button>
                                </div>
                                
                            </div>
                        </div>
                        }
                    </motion.div>
                </motion.div>
            }
        </div>
    )
}

export default Sidebar;