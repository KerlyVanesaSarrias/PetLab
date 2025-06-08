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

  const tipoInputs = document.querySelectorAll('input[name="relacion"]');
  const categoriaSelect = document.getElementById('categoria');
  const camposServicio = document.getElementById('camposServicio');
  const productoForm = document.getElementById('productoForm');
  const btnGuardarProducto = document.getElementById('btnGuardarProducto');
  const btnConfirmarEliminar = document.getElementById('btnConfirmarEliminar');
  const btnLimpiarFiltros = document.getElementById('btnLimpiarFiltros');
  const imagenInput = document.getElementById('imagen');
  const imagenPreview = document.getElementById('imagenPreview');
  const buscarInput = document.getElementById('buscarProducto');
  const filtroTipo = document.getElementById('filtroTipo');
  const filtroCategoria = document.getElementById('filtroCategoria');
  const loadingSpinner = document.getElementById('loadingSpinner');
  
  // Modales
  const productoModal = new bootstrap.Modal(document.getElementById('productoModal'));
  const eliminarModal = new bootstrap.Modal(document.getElementById('eliminarModal'));
  const modalExito = new bootstrap.Modal(document.getElementById('modalExito'));
  
  // Variables globales
  let productoIdAEliminar = null;
  let productoTipoAEliminar = null;
  let productosOriginales = [];
  let productosFiltrados = [];
  let apiManager = null;

  // Inicializar API Manager
  async function initApiManager() {
    try {
      apiManager = new ApiManager();
      const connected = await apiManager.checkConnection();
      
      if (connected) {
        console.log('API conectada exitosamente');
        await cargarDatosDesdeAPI();
        mostrarToast('Conectado a la base de datos', 'success');
      } else {
        console.error('Error conectando con la API');
        mostrarToast('Error conectando con la base de datos', 'error');
        usarDatosLocales();
      }
    } catch (error) {
      console.error('Error inicializando API:', error);
      mostrarToast('Error de conexión', 'error');
      usarDatosLocales();
    }
  }

  // Cargar datos desde la API
  async function cargarDatosDesdeAPI() {
    try {
      mostrarLoading(true);
      const items = await apiManager.getAllItems();
      productosOriginales = items;
      productosFiltrados = [...items];
      cargarProductos();
      actualizarEstadisticas();
      mostrarLoading(false);
    } catch (error) {
      console.error('Error cargando datos desde API:', error);
      mostrarLoading(false);
      mostrarToast('Error cargando datos', 'error');
      usarDatosLocales();
    }
  }

  // Usar datos locales como fallback
  function usarDatosLocales() {
    productosOriginales = [];
    productosFiltrados = [];
    cargarProductos();
    actualizarEstadisticas();
    mostrarToast('Modo sin conexión', 'warning');
  }

  // Función para mostrar toast notifications
  function mostrarToast(mensaje, tipo = 'info') {
    // Crear elemento toast
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

  function init() {
    cargarCategoriasEnFiltro();
    actualizarCategorias('Producto');
    configurarEventListeners();

    if (window.ApiManager) {
      initApiManager();
    } else {
      console.warn('ApiManager no está disponible');
      usarDatosLocales();
    }
  }

  function configurarEventListeners() {
    tipoInputs.forEach(input => {
      input.addEventListener('change', (e) => {
        const tipoSeleccionado = e.target.value;
        actualizarCategorias(tipoSeleccionado);
        toggleCamposServicio(tipoSeleccionado);
      });
    });
    
    btnGuardarProducto.addEventListener('click', guardarProducto);
    btnConfirmarEliminar.addEventListener('click', confirmarEliminarProducto);
    btnLimpiarFiltros.addEventListener('click', limpiarFiltros);
    
    buscarInput.addEventListener('input', aplicarFiltros);
    filtroTipo.addEventListener('change', aplicarFiltros);
    filtroCategoria.addEventListener('change', aplicarFiltros);
    
    imagenInput.addEventListener('change', mostrarVistaPrevia);
  }

  // Función para actualizar las categorías según el tipo seleccionado
  function actualizarCategorias(tipoSeleccionado) {
    categoriaSelect.innerHTML = '<option value="">Seleccione una opción</option>';
    categorias[tipoSeleccionado].forEach(categoria => {
      const option = document.createElement('option');
      option.value = categoria;
      option.textContent = categoria;
      categoriaSelect.appendChild(option);
    });
  }

  // Función para cargar categorías en el filtro
  function cargarCategoriasEnFiltro() {
    const todasCategorias = [...new Set([...categorias.Producto, ...categorias.Servicio])];
    filtroCategoria.innerHTML = '<option value="">Todas las categorías</option>';
    todasCategorias.forEach(categoria => {
      const option = document.createElement('option');
      option.value = categoria;
      option.textContent = categoria;
      filtroCategoria.appendChild(option);
    });
  }

  // Función para mostrar/ocultar campos específicos de servicios
 function toggleCamposServicio(tipoSeleccionado) {
  if (tipoSeleccionado === 'Servicio') {
    camposServicio.classList.remove('d-none');
    document.getElementById('stockField').classList.add('d-none');
    document.getElementById('stock').value = 0; 
  } else {
    camposServicio.classList.add('d-none');
    document.getElementById('stockField').classList.remove('d-none'); 
  }
}
  // Función para mostrar loading
  function mostrarLoading(mostrar = true) {
    if (mostrar) {
      loadingSpinner.classList.remove('d-none');
    } else {
      loadingSpinner.classList.add('d-none');
    }
  }

  // Función para obtener el estado del stock
  function obtenerEstadoStock(stock) {
    if (stock <= 5) return { clase: 'badge-stock-bajo', texto: 'Stock Bajo' };
    if (stock <= 20) return { clase: 'badge-stock-medio', texto: 'Stock Medio' };
    return { clase: 'badge-stock-alto', texto: 'Stock Alto' };
  }


  // Función para cargar los productos en la tabla
  function cargarProductos() {
    const tbody = document.getElementById('productosTableBody');
    const noProductos = document.getElementById('noProductos');
    
    tbody.innerHTML = '';
    
    if (productosFiltrados.length === 0) {
      noProductos.classList.remove('d-none');
      return;
    }
    
    noProductos.classList.add('d-none');
    
    productosFiltrados.forEach(producto => {
      const estadoStock = obtenerEstadoStock(producto.stock);
      const tr = document.createElement('tr');
      console.log('product: ', producto)
      
      tr.innerHTML = `
        <td>
          <img src="${producto.imagen}" alt="${producto.nombre}"  style="width: 50px; height: 50px;" class="producto-imagen" >
        </td>
        <td>
          <strong>${producto.nombre}</strong>
        </td>
        <td>
          <span class="badge ${producto.tipo === 'Producto' ? 'bg-primary' : 'bg-success'}">${producto.tipo}</span>
        </td>
        <td>${producto.categoria}</td>
     
        <td><strong>$${producto.precio.toLocaleString()}</strong></td>
        <td>${producto.stock}</td>
        <td>
          <span class="badge text-bg-dark ${estadoStock.clase}">${estadoStock.texto}</span>
        </td>
        <td>
          <button class="btn-editar me-2" data-id="${producto.id}" data-tipo="${producto.tipo}" title="Editar ${producto.tipo.toLowerCase()}">
            <i class="bi bi-pencil-fill"></i>
          </button>
          <button class="btn-eliminar" data-id="${producto.id}" data-tipo="${producto.tipo}" title="Eliminar ${producto.tipo.toLowerCase()}">
            <i class="bi bi-trash-fill"></i>
          </button>
        </td>
      `;
      
      tbody.appendChild(tr);
    });
    
    // Agregar event listeners a los botones de acción
    document.querySelectorAll('.btn-editar').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const tipo = this.getAttribute('data-tipo');
        editarProducto(id, tipo);
      });
    });
    
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const tipo = this.getAttribute('data-tipo');
        confirmarEliminar(id, tipo);
      });
    });
  }

  // Función para actualizar estadísticas
  function actualizarEstadisticas() {
    const totalProductos = productosOriginales.filter(p => p.tipo === 'Producto').length;
    const totalServicios = productosOriginales.filter(p => p.tipo === 'Servicio').length;
    const stockBajo = productosOriginales.filter(p => p.stock <= 5).length;
    const valorInventario = productosOriginales.reduce((total, p) => total + (p.precio * p.stock), 0);
    
    document.getElementById('totalProductos').textContent = totalProductos;
    document.getElementById('totalServicios').textContent = totalServicios;
    document.getElementById('stockBajo').textContent = stockBajo;
    document.getElementById('valorInventario').textContent = `$${valorInventario.toLocaleString()}`;
  }

  // Función para aplicar filtros
  function aplicarFiltros() {
    const busqueda = buscarInput.value.toLowerCase().trim();
    const tipoFiltro = filtroTipo.value;
    const categoriaFiltro = filtroCategoria.value;
    
    productosFiltrados = productosOriginales.filter(producto => {
      const coincideBusqueda = !busqueda || 
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.descripcion.toLowerCase().includes(busqueda) ||
        producto.caracteristicas.toLowerCase().includes(busqueda);
      
      const coincideTipo = !tipoFiltro || producto.tipo === tipoFiltro;
      const coincideCategoria = !categoriaFiltro || producto.categoria === categoriaFiltro;
      
      return coincideBusqueda && coincideTipo && coincideCategoria;
    });
    
    cargarProductos();
  }

  // Función para limpiar filtros
  function limpiarFiltros() {
    buscarInput.value = '';
    filtroTipo.value = '';
    filtroCategoria.value = '';
    productosFiltrados = [...productosOriginales];
    cargarProductos();
  }

  // Función para mostrar vista previa de imagen
  function mostrarVistaPrevia() {
    const file = imagenInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const imgPreview = imagenPreview.querySelector('img');
        imgPreview.src = e.target.result;
        imagenPreview.classList.remove('d-none');
      };
      reader.readAsDataURL(file);
    } else {
      imagenPreview.classList.add('d-none');
    }
  }

  
  function abrirModalAgregar() {
    document.getElementById('productoModalLabel').textContent = 'Agregar Nuevo Producto';
    productoForm.reset();
    document.getElementById('productoId').value = '';
    document.getElementById('tipoProducto').checked = true;
    actualizarCategorias('Producto');
    toggleCamposServicio('Producto');
    imagenPreview.classList.add('d-none');
    productoModal.show();
  }

  // Función para editar un producto
  function editarProducto(id, tipo) {
    const producto = productosOriginales.find(p => p.id == id && p.tipo === tipo);
    if (!producto) return;
    
    document.getElementById('productoModalLabel').textContent = `Editar ${producto.tipo}`;
    document.getElementById('productoId').value = producto.id;
    
    // Establecer el tipo
    if (producto.tipo === 'Producto') {
      document.getElementById('tipoProducto').checked = true;
    } else {
      document.getElementById('tipoServicio').checked = true;
    }
    
    // Actualizar categorías y campos
    actualizarCategorias(producto.tipo);
    toggleCamposServicio(producto.tipo);
    
    // Llenar campos del formulario
    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('categoria').value = producto.categoria;
    document.getElementById('descripcion').value = producto.descripcion;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('caracteristicas').value = producto.caracteristicas;
    document.getElementById('stock').value = producto.stock;
    
    // Mostrar imagen actual
    if (producto.imagen) {
      const imgPreview = imagenPreview.querySelector('img');
      imgPreview.src = producto.imagen;
      imagenPreview.classList.remove('d-none');
    }
    
    // Campos específicos de servicios
    if (producto.tipo === 'Servicio') {
      document.getElementById('recomendacion').value = producto.recomendacion || '';
      document.getElementById('duracion').value = producto.duracion || '';
      document.getElementById('agenda').value = producto.agenda || '';
    }
    
    productoModal.show();
  }

  // Función para confirmar eliminación
  function confirmarEliminar(id, tipo) {
    productoIdAEliminar = id;
    productoTipoAEliminar = tipo;
    eliminarModal.show();
  }

  // Función para eliminar producto
  async function confirmarEliminarProducto() {
    if (!productoIdAEliminar || !apiManager) return;
    
    try {
      mostrarLoading(true);
      
      if (productoTipoAEliminar === 'Producto') {
        await apiManager.deleteProduct(productoIdAEliminar);
      } else {
        await apiManager.deleteService(productoIdAEliminar);
      }
      
      // Recargar datos desde la API
      await cargarDatosDesdeAPI();
      
      eliminarModal.hide();
      document.getElementById('mensajeExito').textContent = `¡${productoTipoAEliminar} eliminado con éxito!`;
      modalExito.show();
      mostrarLoading(false);
      mostrarToast(`${productoTipoAEliminar} eliminado`, 'success');
      productoIdAEliminar = null;
      productoTipoAEliminar = null;
    } catch (error) {
      console.error('Error eliminando elemento:', error);
      mostrarToast('Error eliminando el elemento', 'error');
      mostrarLoading(false);
    }
  }

  // Función para guardar producto
  async function guardarProducto() {
    if (!productoForm.checkValidity()) {
      productoForm.reportValidity();
      return;
    }
    
    if (!apiManager) {
      mostrarToast('API no está disponible', 'error');
      return;
    }
    
    try {
      mostrarLoading(true);
      
      const id = document.getElementById('productoId').value;
      const tipo = document.querySelector('input[name="relacion"]:checked').value;
      const imageFile = imagenInput.files[0];
      
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
        datos.recomendacion = document.getElementById('recomendacion').value.trim();
        datos.duracion = document.getElementById('duracion').value.trim();
        datos.agenda = document.getElementById('agenda').value.trim();
      }
      
      // Si estamos editando, agregar la imagen actual
      if (id) {
        const productoActual = productosOriginales.find(p => p.id == id && p.tipo === tipo);
        if (productoActual) {
          datos.imagen = productoActual.imagen;
        }
      }
      
      let resultado;
      let mensaje = '';
      
      if (id) {
        // Editar existente
        if (tipo === 'Producto') {
          resultado = await apiManager.updateProduct(id, datos, imageFile);
          mensaje = '¡Producto actualizado con éxito!';
        } else {
          resultado = await apiManager.updateService(id, datos, imageFile);
          mensaje = '¡Servicio actualizado con éxito!';
        }
      } else {
        // Agregar nuevo
        if (tipo === 'Producto') {
          resultado = await apiManager.addProduct(datos, imageFile);
          mensaje = '¡Producto agregado con éxito!';
        } else {
          resultado = await apiManager.addService(datos, imageFile);
          mensaje = '¡Servicio agregado con éxito!';
        }
      }
      
      // Recargar datos desde la API
      await cargarDatosDesdeAPI();
      
      productoModal.hide();
      document.getElementById('mensajeExito').textContent = mensaje;
      modalExito.show();
      
      mostrarLoading(false);
      mostrarToast(mensaje, 'success');
      
    } catch (error) {
      console.error('Error guardando elemento:', error);
      mostrarToast('Error guardando el elemento', 'error');
      mostrarLoading(false);
    }
  }

  init();
});


