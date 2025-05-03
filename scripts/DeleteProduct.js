function deleteProduct(id) {
    fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE"
    })
    .then(res => {
        if (!res.ok) throw new Error("No se pudo eliminar");
        console.log(`Producto ${id} eliminado correctamente`);
    })
    .catch(err => console.error("Error:", err));
}

deleteProduct("bc58");

