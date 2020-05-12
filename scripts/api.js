// console.log(sessionStorage.getItem('uid'));
// firebase config api key
var firebaseConfig = {
    apiKey: "AIzaSyBkHKGfFDD18oPfZ3Alk1np8KKtd9A09hM",
    authDomain: "stemcomp-e7b1b.firebaseapp.com",
    databaseURL: "https://stemcomp-e7b1b.firebaseio.com",
    projectId: "stemcomp-e7b1b",
    storageBucket: "stemcomp-e7b1b.appspot.com",
    messagingSenderId: "436730235957",
    appId: "1:436730235957:web:587c8bee3d1ac17e36b57c"
  };
  


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();

// auth.onAuthStateChanged(user => {
//   if(user) {
//     // console.log(user.email);
//     console.log("LOGGED IN")
    
//   } else {
//     console.log("NOT LOGGED IN")
//     // something
//   }
// })