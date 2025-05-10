document.addEventListener("DOMContentLoaded", function () {
    const categorias = {
        Producto: [
            "Alimentos",
            "Juguetes"
        ],
        Servicio: [
            "Hematología Veterinaria",
            "Bioquímica",
            "Serología Veterinaria",
            "Gases Sanguíneos",
            "Ayudas Diagnósticas Veterinarias"
        
        ]
    };

    const tipoInputs = document.querySelectorAll('input[name="relacion"]');
    const categoriaSelect = document.getElementById('categoriaS');
    const form = document.getElementById("registroForm");
    const formService = document.getElementById("registroFormServices");
    const modal = document.getElementById("modalGracias");
    const closeBtn = document.querySelector(".close-btn");



    function actualizarCategorias(tipoSeleccionado) {
        categoriaSelect.innerHTML = '<option value="">Seleccione una opción</option>';
        categorias[tipoSeleccionado].forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = categoria;
            categoriaSelect.appendChild(option);
        });
    }

    tipoInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const tipoSeleccionado = e.target.value;

            actualizarCategorias(tipoSeleccionado);

        });
    });

    formService.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita recarga
        modal.style.display = "block"; // Muestra el modal
        // form.reset(); // Limpia el formulario si quieres
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});