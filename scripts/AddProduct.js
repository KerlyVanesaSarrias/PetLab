//! con esta funcion enviamos los datos desde el formulario html

// function addProduct( img, name, category, characteristcs, stock, price, description) {
//     fetch("http://localhost:3000/products", {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
            
//             img,
//             name,
//             category,
//             characteristcs,
//             stock,
//             price,
//             description

//         })
//     }).then(res => res.json()).then(datos1 => console.log(datos1)
//     ).catch(err => console.log(err)
//     )

// }


// document.getElementById("registroForm").addEventListener("submit", (e) => {
//     e.preventDefault();

    
//     const img = "http.cdfdf//";
//     const name = document.getElementById("nombre").value;
//     const category = document.getElementById("categoria").value;
//     const characteristcs = document.getElementById("caracteristicas").value;
//     const stock = document.getElementById("stock").value;
//     const price = document.getElementById("precio").value;
//     const description = document.getElementById("descripcion").value;

//     e.target.reset()

//     addProduct(img, name, category, characteristcs, stock, price, description)
// });


//! Esta funcion es para enviar datos manualmente
// addProduct(1, "http....", "cat", "Alimento", "suave", 24, 23000, "Comodo" );


//? Este script solo almacena los datos temporalmente en un array vacio, para consultrols los observamos en consola

const productos = [];


document.getElementById("registroForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const id = productos.length ? Math.max(...productos.map(u => u.id)) + 1 : 1;

    const img = "http.cdfdf//";
    const name = document.getElementById("nombre").value;
    const category = document.getElementById("categoria").value;
    const characteristcs = document.getElementById("caracteristicas").value;
    const stock = document.getElementById("stock").value;
    const price = document.getElementById("precio").value;
    const description = document.getElementById("descripcion").value;
 
    const newProduct = { id, img, name, category, characteristcs, stock, price, description };
    
    productos.push(newProduct)

    console.log(productos);
    
    e.target.reset()

});

 const services = [];


document.getElementById("registroForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const id = services.length ? Math.max(...services.map(u => u.id)) + 1 : 1;

    const img = "http.cdfdf//";
    const name = document.getElementById("nombre").value;
    const category = document.getElementById("categoria").value;
    const characteristcs = document.getElementById("caracteristicas").value;
    const stock = document.getElementById("stock").value;
    const price = document.getElementById("precio").value;
    const description = document.getElementById("descripcion").value;
    const recomendations = document.getElementById("recomendacion").value;
    const howToDoIt = document.getElementById("agenda");
    const duration = document.getElementById("duracion");

    const newService = { id, img, name, category, characteristcs, stock, price, description, recomendations, howToDoIt, duration };

    services.push(newService)

    console.log(services);

    e.target.reset()

});
