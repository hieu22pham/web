import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

var firebaseConfig = {
  apiKey: "AIzaSyCN8gKMPmH0KHieyl8ioLSkEjgvsMHGEOQ",
  authDomain: "chat-web-10881.firebaseapp.com",
  projectId: "chat-web-10881",
  storageBucket: "chat-web-10881.appspot.com",
  messagingSenderId: "800975653413",
  appId: "1:800975653413:web:14bc57c98aa265df060dcc",
  measurementId: "G-79Y6RVM1VQ"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
export default firebase;
