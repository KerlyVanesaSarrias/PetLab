async function loadFooter() {
    try {
        const response = await fetch('./footer.html'); // Ajusta la ruta si es diferente
        const footerHtml = await response.text();
        document.querySelector('.container-footer').innerHTML = footerHtml;
    } catch (error) {
        console.error('Error al cargar el footer:', error);
        document.querySelector('.container-footer').innerHTML = '<p>Error al cargar el footer.</p>';
    }
}

// Llama a la función para cargar el footer cuando la página se carga
document.addEventListener('DOMContentLoaded', loadFooter);