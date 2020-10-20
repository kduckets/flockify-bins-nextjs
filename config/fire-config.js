//TODO: move to environment variables
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDkMaDVBQAlv3p296nUGzDpiHeVtSs-nTA",
    authDomain: "flockify.firebaseapp.com",
    databaseURL: "https://flockify.firebaseio.com",
    projectId: "firebase-flockify",
    storageBucket: "firebase-flockify.appspot.com",
    messagingSenderId: "390824755072",
    appId: "1:390824755072:web:457c03176d696ba2854b65"
  };try {
    firebase.initializeApp(firebaseConfig);
  } catch(err){
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)}
  }
  
  const fire = firebase;
  export default fire;