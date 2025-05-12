
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-register");
  const inputs = form.querySelectorAll("input");

  // Validación en tiempo real
  inputs.forEach(input => {
    const errorMsg = input.nextElementSibling;

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
          if (input.id === "form-password" && input.value.length < 6) {
            msg = "La contraseña debe tener al menos 6 caracteres";
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

  // Validación al enviar el formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let allFilled = true;
    let passwordsMatch = true;

    const password = document.getElementById("form-password").value;
    const confirm = document.getElementById("form-confirm-password").value;

    inputs.forEach(input => {
      if (input.value.trim() === "") {
        allFilled = false;
      }
    });

    if (password !== confirm) {
      passwordsMatch = false;
    }

    if (!allFilled) {
      showModal("Todos los campos son requeridos.");
    } else if (!passwordsMatch) {
      showModal("Las contraseñas no coinciden.");
    } else {
      showModal("Registro exitoso, por favor inicie sesión.");
      form.reset();
    }
  });
});

// Función para mostrar el modal
function showModal(mensaje) {
  document.getElementById("modal-message").textContent = mensaje;
  document.getElementById("modal").style.display = "flex";
}

// Función para cerrar el modal
function closeModal() {
  document.getElementById("modal").style.display = "none";
}
