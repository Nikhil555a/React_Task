import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWHaIfKu4GK750OyCQUfA-U8YsErej1aU",
  authDomain: "todolist-31227.firebaseapp.com",
  projectId: "todolist-31227",
  // storageBucket: "todolist-31227.firebasestorage.app",
  storageBucket: "todolist-31227.appspot.com",

  messagingSenderId: "262099646010",
  appId: "1:262099646010:web:de8e184ba505d5ba79e703"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);