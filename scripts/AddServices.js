// Funcion para  servicios
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-storage.js";

const storage = window.firebaseStorage;
 
function addService( img, name, category, characteristcs, stock, price, description, recommendations,howToDoIt, duration ) {
    fetch("http://localhost:3000/services", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
           
            img,
            name,
            category,
            characteristcs,
            stock,
            price,
            description,
            recommendations,
            howToDoIt,
            duration



        })
    })
    .then(res => res.json())
    .then(data => console.log("Respuesta del backend:", data))
    .catch(err => console.error("Error en fetch:", err));

}


document.getElementById("registroFormServices").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("imagenS");
    const file = fileInput.files[0]; 

     if (!file) {
        alert("Por favor selecciona una imagen.");
        return;
    }

    try {
        const storageRef = ref(storage, `servicios/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        console.log("IMAGEN ENVIADA");
        const imgURLS = await getDownloadURL(snapshot.ref);
        
        const nameS = document.getElementById("nombreS").value;
        const categoryS = document.getElementById("categoriaS").value;
        const characteristcsS = document.getElementById("caracteristicasS").value;
        const stockS = document.getElementById("stockS").value;
        const priceS = document.getElementById("precioS").value;
        const descriptionS = document.getElementById("descripcionS").value;
        const recommendationsS = document.getElementById("recomendacionS").value;
        const howToDoItS = document.getElementById("agendaS").value;
        const durationS = document.getElementById("duracionS").value;
        
        addService(imgURLS, nameS, categoryS, characteristcsS, stockS, priceS, descriptionS, recommendationsS, howToDoItS, durationS)
        
        e.target.reset();

        } catch (error) {
        console.error("Error al subir la imagen:", error);
        alert("Hubo un error al subir la imagen.");
    }
    });

