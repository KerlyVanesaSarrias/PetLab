document.addEventListener("DOMContentLoaded", function () {
// Configuración de categorías
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

// Referencias a elementos del DOM
const tipoInputs = document.querySelectorAll('input[name="relacion"]');
const contenidoFormulario = document.getElementById('contenidoFormulario');
const formularioRegistro = document.getElementById('formularioRegistro');
const btnLimpiar = document.getElementById('btnLimpiar');
const btnRegistrarOtro = document.getElementById('btnRegistrarOtro');
const modalExito = new bootstrap.Modal(document.getElementById('modalExito'));


let apiManager = null;

async function initApiManager() {
  try {
    apiManager = new ApiManager();
    const connected = await apiManager.checkConnection();
    
    if (connected) {
      console.log('API conectada exitosamente');
      mostrarToast('Conectado a la base de datos', 'success');
    } else {
      console.error('Error conectando con la API');
      mostrarToast('Error conectando con la base de datos', 'error');
    }
  } catch (error) {
    console.error('Error inicializando API:', error);
    mostrarToast('Error de conexión', 'error');
  }
}



function mostrarToast(mensaje, tipo = 'info') {
  const toastContainer = document.getElementById('toastContainer') || createToastContainer();
  
  const toastId = 'toast_' + Date.now();
  const iconClass = {
    'success': 'bi-check-circle-fill text-success',
    'error': 'bi-x-circle-fill text-danger',
    'warning': 'bi-exclamation-triangle-fill text-warning',
    'info': 'bi-info-circle-fill text-info'
  }[tipo] || 'bi-info-circle-fill text-info';

  const toastHTML = `
    <div id="${toastId}" class="toast align-items-center border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center">
          <i class="bi ${iconClass} me-2"></i>
          ${mensaje}
        </div>
        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;

  toastContainer.insertAdjacentHTML('beforeend', toastHTML);
  
  const toastElement = document.getElementById(toastId);
  const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
  toast.show();

  toastElement.addEventListener('hidden.bs.toast', () => {
    toastElement.remove();
  });
}

function createToastContainer() {
  const container = document.createElement('div');
  container.id = 'toastContainer';
  container.className = 'toast-container position-fixed top-0 end-0 p-3';
  container.style.zIndex = '9999';
  document.body.appendChild(container);
  return container;
}

// Función para actualizar categorías
function actualizarCategorias(tipo) {
  const categoriaSelect = document.getElementById('categoria');
  if (!categoriaSelect) return;
  
  categoriaSelect.innerHTML = '<option value="">Seleccione una opción</option>';
  categorias[tipo].forEach(categoria => {
    const option = document.createElement('option');
    option.value = categoria;
    option.textContent = categoria;
    categoriaSelect.appendChild(option);
  });
}

// Función para configurar vista previa de imagen
function configurarVistaPrevia() {
  const imagenInput = document.getElementById('imagen');
  const vistaPrevia = document.getElementById('vistaPrevia');
  
  if (!imagenInput || !vistaPrevia) return;
  
  imagenInput.addEventListener('change', function() {
    const archivo = this.files[0];
    
    if (archivo) {
      if (archivo.size > 5 * 1024 * 1024) {
        mostrarToast('La imagen no puede superar los 5MB', 'error');
        this.value = '';
        vistaPrevia.classList.add('d-none');
        return;
      }
      
      if (!archivo.type.startsWith('image/')) {
        mostrarToast('Por favor selecciona un archivo de imagen válido', 'error');
        this.value = '';
        vistaPrevia.classList.add('d-none');
        return;
      }
      
      // Mostrar vista previa
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = vistaPrevia.querySelector('img');
        img.src = e.target.result;
        vistaPrevia.classList.remove('d-none');
      };
      reader.readAsDataURL(archivo);
    } else {
      vistaPrevia.classList.add('d-none');
    }
  });
}

// Función para obtener datos del formulario
function obtenerDatosFormulario() {
  const tipo = document.querySelector('input[name="relacion"]:checked').value;
  
  const datos = {
    nombre: document.getElementById('nombre').value.trim(),
    categoria: document.getElementById('categoria').value,
    descripcion: document.getElementById('descripcion').value.trim(),
    precio: parseInt(document.getElementById('precio').value),
    caracteristicas: document.getElementById('caracteristicas').value.trim(),
    stock: parseInt(document.getElementById('stock').value)
  };
  
  // Campos específicos de servicios
  if (tipo === 'Servicio') {
    datos.recomendacion = document.getElementById('recomendacion').value.trim() || '';
    datos.duracion = document.getElementById('duracion').value.trim() || '';
    datos.agenda = document.getElementById('agenda').value.trim() || '';
  }
  
  return { tipo, datos };
}

// Función para limpiar formulario
function limpiarFormulario() {
  formularioRegistro.reset();
  
  // Limpiar vista previa
  const vistaPrevia = document.getElementById('vistaPrevia');
  if (vistaPrevia) {
    vistaPrevia.classList.add('d-none');
  }
  
  // Limpiar errores de validación
  const elementosError = formularioRegistro.querySelectorAll('.invalid-feedback');
  elementosError.forEach(elemento => elemento.remove());
  
  const campos = formularioRegistro.querySelectorAll('.form-control, .form-select');
  campos.forEach(campo => campo.classList.remove('is-invalid', 'is-valid'));
  
  mostrarToast('Formulario limpiado', 'info');
}

// Event Listeners
tipoInputs.forEach(input => {
  input.addEventListener('change', (e) => {
    cargarFormulario(e.target.value);
  });
});

btnLimpiar.addEventListener('click', limpiarFormulario);

btnRegistrarOtro.addEventListener('click', () => {
  modalExito.hide();
  limpiarFormulario();
});

formularioRegistro.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  if (!apiManager) {
    mostrarToast('API no está disponible', 'error');
    return;
  }
  
  if (!this.checkValidity()) {
    this.reportValidity();
    return;
  }
  
  try {
    // Mostrar loading
    const btnSubmit = this.querySelector('button[type="submit"]');
    const textoOriginal = btnSubmit.innerHTML;
    btnSubmit.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Registrando...';
    btnSubmit.disabled = true;
    
    const { tipo, datos } = obtenerDatosFormulario();
    const imagenInput = document.getElementById('imagen');
    const imageFile = imagenInput.files[0];
    
    let resultado;
    if (tipo === 'Producto') {
      resultado = await apiManager.addProduct(datos, imageFile);
    } else {
      resultado = await apiManager.addService(datos, imageFile);
    }
    
    // Mostrar éxito
    const tipoTexto = tipo.toLowerCase();
    document.getElementById('mensajeExito').textContent = 
      `El ${tipoTexto} "${datos.nombre}" ha sido registrado correctamente`;
    
    modalExito.show();
    
   
    btnSubmit.innerHTML = textoOriginal;
    btnSubmit.disabled = false;
    
    mostrarToast(`${tipo} registrado con éxito`, 'success');
    
 
    this.reset();
    const vistaPrevia = document.getElementById('vistaPrevia');
    if (vistaPrevia) {
      vistaPrevia.classList.add('d-none');
    }
    
  } catch (error) {
    console.error('Error al guardar:', error);
    mostrarToast('Error al registrar el producto', 'error');
    

    const btnSubmit = this.querySelector('button[type="submit"]');
    btnSubmit.innerHTML = '<i class="bi bi-check-lg me-1"></i> Registrar';
    btnSubmit.disabled = false;
  }
});

cargarFormulario('Producto');


if (window.ApiManager) {
  initApiManager();
} else {
  console.warn('ApiManager no está disponible');
  mostrarToast('API Manager no disponible', 'warning');
}
});