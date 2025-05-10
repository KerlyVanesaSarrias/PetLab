import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAq-hDdBH1GIhaiQ6dOMiMxDexQVjQodak",
    authDomain: "apptactical-74663.firebaseapp.com",
    projectId: "apptactical-74663",
    storageBucket: "apptactical-74663.appspot.com",
    messagingSenderId: "314383299963",
    appId: "1:314383299963:web:c378ef05aa238fa302f9de",
    measurementId: "G-MYYE89DV7W"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

window.firebaseStorage = storage;
