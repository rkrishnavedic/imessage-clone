import React, { useState } from 'react';
import './login.css';
import { Button, FormGroup, IconButton, Input} from '@material-ui/core';
import { auth } from '../../firebase/firebase';
import { motion } from 'framer-motion';
import { Cancel } from '@material-ui/icons';

const Login = (props)=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [forgotPassword, setForgotPassword] = useState(false);
    const [recoverySent, setRecoverySent] = useState(false);

    const clearInputs=()=>{
        setEmail('');
        setPassword('');
    }

    const sendForgotPasswordMail=()=>{
        auth.sendPasswordResetEmail(email)
            .then(()=>{
                setRecoverySent(true);
                // console.log('success');
            }
            ).catch(err=>console.log(err))
    }

    const signIn = ()=>{
        auth.signInWithEmailAndPassword(email, password)
            .then(res=>{
                if(res.user.emailVerified===false){
                    setError('Your email is not verified. Check your mailbox!');
                    res.user.sendEmailVerification();
                }
            })
            .catch(err=>setError(err.message))

        clearInputs();
    }

    return (
        <>
        <motion.div initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1}} >
            <div className="login">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/56/IMessage_logo_%28Apple_Inc.%29.png" alt="messagesLogo"/>
                
                <FormGroup className="login-form">
                    <Input value={email} onChange={(e)=>{setError('');setEmail(e.target.value)}} placeholder="email" type="email"/>
                    <Input value={password} onChange={(e)=>{setError('');setPassword(e.target.value)}} placeholder="password" type="password"/>
                    <p style={{color:'red',fontSize:'12px', textAlign:'center'}}>{error}</p>
                    <Button onClick={signIn}>sign in</Button>
                    <p style={{color:'#3ea4fb',marginTop:'10px',fontSize:'13px', textAlign:'center'}}><span onClick={()=>setForgotPassword(true)} style={{fontWeight:'bold', cursor:'pointer'}}>Forgot Password?</span></p>
                    <p style={{color:'#3ea4fb',marginTop:'10px',fontSize:'13px', textAlign:'center'}}>dont have account? &ensp;<span onClick={()=>props.setShowSignUpForm(true)} style={{fontWeight:'bold', cursor:'pointer'}}>Register</span></p>
                </FormGroup>
            </div>
        </motion.div>
        {forgotPassword && 
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="signup-modal">
                <motion.div initial={{scale:0}} animate={{scale:1}} className="signup-details">
                    <p style={{padding:'20px', textAlign:'center'}}><span style={{color:'#0202ff',fontWeight:'500', fontSize:'17px'}}>forgot Password</span> <br/> Password recovery link will be sent to your mail <br/>  </p>
                    <Input placeholder="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                    <div >
                    <Button onClick={sendForgotPasswordMail} variant="outlined">Submit</Button>
                    <IconButton onClick={()=>{setForgotPassword(false);setRecoverySent(false);}}>
                        <Cancel/>
                    </IconButton>
                    </div>
                    {recoverySent && <p style={{padding:'20px', textAlign:'center',color:'green',fontWeight:'500', fontSize:'17px'}}> Recovery Link Sent. Check your inbox!</p>}
                    
                </motion.div>
            </motion.div>
            }
            </>
    )

}

export default Login;