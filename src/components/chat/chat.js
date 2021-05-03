import React from 'react';
import ChatArea from '../chatarea/chatarea';
import Sidebar from '../sidebar/sidebar';
import './chat.css';
import {motion} from 'framer-motion';

const Chat=()=>{

    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="imessage">
            <Sidebar/>
            <ChatArea/>
        </motion.div>
    )
}

export default Chat;