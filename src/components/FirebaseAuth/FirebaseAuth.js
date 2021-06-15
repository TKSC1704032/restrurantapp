import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBN_Za6wO9Sui820hBYi43onB2F14Jg_rs",
  authDomain: "react-development-ad98d.firebaseapp.com",
  projectId: "react-development-ad98d",
  storageBucket: "react-development-ad98d.appspot.com",
  messagingSenderId: "177841140929",
  appId: "1:177841140929:web:a36b0e3718a0038a6d9040"
};
 const fire= firebase.initializeApp(firebaseConfig);
 export default fire;