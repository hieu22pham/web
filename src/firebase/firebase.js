import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCN8gKMPmH0KHieyl8ioLSkEjgvsMHGEOQ",
  authDomain: "chat-web-10881.firebaseapp.com",
  projectId: "chat-web-10881",
  storageBucket: "chat-web-10881.appspot.com",
  messagingSenderId: "800975653413",
  appId: "1:800975653413:web:14bc57c98aa265df060dcc",
  measurementId: "G-79Y6RVM1VQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);