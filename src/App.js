import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Chat from './components/chat/chat';
import Login from './components/login/login';
import SignUp from './components/signup/signup';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase/firebase';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const initUser = useCallback(()=>{
    auth.onAuthStateChanged(authUser=>{
      if(authUser?.emailVerified){
      if(authUser){

        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email,
            photoURL: authUser.photoURL,
            displayName: authUser.displayName
            })
        )

      }else{
        dispatch(logout());
      }
    }
    })
  },[dispatch])

  useEffect(()=>{
    initUser();
  },[initUser])

  return (
    <div>
      {user? 
          <Chat />
          :
          <>
          {
            showSignUpForm?
            <SignUp setShowSignUpForm={setShowSignUpForm}/>
            :
            <Login setShowSignUpForm={setShowSignUpForm}/>
          }
          </>
      }
    </div>
  );
}

export default App;
