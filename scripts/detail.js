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
  const characteristics = (item.characteristcs || "").replace(/\n/g, "<br>")
  const recommendations = item.recommendations ? item.recommendations.replace(/\n/g, "<br>") : ""

  const isService = item.howToDoIt || item.duration

  const html = `
    <div class="row">
      <!-- Columna de imagen -->
      <div class="col-md-5">
        <div class="product-image-container">
          <img src="${item.img}" class="product-image" alt="${item.name}">
        </div>
        ${Number.parseInt(item.stock) < 10 ? '<div class="last-units">Últimas Unidades</div>' : ""}
      </div>
      
      <!-- Columna de información -->
      <div class="col-md-7">
        <h1 class="mb-2">${item.name}</h1>
        
        <div class="mb-2">
          <span>Categoria: <strong>${item.category || "No especificada"}</strong></span>
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
          <div class="current-price">$${Number(item.price).toLocaleString()}</div>
        </div>
        
        <div class="availability">
          Disponible: <span class="text-success">${item.stock}</span>
        </div>
        
        ${isService
      ? `
          <div class="mb-3">
            <strong>Horario:</strong> ${item.howToDoIt || "No especificado"}
          </div>
          <div class="mb-3">
            <strong>Duración aproximada:</strong> ${item.duration || "No especificada"}
          </div>
        `
      : `
          
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
      <div class="d-flex align-items-center mb-3">
        <i class="fas fa-info-circle me-2"></i>
        <h5 class="mb-0">Información de ${isService ? "servicio" : "producto"}</h5>
      </div>
      
      <ul class="nav nav-tabs" id="productTabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="description-tab" data-bs-toggle="tab" data-bs-target="#description" type="button" role="tab">Descripción</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="characteristics-tab" data-bs-toggle="tab" data-bs-target="#characteristics" type="button" role="tab">Características</button>
        </li>
        ${recommendations
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
          ${item.description ? `<p>${item.description}</p>` : "<p>No hay descripción disponible.</p>"}
        </div>
        <div class="tab-pane fade" id="characteristics" role="tabpanel">
          ${characteristics ? `<p>${characteristics}</p>` : "<p>No hay características disponibles.</p>"}
        </div>
        ${recommendations
      ? `
        <div class="tab-pane fade" id="recommendations" role="tabpanel">
          <p>${recommendations}</p>
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
      alert("Servicio reservado correctamente");
      addToCart(item.name, Number(item.price), item.img);
      updateCartCount()
    } else {
      const quantity = parseInt(document.getElementById("quantityInput").value);
      addToCart(item.name, Number(item.price), item.img, Number(quantity));
      updateCartCount();

    }
  });

}
