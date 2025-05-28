document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('.contacto-form');
    const radiosRelacion = document.querySelectorAll('input[name="relacion"]');
    const ordenGroup = document.querySelector('.orden-group');
    const ordenInput = document.getElementById('orden');

    function actualizarVisibilidadOrden() {
        const seleccion = document.querySelector('input[name="relacion"]:checked');
        if (seleccion && seleccion.value === "compra") {
            ordenGroup.style.display = 'block';
            ordenInput.required = true;
        } else {
            ordenGroup.style.display = 'none';
            ordenInput.required = false;
            ordenInput.value = '';
        }
    }

    radiosRelacion.forEach(radio => {
        radio.addEventListener('change', actualizarVisibilidadOrden);
    });
    actualizarVisibilidadOrden();

    // Validación de TLD más comunes
    const validarEmail = (email) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|mil|info|es|mx|co|us|fr|ar|eu|ru|cn|jp|ch|com\.mx|com\.ar)$/i.test(email);

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        limpiarErrores();

        let esValido = true;
        const camposRequeridos = formulario.querySelectorAll('[required]');

        camposRequeridos.forEach(campo => {
            if (!campo.value.trim()) {
                mostrarError(campo, "Este campo es obligatorio");
                esValido = false;
            }
        });

        const correo = document.getElementById('correo');
        const correoConfirm = document.getElementById('correo_confirm');

        if (!validarEmail(correo.value)) {
            mostrarError(correo, "Formato de correo inválido");
            esValido = false;
        }

        if (!validarEmail(correoConfirm.value)) {
            mostrarError(correoConfirm, "Formato de correo inválido");
            esValido = false;
        }

        if (correo.value !== correoConfirm.value) {
            mostrarError(correoConfirm, "Los correos no coinciden");
            esValido = false;
        }

        // Validación específica para el campo de número de orden si está visible y requerido
        const seleccion = document.querySelector('input[name="relacion"]:checked');
        if (seleccion && seleccion.value === "compra") {
            if (!ordenInput.value.trim()) {
                mostrarError(ordenInput, "Número de orden requerido");
                esValido = false;
            }
        }

        // Envio del formulario cuando todo es válido
        if (esValido) {
            formulario.submit();
        }
    });

    function mostrarError(campo, mensaje) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-mensaje';
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = mensaje;

        const contenedor = campo.closest('.col') || campo.closest('.mensaje-group');
        contenedor.appendChild(errorDiv);
        campo.classList.add('campo-error');
    }

    function limpiarErrores() {
        document.querySelectorAll('.error-mensaje').forEach(error => error.remove());
        document.querySelectorAll('.campo-error').forEach(campo => campo.classList.remove('campo-error'));
    }
});






/*r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',*/





/*r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',*/