function deleteProduct(id) {
    fetch(`http://localhost:3000/Producto/${id}`,{
        method: "DELETE"
    }).then(res => res.json()).then(data => console.log("Eliminado", data)
    )
    
};
deleteProduct(1);
