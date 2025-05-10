import { storage,ref,uploadBytes,getDownloadURL } from "./FirebaseConfig"; 
//! con esta funcion enviamos los datos desde el formulario html

 function addProduct( img, name, category, characteristcs, stock, price, description) {
     fetch("http://localhost:3000/products", {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            
             img,
             name,
             category,
             characteristcs,
             stock,
             price,
             description

         })
     }).then(res => res.json()).then(datos1 => console.log(datos1)
     ).catch(err => console.log(err)
     )

 }


 document.getElementById("registroForm").addEventListener("submit", async (e) => {
     e.preventDefault();
     const imgImput = document.getElementById("imagen").value;
     const listaImag = imgImput.files[0];

     if (!listaImag || !listaImag.type.startsWith("image/")) {
        alert("Por favor selecciona una imagen válida.");
        return;
    }
     
     const imgRef = ref(storage, `productos/${Date.now()}-${file.name}`);
     
     try {
         
        await uploadBytes(imgRef,file);


        const img = await getDownloadURL(imgRef);
        const name = document.getElementById("nombre").value;
        const category = document.getElementById("categoria").value;
        const characteristcs = document.getElementById("caracteristicas").value;
        const stock = document.getElementById("stock").value;
        const price = document.getElementById("precio").value;
        const description = document.getElementById("descripcion").value;
        
        addProduct(img, name, category, characteristcs, stock, price, description)

        e.target.reset()

     } catch (error) {
        console.error("Produjo un error en: ", error );
        
        
     }
     
     
 });

// Funcion para  servicios
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
    }).then(res => res.json()).then(datos1 => console.log(datos1)
    ).catch(err => console.log(err)
    )

}


document.getElementById("registroFormServices").addEventListener("submit", (e) => {
    e.preventDefault();

   
    const imgS = "http.cdfdf//";
    const nameS = document.getElementById("nombreS").value;
    const categoryS = document.getElementById("categoriaS").value;
    const characteristcsS = document.getElementById("caracteristicasS").value;
    const stockS = document.getElementById("stockS").value;
    const priceS = document.getElementById("precioS").value;
    const descriptionS = document.getElementById("descripcionS").value;
    const recommendationsS = document.getElementById("recomendacionS").value;
    const howToDoItS = document.getElementById("agendaS").value;
    const durationS = document.getElementById("duracionS").value;
    e.target.reset()

    addService(imgS, nameS, categoryS, characteristcsS, stockS, priceS, descriptionS,recommendationsS, howToDoItS, durationS  )
});

//! Esta funcion es para enviar datos manualmente
// addProduct(1, "http....", "cat", "Alimento", "suave", 24, 23000, "Comodo" );


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
