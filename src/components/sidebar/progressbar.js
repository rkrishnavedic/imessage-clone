import React, { useEffect } from 'react';
import './sidebar';
import {motion} from 'framer-motion';
import useStorage from '../../firebase/useStorage';
import { auth } from '../../firebase/firebase';


const ProgressBar = ({file, setFile})=>{
    const {url, progress} = useStorage(file);

    useEffect(()=>{
        if(url){
            auth.currentUser.updateProfile({
                photoURL:url
            })
            setFile(null);
        }
    },[url, setFile])
    

    return (
        <motion.div
        initial={{width:0}}
        animate={{width: progress+'%'}}
        className="bg-primary progress-bar p-3">{Math.round(progress)}%</motion.div>
    )
}

export default ProgressBar;