

let servicioSeleccionado = null;
let fechaSeleccionada = null;
let horaSeleccionada = null;

const disponibilidadPorDia = {
  "2025-06-05": ["08:00", "09:00", "11:00", "14:00", "16:00"],
  "2025-06-06": ["10:00", "13:00", "15:00"],
  "2025-06-07": ["09:00", "12:00", "17:00"], 
  "2025-06-09": ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"]
};


const inputFecha = document.getElementById('inputFecha');
const horasContainer = document.getElementById('horasContainer');
const confirmarBtn = document.getElementById('confirmarReserva');

flatpickr("#inputFecha", {
  minDate: "today",
  dateFormat: "Y-m-d",
  disable: [
    function (date) {
      return date.getDay() === 0 || date.getDay() === 6;
    }
  ],
  onChange: function (selectedDates, dateStr) {
    fechaSeleccionada = dateStr;
    horaSeleccionada = null;
    confirmarBtn.disabled = true;
    renderHorasDisponibles(dateStr);
  }
});


const renderHorasDisponibles = (fechaStr) => {
  horasContainer.innerHTML = '';
  const horas = disponibilidadPorDia[fechaStr] || [];

  if (horas.length === 0) {
    horasContainer.innerHTML = '<p class="text-danger">No hay horas disponibles para este día.</p>';
    return;
  }

  horas.forEach(hora => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-success';
    btn.innerText = hora;
    btn.addEventListener('click', () => {
      horaSeleccionada = hora;
      [...horasContainer.children].forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      confirmarBtn.disabled = false;
    });
    horasContainer.appendChild(btn);
  });
};


confirmarBtn.addEventListener('click', () => {
  if (!fechaSeleccionada || !horaSeleccionada) return;
  const detalleReserva = `${servicioSeleccionado.nombre} - ${fechaSeleccionada} ${horaSeleccionada}`;
  addToCart(detalleReserva, servicioSeleccionado.precio, servicioSeleccionado.imagen);
    disponibilidadPorDia[fechaSeleccionada] = disponibilidadPorDia[fechaSeleccionada].filter(
    hora => hora !== horaSeleccionada
  );

  const modal = bootstrap.Modal.getInstance(document.getElementById('modalReserva'));
  modal.hide();
});