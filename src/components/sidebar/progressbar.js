import React, { useEffect } from 'react';
import './sidebar';
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
        <div className="progress-background">
            <div style={{width:`${Math.round(progress/4)+75}%`}} className="progress-done">
                {Math.round(progress)}%
            </div>
        </div>
    )
}

export default ProgressBar;