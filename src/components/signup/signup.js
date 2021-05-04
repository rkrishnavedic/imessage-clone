import React, { useState } from 'react';
import './signup.css';
import { Button, FormGroup, IconButton, Input} from '@material-ui/core';
import { auth } from '../../firebase/firebase';
import { motion } from 'framer-motion';
import {Cancel as CancelIcon} from '@material-ui/icons';

const SignUp = (props)=>{

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    const clearInputs=()=>{
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setUsername('');
    }

    const signUp = ()=>{
        if(password!==confirmPassword){
            setError('Confirm password must exactly match password!')
            return;
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then((res)=>{
                console.log(res);
                //res.user.sendEmailVerification();
                setSignUpSuccess(true);
            })
            .catch(err=>setError(err.message))
        

        clearInputs();
    }

    return (
        <>
        <motion.div initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1}} >
            <div className="signup">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/56/IMessage_logo_%28Apple_Inc.%29.png" alt="messagesLogo"/>
                
                <FormGroup className="signup-form">
                    <Input value={username} onChange={(e)=>{setError('');setUsername(e.target.value)}} placeholder="username" type="text"/>
                    <Input value={email} onChange={(e)=>{setError('');setEmail(e.target.value)}} placeholder="email" type="email"/>
                    <Input value={password} onChange={(e)=>{setError('');setPassword(e.target.value)}} placeholder="password" type="password"/>
                    <Input value={confirmPassword} onChange={(e)=>{setError('');setConfirmPassword(e.target.value)}} placeholder="confirm password" type="password"/>
                    {error && <p style={{color:'red',fontSize:'12px', textAlign:'center'}}>{error}</p>}
                    <Button onClick={signUp}>sign Up</Button>
                    <p style={{color:'#3ea4fb',marginTop:'10px',fontSize:'13px', textAlign:'center'}}>already registered? &ensp;<span onClick={()=>props.setShowSignUpForm(false)} style={{fontWeight:'bold', cursor:'pointer'}}>Login</span></p>
                </FormGroup>
            </div>
        </motion.div>
        {signUpSuccess && 
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="signup-modal">
            <motion.div initial={{scale:0}} animate={{scale:1}} className="signup-details">
                <p style={{padding:'20px', textAlign:'center'}}><span style={{color:'green',fontWeight:'500', fontSize:'17px'}}>Registration Success!</span> <br/> Verification link sent to your account. <br/> Once you veriy, you can log in to your account! </p>
                <IconButton onClick={()=>{clearInputs();setSignUpSuccess(false);props.setShowSignUpForm(false);}}>
                    <CancelIcon/>
                </IconButton>
            </motion.div>
        </motion.div>
        }
        </>
    )

}

export default SignUp;