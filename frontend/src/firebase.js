import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyDTOXrr636yLzksnX8wr--MTXaBjXFG2Zc",
  authDomain: "instagram-bf1c6.firebaseapp.com",
  projectId: "instagram-bf1c6",
  storageBucket: "instagram-bf1c6.appspot.com",
  messagingSenderId: "607422376652",
  appId: "1:607422376652:web:011d244440aff187623069",
  measurementId: "G-FDQD3YQJ2Y",
});

const auth = firebase.auth();
const storage = firebase.storage();

export { storage, auth };
