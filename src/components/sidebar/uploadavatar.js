import React, { useState } from 'react';
import './sidebar';
import {motion} from 'framer-motion';
import ProgressBar from './progressbar';


const UploadAvatar = () =>{

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const types = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/tiff',
        'image/bmp'
    ]

    const changeHandler = (e)=>{
        let selected = e.target.files[0];
        if(selected && types.includes(selected.type)){
            setFile(selected);
            setError('');
        }else{
            setFile(null);
            setError('Please select an image file (png, jpg, jpeg, tiff or bmp)');
        }
    }

    return(
        <form className="avatar-form">
            <label>
            <input style={{height:0, width:0, opacity:0}} type="file" onChange={changeHandler}/>
            <motion.span
            whileHover={{scale:1.1, originY:-1}}
            transition={{type:'spring', stiffness:300}}
            className="avatar-span"
             >
                 Upload New Avatar</motion.span>
            </label>
            <div className="output">
                {error && <div className="error">{error}</div>}
                {file && <div className="file">{file.name}</div>}
                {file && <ProgressBar file={file} setFile={setFile} />}
                </div>
                
        </form>
    )
}

export default UploadAvatar;