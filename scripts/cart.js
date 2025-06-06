let cart = JSON.parse(localStorage.getItem("cart")) || [];

function openCartSidebar() {
    document.getElementById("cartSidebar").classList.add("active");
    renderCart();
}

function closeCartSidebar() {
    document.getElementById("cartSidebar").classList.remove("active");
}

function addToCart(name, price, img, qty=1 ) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ name, price, img, qty });
    }
    saveCart();
    openCartSidebar();
}

function increaseQty(index) {
    cart[index].qty += 1;
    saveCart();
}

function decreaseQty(index) {
    if (cart[index].qty > 1) {
        cart[index].qty -= 1;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function clearCart() {
    cart = [];
    saveCart();
}

function renderCart() {
    const container = document.querySelector(".cart-items");
    const totalText = document.querySelector(".total strong");
    container.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
          <img src="${item.img}" alt="${item.name}" class="me-2" />
          <div class="item-info">
            <p><strong>${item.name}</strong></p>
            <p><b>${formatPrice(item.price)} COP</b></p>
            <p class="cantidad">
              Cantidad:
              <button onclick="decreaseQty(${index})">-</button>
              <span>${item.qty}</span>
              <button onclick="increaseQty(${index})">+</button>
            </p>
          </div>
          <i class="" onclick="removeItem(${index})">
            <lord-icon
          trigger="hover"
          src="/lottie/system-regular-39-trash-hover-trash-empty.json"
        >
        </lord-icon>
          </i>
         
        `;
        container.appendChild(div);
    });

    totalText.textContent = `${formatPrice(total)} COP`;
}

function formatPrice(value) {
    return value.toLocaleString("es-CO");
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  const totalItems = cart.reduce((total, item) => total + item.qty, 0)

  const cartCount = document.querySelector(".cart-count")
  if (cartCount) {
    cartCount.textContent = totalItems
  }
};
