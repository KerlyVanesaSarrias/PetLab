function deleteProduct(id) {
    fetch(`https://8mameppfds.us-east-1.awsapprunner.com/${id}`, {
        method: "DELETE"
    })
    .then(res => {
        if (!res.ok) throw new Error("No se pudo eliminar");
        console.log(`Producto ${id} eliminado correctamente`);
    })
    .catch(err => console.error("Error:", err));
}

deleteProduct("bc58");

