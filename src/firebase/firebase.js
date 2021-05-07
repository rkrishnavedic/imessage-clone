import firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREAPI_KEY,
    authDomain: "flash-chat-df12d.firebaseapp.com",
    projectId: "flash-chat-df12d",
    storageBucket: "flash-chat-df12d.appspot.com",
    messagingSenderId: "925616774618",
    appId: process.env.REACT_APP_FIREAPI_ID
}

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {auth, storage};
export default db;
