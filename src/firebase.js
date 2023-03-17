// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// import "firebase/auth";
// import {getFirestore, query,getDocs,collection,where,addDoc​​} from "firebase/firestore";
// ​​import {GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut​​} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtYECcFo5yzEALgO_xdLvI2XCOpq89hkQ",
  authDomain: "question-box-cf11e.firebaseapp.com",
  projectId: "question-box-cf11e",
  storageBucket: "question-box-cf11e.appspot.com",
  messagingSenderId: "528476667159",
  appId: "1:528476667159:web:de388b6a6c7045516f0b52"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
// const auth = getAuth(app);

// const googleProvider = new GoogleAuthProvider();

// const signInwGoogle = async () => {
//   try {
//     const res = await signInWithPopup(auth, googleProvider);
//     const user = res.user;
//     const q = query(collection(db, "users"), where("id", "==", user.id));
//     const docs = await getDocs(q);
//     if(docs.docs.length === 0) {
//       await addDoc(collection(db, "users"), {
//         id: user.id,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//       });
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }

// const logIn = async (email, password) => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//   } catch (err) {
//     console.error(err);
//   }
// }

// const register = async(name, email, password) => {
//   try {
//     const res = await createUserWithEmailAndPassword(auth, email, password);
//     const user = res.user;
//     await addDoc(collection(db, "users"), {
//       id: user.id,
//       name,
//       authProvider: "local", 
//       email,
//     });
//   } catch (err) {
//     console.error(err);
//   }
// }

// const logOut = () => {
//   signOut(auth);
// }

// const db = getFirestore(app);
// export {auth, db, signInwGoogle, logIn, register, logOut};
export {db};