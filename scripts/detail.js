document.addEventListener("DOMContentLoaded", () => {
  const raw = sessionStorage.getItem("selectedItem")
  if (!raw) {
    document.getElementById("detailContainer").innerHTML =
      '<div class="alert alert-warning">No se encontró el elemento. <a href="../index.html" class="alert-link">Volver al inicio</a></div>'
    return
  }

  const item = JSON.parse(raw)
  renderDetail(item)
})

function renderDetail(item) {
  const caracteristicas = (item.caracteristicas || "").replace(/\n/g, "<br>")
  const recomendaciones = item.recomendaciones ? item.recomendaciones.replace(/\n/g, "<br>") : ""

  const isService = item.duracion

  const html = `
    <div class="row">
      <!-- Columna de imagen -->
      <div class="col-md-5">
        <div class="product-image-container">
          <img src="${item.imagen}" class="product-image mt-4 rounded-5" alt="${item.nombre}">
        </div>
        ${Number.parseInt(item.stock) < 10 ? '<div class="last-units">Últimas Unidades</div>' : ""}
      </div>
      
      <!-- Columna de información -->
      <div class="col-md-7">
        <h1 class="mb-2">${item.nombre}</h1>
        
        <div class="mb-2">
          <span>Categoria: <strong>${item.categoria || "No especificada"}</strong></span>
        </div>
        
        <div class="star-rating mb-2">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        
        <div class="price-container">
          <div class="original-price">Precio normal</div>
          <div class="current-price">$${Number(item.precio).toLocaleString()}</div>
        </div>
        
        <div class="availability">
            Disponible
         </div>
        
        ${isService
      ? `
          <div class="mb-2">
            <strong>Horario:</strong> ${item.agenda || "No especificado"}
          </div>
          <div class="mb-3">
            <strong>Duración aproximada:</strong> ${item.duracion || "No especificada"}
          </div>
        `
      : `
          <div class="availability">
            Disponible: <span class="text-success">${item.stock}</span>
         </div>
          <div class="quantity-selector">
            <div class="me-3">Cantidad</div>
            <button class="btn btn-outline-secondary" id="decreaseBtn">-</button>
            <input type="text" value="1" id="quantityInput" class="form-control mx-2">
            <button class="btn btn-outline-secondary" id="increaseBtn">+</button>
          </div>
        `
    }
        
        <button class="add-to-cart-btn" id="addToCartBtn">
          ${isService ? "Reservar servicio" : "Agregar al carrito"}
        </button>
      </div>
    </div>

    <div class="product-tabs mt-5">
      <div class="d-flex gap-3 align-items-center mb-3">
          <lord-icon
         color=""
          trigger="hover"
          src="/lottie/system-regular-28-info-hover-info.json"
        >
        </lord-icon>
        <h5 class="mb-0">Información de ${isService ? "servicio" : "producto"}</h5>
      </div>
      
      <ul class="nav nav-tabs" id="productTabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="description-tab" data-bs-toggle="tab" data-bs-target="#description" type="button" role="tab">Descripción</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="characteristics-tab" data-bs-toggle="tab" data-bs-target="#characteristics" type="button" role="tab">Características</button>
        </li>
        ${recomendaciones
      ? `
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="recommendations-tab" data-bs-toggle="tab" data-bs-target="#recommendations" type="button" role="tab">Recomendaciones</button>
        </li>
        `
      : ""
    }
      </ul>
      
      <div class="tab-content" id="productTabsContent">
        <div class="tab-pane fade show active" id="description" role="tabpanel">
          ${item.descripcion ? `<p>${item.descripcion}</p>` : "<p>No hay descripción disponible.</p>"}
        </div>
        <div class="tab-pane fade" id="characteristics" role="tabpanel">
          ${caracteristicas ? `<p>${caracteristicas}</p>` : "<p>No hay características disponibles.</p>"}
        </div>
        ${recomendaciones
      ? `
        <div class="tab-pane fade" id="recommendations" role="tabpanel">
          <p>${recomendaciones}</p>
        </div>
        `
      : ""
    }
      </div>
    </div>
    
    <a href="https://wa.me/573143046748" class="whatsapp-button">
      <i class="fab fa-whatsapp"></i>
    </a>
  `

  document.getElementById("detailContainer").innerHTML = html

  if (!isService) {
    const quantityInput = document.getElementById("quantityInput")
    document.getElementById("decreaseBtn").addEventListener("click", () => {
      const value = Number.parseInt(quantityInput.value)
      if (value > 1) {
        quantityInput.value = value - 1
      }
    })

    document.getElementById("increaseBtn").addEventListener("click", () => {
      const value = Number.parseInt(quantityInput.value)
      quantityInput.value = value + 1
    })
  }

  document.getElementById("addToCartBtn").addEventListener("click", () => {
    if (isService) {
      servicioSeleccionado = item;
      fechaSeleccionada = null;
      horaSeleccionada = null;

      inputFecha.value = '';
      inputFecha.min = new Date().toISOString().split('T')[0];
      horasContainer.innerHTML = '';
      confirmarBtn.disabled = true;

      const modal = new bootstrap.Modal(document.getElementById('modalReserva'));
      modal.show();

      updateCartCount()
    } else {
      const quantity = parseInt(document.getElementById("quantityInput").value);
      addToCart(item.nombre, Number(item.precio), item.imagen, Number(quantity));
      updateCartCount();

    }
  });

}
