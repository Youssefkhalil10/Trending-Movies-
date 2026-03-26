// استيراد Firebase
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

// إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD3CnHhF0M0joAvLGwxqKDe6-8fC-55ic8",
  authDomain: "movies-web-app-7bfc6.firebaseapp.com",
  projectId: "movies-web-app-7bfc6",
  storageBucket: "movies-web-app-7bfc6.firebasestorage.app",
  messagingSenderId: "382618971708",
  appId: "1:382618971708:web:d8324985c5e2aab54b5d39",
  measurementId: "G-WD2N2SYCX3"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export const signUp = async (email, password)=>{

  try{
    const userCredential=await createUserWithEmailAndPassword(auth,email,password);
    return userCredential.user;
  }
  catch(error){
    throw error.message;
  }
}

export const login = async (email,password)=>{
  try{
    const userCredential = await signInWithEmailAndPassword(auth,email,password);
    return userCredential.user;
  }
  catch(error){
    throw error.message
  }
}

export const logout = async ()=>{
  try{
    await signOut(auth);
    localStorage.removeItem('userToken');
  }
  catch(error){
    throw error.message
  }
}

export { app , auth};



// export const signUp = async (email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     return userCredential.user; // يرجع بيانات المستخدم بعد التسجيل
//   } catch (error) {
//     throw error.message;
//   }
// };

// export const login = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     return userCredential.user; // يرجع بيانات المستخدم بعد تسجيل الدخول
//   } catch (error) {
//     throw error.message;
//   }
// };

// // دالة تسجيل الخروج
// export const logout = async () => {
//   try {
//     await signOut(auth);
//   } catch (error) {
//     throw error.message;
//   }
// };
