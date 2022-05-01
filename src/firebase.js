import { initializeApp } from "firebase/app";
import {
 GoogleAuthProvider,
 getAuth,
 signInWithPopup,
 signInWithEmailAndPassword,
 createUserWithEmailAndPassword,
 sendPasswordResetEmail,
signOut,
}
from "firebase/auth";
import {
getFirestore,
query,
getDocs,
collection,
where,
addDoc,
} from "firebase/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDYidEAT_gMmc3WwvWZ46N5crdR3M-BMYw",
    authDomain: "ks-soccer.firebaseapp.com",
    databaseURL: "https://ks-soccer-default-rtdb.firebaseio.com",
    projectId: "ks-soccer",
    storageBucket: "ks-soccer.appspot.com",
    messagingSenderId: "1074089179461",
    appId: "1:1074089179461:web:90f7907c2c7496064d662c",
    measurementId: "G-`GG1MEBJ5VR"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    console.log('1')
    if (docs.docs.length === 0) {
      console.log('2')
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    else {
      return { res: 'user-exist',  user }
    }
    return res.user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  export const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  export  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const logout = () => {
    signOut(auth);
  };

  export {
    googleProvider,
    logout,
  };
  