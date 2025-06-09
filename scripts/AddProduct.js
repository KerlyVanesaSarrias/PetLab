import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-storage.js";


function getAuthHeaders() {
    const token = localStorage.getItem('jwtToken');
    return {
        'Authorization': `Bearer ${token}`
    };
}
const storage = window.firebaseStorage;

function addProduct(imagen, nombre, categoria, caracteristicas, stock, precio, descripcion) {
    fetch("https://8mameppfds.us-east-1.awsapprunner.com", {
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
            stock,
            precio,
            descripcion
        })
    })
    .then(res => res.json())
    .then(data => console.log("Respuesta del backend:", data))
    .catch(err => console.error("Error en fetch:", err));
}



document.getElementById("registroForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("imagen");
    const file = fileInput.files[0]; 
    
    
    if (!file) {
        alert("Por favor selecciona una imagen.");
        return;
    }

    try {
        const storageRef = ref(storage, `productos/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        console.log("IMAGEN ENVIADA");
        const imgURL = await getDownloadURL(snapshot.ref);

        const nombre = document.getElementById("nombre").value;
        const categoria = document.getElementById("categoria").value;
        const caracteristicas = document.getElementById("caracteristicas").value;
        const stock = document.getElementById("stock").value;
        const precio = document.getElementById("precio").value;
        const descripcion = document.getElementById("descripcion").value;

        addProduct(imgURL, nombre, categoria, caracteristicas, stock, precio, descripcion);

        e.target.reset();

    } catch (error) {
        console.error("Error al subir la imagen:", error);
        alert("Hubo un error al subir la imagen.");
    }
});











//? Este script solo almacena los datos temporalmente en un array vacio, para consultrols los observamos en consola

// const productos = [];


// document.getElementById("registroForm").addEventListener("submit", (e) => {
//     e.preventDefault();

//     const id = productos.length ? Math.max(...productos.map(u => u.id)) + 1 : 1;

//     const img = "http.cdfdf//";
//     const name = document.getElementById("nombre").value;
//     const category = document.getElementById("categoria").value;
//     const characteristcs = document.getElementById("caracteristicas").value;
//     const stock = document.getElementById("stock").value;
//     const price = document.getElementById("precio").value;
//     const description = document.getElementById("descripcion").value;
 
//     const newProduct = { id, img, name, category, characteristcs, stock, price, description };
    
//     productos.push(newProduct)

//     console.log(productos);
    
//     e.target.reset()

// });

//  const services = [];


// document.getElementById("registroForm").addEventListener("submit", (e) => {
//     e.preventDefault();

//     const id = services.length ? Math.max(...services.map(u => u.id)) + 1 : 1;

//     const img = "http.cdfdf//";
//     const name = document.getElementById("nombre").value;
//     const category = document.getElementById("categoria").value;
//     const characteristcs = document.getElementById("caracteristicas").value;
//     const stock = document.getElementById("stock").value;
//     const price = document.getElementById("precio").value;
//     const description = document.getElementById("descripcion").value;
//     const recomendations = document.getElementById("recomendacion").value;
//     const howToDoIt = document.getElementById("agenda");
//     const duration = document.getElementById("duracion");

//     const newService = { id, img, name, category, characteristcs, stock, price, description, recomendations, howToDoIt, duration };

//     services.push(newService)

//     console.log(services);

//     e.target.reset()

// });
