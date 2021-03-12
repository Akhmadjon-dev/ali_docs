import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyC2_IY_0_FKx6k-GXqcahjfDyXkjZpte08",
    authDomain: "alitech-contracts.firebaseapp.com",
    databaseURL: "https://alitech-contracts.firebaseio.com",
    projectId: "alitech-contracts",
    storageBucket: "alitech-contracts.appspot.com",
    messagingSenderId: "476243184734",
    appId: "1:476243184734:web:6666bef553de3c987eb8cf",
    measurementId: "G-64W3B4D3PJ"
  };

  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
