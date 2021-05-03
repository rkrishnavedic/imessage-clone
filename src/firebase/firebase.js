import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAI8gmlb9Vq3-cXnE6eQ9a5y3f3kc_cz2E",
    authDomain: "flash-chat-df12d.firebaseapp.com",
    projectId: "flash-chat-df12d",
    storageBucket: "flash-chat-df12d.appspot.com",
    messagingSenderId: "925616774618",
    appId: "1:925616774618:web:b1cec7256910e4230cb4e3"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {auth, storage};
export default db;
