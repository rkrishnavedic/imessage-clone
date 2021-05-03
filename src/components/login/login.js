import React, { useState } from 'react';
import './login.css';
import { Button, FormGroup, Input} from '@material-ui/core';
import { auth } from '../../firebase/firebase';
import { motion } from 'framer-motion';

const Login = ()=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const clearInputs=()=>{
        setEmail('');
        setPassword('');
    }

    const signIn = ()=>{
        auth.signInWithEmailAndPassword(email, password)
            .catch(err=>setError(err.message))

        clearInputs();
    }

    return (
        <motion.div initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1}} >
            <div className="login">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/56/IMessage_logo_%28Apple_Inc.%29.png" alt="messagesLogo"/>
                
                <FormGroup className="login-form">
                    <Input value={email} onChange={(e)=>{setError('');setEmail(e.target.value)}} placeholder="email" type="email"/>
                    <Input value={password} onChange={(e)=>{setError('');setPassword(e.target.value)}} placeholder="password" type="password"/>
                    {error && <p style={{color:'red',fontSize:'12px', textAlign:'center'}}>{error}</p>}
                    <Button onClick={signIn}>sign in</Button>
                </FormGroup>
            </div>
        </motion.div>
    )

}

export default Login;