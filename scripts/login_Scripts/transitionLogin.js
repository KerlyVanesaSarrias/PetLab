document.addEventListener('DOMContentLoaded', () => {
    const pantalla = document.querySelector('.pantalla-principal');
    const btnRegistro = document.querySelector('.btn-registro');
    const btnLogin = document.querySelector('.btn-login');

    btnRegistro.addEventListener('click', (e) => {
        e.preventDefault();
        pantalla.classList.add('registro-activo');
    });

    btnLogin.addEventListener('click', (e) => {
        e.preventDefault();
        pantalla.classList.remove('registro-activo');
    });
});