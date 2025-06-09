
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const googleButton = document.querySelector(".button-google");

    googleButton.addEventListener("click", async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("Usuario autenticado:", user);
        window.location.href = "/";
    } catch (error) {
        console.error("Error al iniciar sesión con Google:", error);
    }
    });