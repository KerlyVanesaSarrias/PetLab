document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".button-login").addEventListener("click", function (e) {
        e.preventDefault();

        const usuarioInput = document.getElementById("usuario").value.trim();
        const contrasenaInput = document.getElementById("contrasena").value.trim();

        const modalMensaje = document.getElementById("modalTexto");
        const modalBootstrap = new bootstrap.Modal(document.getElementById("modalValidacion"));

        if (usuarioInput === "" || contrasenaInput === "") {
            modalMensaje.textContent = "Por favor, completa todos los campos para iniciar sesión.";
            modalBootstrap.show();
            return;
        }

        fetch("/BD/dataBase.json")
            .then(response => response.json())
            .then(data => {
                const usuarios = data.users;

                const usuarioValido = usuarios.find(u =>
                    (u.email === usuarioInput || u.name === usuarioInput) &&
                    u.password === contrasenaInput
                );

                if (usuarioValido) {
                    window.location.href = "/index.html";
                } else {
                    modalMensaje.textContent = "Usuario o contraseña incorrectos.";
                    modalBootstrap.show();
                }
            })
            .catch(error => {
                console.error('Error al cargar el archivo JSON:', error);
                modalMensaje.textContent = "Hubo un problema al intentar validar tus datos.";
                modalBootstrap.show();
            });
    });
});
