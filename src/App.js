import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Chat from './components/chat/chat';
import Login from './components/login/login';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase/firebase';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=>{
    auth.onAuthStateChanged(authUser=>{
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
    })
  },[])

  return (
    <div>
      {user? 
          <Chat />
          :
          <Login/>
      }
    </div>
  );
}

export default App;
