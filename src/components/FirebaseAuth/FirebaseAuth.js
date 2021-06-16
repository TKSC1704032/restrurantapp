import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAu9G9I00RkDlg-XW2IY-lDo7hLYaHde5g",
    authDomain: "hotrestrurant.firebaseapp.com",
    projectId: "hotrestrurant",
    storageBucket: "hotrestrurant.appspot.com",
    messagingSenderId: "531324547701",
    appId: "1:531324547701:web:be4b950808ea47d4b1fe3c"
};
 const fire= firebase.initializeApp(firebaseConfig);
 export default fire;