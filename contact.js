document.addEventListener('DOMContentLoaded', function() {
    const checkProducto = document.querySelector('input[name="relacion"][value="producto"]');
    const checkServicio = document.querySelector('input[name="relacion"][value="servicio"]');
    const checkGeneral = document.querySelector('input[name="relacion"][value="general"]');
    
    const seccionProducto = document.querySelector('.info-producto');
    const seccionServicio = document.querySelector('.info-servicio');
    
    function actualizarVisibilidad() {

        seccionProducto.style.display = 'none';
        seccionServicio.style.display = 'none';
        
        if (checkProducto.checked) {
            seccionProducto.style.display = 'block';
        }
        
        if (checkServicio.checked) {
            seccionServicio.style.display = 'block';
        }
        
        if (checkGeneral.checked) {
            seccionProducto.style.display = 'none';
            seccionServicio.style.display = 'none';
        }
    }
    
    checkProducto.addEventListener('change', actualizarVisibilidad);
    checkServicio.addEventListener('change', actualizarVisibilidad);
    checkGeneral.addEventListener('change', actualizarVisibilidad);
    
    actualizarVisibilidad();
});



/*r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',*/