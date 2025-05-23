document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("container-navbar")) {
    fetch("/pages/navbar.html")
      .then((res) => res.text())
      .then((data) => {
        document.getElementById("container-navbar").innerHTML = data
        initNavbarEvents()
        checkUserRole()
      })
  } else {
    initNavbarEvents()
    checkUserRole()
  }

  function initNavbarEvents() {
    const menuToggle = document.querySelector(".menu-toggle")
    const mobileNavModal = document.getElementById("mobileNavModal")
    const closeMobileNav = document.querySelector(".close-mobile-nav")
    const overlay = document.querySelector(".overlay")


    if (menuToggle) {
      menuToggle.addEventListener("click", () => {
        mobileNavModal.classList.add("active")
        overlay.classList.add("active")
        document.body.style.overflow = "hidden" 
      })
    }

    if (closeMobileNav) {
      closeMobileNav.addEventListener("click", () => {
        mobileNavModal.classList.remove("active")
        overlay.classList.remove("active")
        document.body.style.overflow = "" 
      })
    }

    if (overlay) {
      overlay.addEventListener("click", () => {
        mobileNavModal.classList.remove("active")
        overlay.classList.remove("active")
        document.body.style.overflow = "" 
        const cartSidebar = document.getElementById("cartSidebar")
        if (cartSidebar) {
          cartSidebar.classList.remove("active")
        }
      })
    }

    const mobileNavLinks = document.querySelectorAll(".mobile-nav a")
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNavModal.classList.remove("active")
        overlay.classList.remove("active")
        document.body.style.overflow = "" 
      })
    })
  }

  function checkUserRole() {
    const rol = localStorage.getItem("rol")
    const registroLink = document.querySelector('a[href*="formRegisterProduc.html"]')
    const mobileRegistroLink = document.getElementById("registroLink")

    if (rol !== "admin") {
      if (registroLink) registroLink.style.display = "none"
      if (mobileRegistroLink) mobileRegistroLink.style.display = "none"
    }
  }
})

function openCartSidebar() {
  const cartSidebar = document.getElementById("cartSidebar")
  const overlay = document.querySelector(".overlay")

  if (cartSidebar && overlay) {
    cartSidebar.classList.add("active")
    overlay.classList.add("active")
    document.body.style.overflow = "hidden"
  }
}
