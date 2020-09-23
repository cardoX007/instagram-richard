
  import firebase from 'firebase';
  
  const firebaseApp= firebase.initializeApp({
    apiKey: "AIzaSyBv9PpF-3iWvrFV-74Al5QV6FWEgdxoMVQ",
    authDomain: "insta-clone-a7d90.firebaseapp.com",
    databaseURL: "https://insta-clone-a7d90.firebaseio.com",
    projectId: "insta-clone-a7d90",
    storageBucket: "insta-clone-a7d90.appspot.com",
    messagingSenderId: "628637364421",
    appId: "1:628637364421:web:6cf94ec904f822a11540ac",
    measurementId: "G-33NFV8B6TZ"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export{ db, auth, storage};