import {useState, useEffect} from 'react';
import { storage } from './firebase';

const useStorage = (file)=>{
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(()=>{

        //references
        const storageRef = storage.ref(file.name);
        storageRef.put(file).on('state_changed', (snap)=>{
            let precentage = (snap.bytesTransferred/snap.totalBytes)*100;
            setProgress(precentage);
        }, (err)=>{
            setError(err);
        }, async ()=>{
            const _url = await storageRef.getDownloadURL();
            setUrl(_url);
        });

    },[file])

    return {progress, url, error};

}

export default useStorage;