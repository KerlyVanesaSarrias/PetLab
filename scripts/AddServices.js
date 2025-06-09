// Funcion para  servicios
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-storage.js";

const storage = window.firebaseStorage;

function getAuthHeaders() {
    const token = localStorage.getItem('jwtToken');
    return {
        'Authorization': `Bearer ${token}`
    };
}

function addService(imagen, nombre, categoria, caracteristicas, precio, descripcion, recomendaciones, agenda, duracion) {
    fetch("https://8mameppfds.us-east-1.awsapprunner.com/servicios", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        },
        body: JSON.stringify({

            imagen,
            nombre,
            categoria,
            caracteristicas,    
            precio,
            descripcion,
            recomendaciones,
            agenda,
            duracion


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

        const nombreS = document.getElementById("nombreS").value;
        const categoriaS = document.getElementById("categoriaS").value;
        const caracteristicasS = document.getElementById("caracteristicasS").value;
        const precioS = document.getElementById("precioS").value;
        const descripcionS = document.getElementById("descripcionS").value;
        const recomendacionesS = document.getElementById("recomendacionS").value;
        const agendaS = document.getElementById("agendaS").value;
        const duracionS = document.getElementById("duracionS").value;

        addService(imgURLS, nombreS, categoriaS, caracteristicasS, precioS, descripcionS, recomendacionesS, agendaS, duracionS)

        e.target.reset();

    } catch (error) {
        console.error("Error al subir la imagen:", error);
        alert("Hubo un error al subir la imagen.");
    }
});

