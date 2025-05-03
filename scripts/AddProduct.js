
// function addProduct(id, img, name, category, characteristcs, stock, price, description) {
//     fetch("http://localhost:3000/Producto", {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             id,
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

//     const id = 1;
//     const img = "http.cdfdf//";
//     const name = document.getElementById("nombre").value;
//     const category = document.getElementById("categoria").value;
//     const characteristcs = document.getElementById("caracteristica").value;
//     const stock = document.getElementById("stock").value;
//     const price = document.getElementById("precio").value;
//     const description = document.getElementById("descripcion").value;

//     addProduct(id, img, name, category, characteristcs, stock, price, description)
// });


//addProduct(1, "http....", "cat", "Alimento", "suave", 24, 23000, "Comodo" );

const productos = [];


document.getElementById("registroForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const id = 1;
    const img = "http.cdfdf//";
    const name = document.getElementById("nombre").value;
    const category = document.getElementById("categoria").value;
    const characteristcs = document.getElementById("caracteristica").value;
    const stock = document.getElementById("stock").value;
    const price = document.getElementById("precio").value;
    const description = document.getElementById("descripcion").value;
 
    const newProduct = { id, img, name, category, characteristcs, stock, price, description };
    
    productos.push(newProduct)

    console.log(productos);
    
    
});
