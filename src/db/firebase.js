import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyAnfUgsy0cAMZd1KcHG5mOHI77bW4Jv4x8",
    authDomain: "alitech-contracts-3a909.firebaseapp.com",
    databaseURL: "https://alitech-contracts-3a909.firebaseio.com",
    projectId: "alitech-contracts-3a909",
    storageBucket: "alitech-contracts-3a909.appspot.com",
    messagingSenderId: "219959651579",
    appId: "1:219959651579:web:39f66d5f9bb5a66697145e",
    measurementId: "G-01YQ6TYSK6"
  };

  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
