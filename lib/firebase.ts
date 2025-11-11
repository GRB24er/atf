import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBh6ckv3NBNYc6DNbJxM2XHfYSdq4X7xnU",
  authDomain: "atfjets-chat.firebaseapp.com",
  databaseURL: "https://atfjets-chat-default-rtdb.firebaseio.com",
  projectId: "atfjets-chat",
  storageBucket: "atfjets-chat.appspot.com",
  messagingSenderId: "629455340083",
  appId: "1:629455340083:web:32b006951294ad249f9946",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
