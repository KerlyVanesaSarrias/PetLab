fetch("/pages/navbar.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("container-navbar").innerHTML = data;

        const menuToggle = document.querySelector('.menu-toggle');
        const listaNavbar = document.querySelector('.lista-navbar');
        const iconosNavbar = document.querySelector('.iconos-navbar')

        menuToggle.addEventListener('click', () => {
            listaNavbar.classList.toggle('active');
            iconosNavbar.classList.toggle('active');
        });

        // metodo para ocultar el formulario de registro de productos a los usuarios
        const rol = localStorage.getItem("rol");
        const links = document.querySelectorAll('.lista-navbar a');
        const registroLink = Array.from(links).find(link =>
            link.getAttribute('href')?.includes("formRegisterProduc.html")
        ); 

        if(rol !== "admin" && registroLink){
            registroLink.style.display = "none";
        }

    });






