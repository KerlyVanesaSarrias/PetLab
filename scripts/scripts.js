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
        
    });

