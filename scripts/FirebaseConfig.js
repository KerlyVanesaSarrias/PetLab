import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-storage.js";


const firebaseConfig = {
    apiKey: "AIzaSyDXOEfvwdZoKHgGy5fpG0bjl7hAR1wVqAc",
    authDomain: "petlab-6c7ad.firebaseapp.com",
    projectId: "petlab-6c7ad",
    storageBucket: "petlab-6c7ad.firebasestorage.app",
    messagingSenderId: "980993567961",
    appId: "1:980993567961:web:218638cccfe43f3680e2c8"
  };
  
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  
  export{storage,ref,uploadBytes,getDownloadURL};