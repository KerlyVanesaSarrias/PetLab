document.addEventListener("DOMContentLoaded", () => {
    const loginPasswordInput = document.getElementById("contrasena");
    const toggleLoginIcon = document.getElementById("toggle-login-password");

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

        const admins = [
            {
                "id": "998c",
                "name": "usuarioAdmin",
                "email": "admin@gmail.com",
                "phoneNumber": "3172576290",
                "password": "123456"
            },
            {
                "id": "927e",
                "name": "usuarioAdmin2",
                "email": "admin2@gmail.com",
                "phoneNumber": "3172576290",
                "password": "123456"
            }
        ];

        const adminValido = admins.find(u =>
            (u.email === usuarioInput || u.name === usuarioInput) &&
            u.password === contrasenaInput
        );

        if (adminValido) {
            localStorage.setItem("rol", "admin");
            localStorage.setItem("nombreUsuario", adminValido.name);
            window.location.href = "/index.html";
        } else {
            // Consulta a Spring Boot (usuario real desde base de datos)
            fetch("http://localhost:8081/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    correo: usuarioInput,
                    nombre: usuarioInput,
                    contrasena: contrasenaInput
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Credenciales NO VALIDAS");
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem("rol", "usuario");
                localStorage.setItem("nombreUsuario", data.token);
                localStorage.setItem("nombreUsuario", data.nombre )
                window.location.href = "/index.html";
            })
            .catch(error => {
                modalMensaje.textContent = error.message;
                modalBootstrap.show();
            });
        }

    });

    //Funcion para mostrar contraseña en inicio se sesion
    toggleLoginIcon.addEventListener("click", () => {
        const isPassword = loginPasswordInput.type === "password";
        loginPasswordInput.type = isPassword ? "text" : "password";
        toggleLoginIcon.classList.toggle("bi-eye");
        toggleLoginIcon.classList.toggle("bi-eye-slash");
});
});
