import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCDpwx5muT1ybeEt6vEKPUwqezemY9R-II",
    authDomain: "auth-project-d6b82.firebaseapp.com",
    databaseURL: "https://auth-project-d6b82.firebaseio.com",
    projectId: "auth-project-d6b82",
    storageBucket: "auth-project-d6b82.appspot.com",
    messagingSenderId: "421375847879",
    appId: "1:421375847879:web:bdd0879bd327514a5ffde2",
    measurementId: "G-4QZL5C2PQZ"
  };
  
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export const firebaseAuth = firebaseApp.auth();

  // go to firebase console and add web app to do it
  