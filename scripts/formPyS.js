document.addEventListener("DOMContentLoaded", function () {
    const tipoInputs = document.querySelectorAll('input[name="relacion"]');
    const formProducto = document.getElementById("registroForm");
    const formServicio = document.getElementById("registroFormServices");
  
    // Mostrar formulario de producto por defecto
    formProducto.style.display = "block";
    formServicio.style.display = "none";
  
    tipoInputs.forEach(input => {
      input.addEventListener("change", function (e) {
        const seleccion = e.target.value;
  
        if (seleccion === "Producto") {
          formProducto.style.display = "block";
          formServicio.style.display = "none";
        } else if (seleccion === "Servicio") {
          formProducto.style.display = "none";
          formServicio.style.display = "block";
        }
      });
    });
  });