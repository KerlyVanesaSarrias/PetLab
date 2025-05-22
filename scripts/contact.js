document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('.contacto-form');
    const radiosRelacion = document.querySelectorAll('input[name="relacion"]');
    const seccionProducto = document.querySelector('.info-producto');
    const seccionServicio = document.querySelector('.info-servicio');

    function actualizarVisibilidad() {
        const seleccion = document.querySelector('input[name="relacion"]:checked');
        seccionProducto.style.display = (seleccion && seleccion.value === "producto") ? 'block' : 'none';
        seccionServicio.style.display = (seleccion && seleccion.value === "servicio") ? 'block' : 'none';
    }

    radiosRelacion.forEach(radio => {
        radio.addEventListener('change', actualizarVisibilidad);
    });
    actualizarVisibilidad();

    // agregando validación de TLD más comunes
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

        const archivoInput = document.getElementById('archivo');
        if (archivoInput.files.length > 5) {
            mostrarError(archivoInput, "Máximo 5 archivos permitidos");
            esValido = false;
        }

        let tamañoTotal = 0;
        Array.from(archivoInput.files).forEach(file => {
            tamañoTotal += file.size;
        });

        if (tamañoTotal > 10 * 1024 * 1024) {
            mostrarError(archivoInput, "Tamaño total excede 10MB");
            esValido = false;
        }

        // Validación de secciones de compra, servicio y consulta general
        const seleccion = document.querySelector('input[name="relacion"]:checked');
        if (seleccion) {
            if (seleccion.value === "producto") {
                const orden = document.getElementById('orden');
                const fechaCompra = document.getElementById('fecha_compra');

                if (!orden.value.trim()) {
                    mostrarError(orden, "Número de orden requerido");
                    esValido = false;
                }

                if (!fechaCompra.value) {
                    mostrarError(fechaCompra, "Fecha de compra requerida");
                    esValido = false;
                }
            }

            if (seleccion.value === "servicio") {
                const tipoServicio = document.getElementById('tipo_servicio');
                const fechaServicio = document.getElementById('fecha_servicio');

                if (!tipoServicio.value.trim()) {
                    mostrarError(tipoServicio, "Tipo de servicio requerido");
                    esValido = false;
                }

                if (!fechaServicio.value) {
                    mostrarError(fechaServicio, "Fecha de servicio requerida");
                    esValido = false;
                }
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

        const contenedor = campo.closest('.col') || campo.closest('.mensaje-group') || campo.closest('.archivo-group');
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