let redirectAfterClose = false;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-register");
  const inputs = form.querySelectorAll("input");
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const modalCloseButton = document.getElementById("modal-close-button");
  const passwordInput = document.getElementById("form-password");
  const toggleIcon = document.getElementById("toggle-password");
  const confirmPasswordInput = document.getElementById("form-confirm-password");
  const toggleConfirmIcon = document.getElementById("toggle-confirm-password");
  const pantalla = document.querySelector('.pantalla-principal');

  modalCloseButton.addEventListener("click", () => {
  modal.style.display = "none";
  if (redirectAfterClose) {
    setTimeout(() => {
      pantalla.classList.remove('registro-activo'); 
    }, 1000); 
  }
});

  // Validación en tiempo real de los campos del formulario
  inputs.forEach(input => {
    const errorMsg = input.closest('.input-wrapper')
      ? input.closest('.input-wrapper').parentElement.querySelector('.error-text')
      : input.parentElement.querySelector('.error-text');

    input.addEventListener("input", () => {
      let msg = "";

      switch (input.type) {
        case "email":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
            msg = "Correo inválido";
          }
          break;
        case "text":
          if (input.value.trim().length < 3) {
            msg = "Debe tener al menos 3 caracteres";
          }
          break;
        case "password":
          if (input.id === "form-password" && !/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(input.value)) {
            msg = "Incluye una mayúscula, un número y un carácter especial.";
          }
          if (input.id === "form-confirm-password") {
            const pass = document.getElementById("form-password").value;
            if (input.value !== pass) {
              msg = "Las contraseñas no coinciden";
            }
          }
          break;
        case "number":
          if (input.value.trim().length < 7) {
            msg = "Número telefónico inválido";
          }
          break;
      }

      if (msg) {
        errorMsg.textContent = msg;
        errorMsg.style.color = "red";
        input.style.borderColor = "red";
      } else {
        errorMsg.textContent = "";
        input.style.borderColor = "#156082";
      }
    });
  });

  // Validación y envío de datos al archivo json
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let allFilled = true;
    let noErrors = true;

    inputs.forEach(input => {
      if (input.value.trim() === "") {
        allFilled = false;
      }
      const errorMsg = input.nextElementSibling;
      if (errorMsg && errorMsg.textContent.trim() !== "") {
        noErrors = false;
      }
    });

    if (!allFilled) {
      showModal("Todos los campos son requeridos.");
    } else if (!noErrors) {
      showModal("Por favor corrija los errores antes de continuar.");
    } else {
      // Datos del formulario
      const nombre = document.getElementById("form-name").value;
      const correo = document.getElementById("form-email").value;
      const telefono = document.getElementById("form-number").value;
      const contrasena = document.getElementById("form-password").value;

      try {
        const response = await fetch("https://8mameppfds.us-east-1.awsapprunner.com/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nombre, correo, telefono, contrasena }),
        });

        if (response.ok) {
          form.reset();
          showModal("Registro exitoso. Presiona cerrar para iniciar sesión.", true);
        } else {
          showModal("Error al registrar usuario.");
        }
      } catch (err) {
        console.error("Error al enviar datos:", err);
        showModal("Error de conexión con el servidor.");
      }
    }
  });

  // Función para mostrar el modal
  function showModal(mensaje, shouldRedirect = false) {
    modalMessage.textContent = mensaje;
    modal.style.display = "flex";
    redirectAfterClose = shouldRedirect;
  }

  // funcion para mostrar contraseña con icono 
  toggleIcon.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    toggleIcon.classList.toggle("bi-eye");
    toggleIcon.classList.toggle("bi-eye-slash");
  });

  // funcion para mostrar contraseña con icono en confirmar contraseña
  toggleConfirmIcon.addEventListener("click", () => {
    const isPassword = confirmPasswordInput.type === "password";
    confirmPasswordInput.type = isPassword ? "text" : "password";
    toggleConfirmIcon.classList.toggle("bi-eye");
    toggleConfirmIcon.classList.toggle("bi-eye-slash");
});
});
