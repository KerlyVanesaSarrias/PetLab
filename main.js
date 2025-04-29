const cardsContainer = document.getElementById('cardsContainer')
const categoriesContainer = document.getElementById('categoriesContainer')
const btnServices = document.getElementById('btnServices')
const btnProducts = document.getElementById('btnProducts')
const paginationContainer = document.getElementById('paginationContainer');

let dataFetched = null
let fullCards = []
let currentCards = []
let currentPage = 1;
const cardsPerPage = 8;



const renderCards = (cards, isFull = false) => {

  if (isFull) {
    fullCards = cards
  }
  currentCards = cards

  renderCurrentPage();
  renderPagination();

}
const renderCurrentPage = () => {
  cardsContainer.innerHTML = ''
  const start = (currentPage - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const cardsToShow = currentCards.slice(start, end);

  cardsToShow.forEach(item => {
    const card = document.createElement('div')
    card.className = 'col-md-3 mb-4'
    card.innerHTML = `
      <div class="card shadow" style="width: 100%">
        <img src="${item.img}" class="card-img-top" alt="${item.name}">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">$${item.price}</p>
          <a href="/pages/detail.html?id=${item.id}" class="btn btn-primary">Ver detalles</a>
        </div>
      </div>
    `
    cardsContainer.appendChild(card)
  })
}

const renderPagination = () => {
  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(currentCards.length / cardsPerPage);


  const prevButton = document.createElement('button');
  prevButton.innerText = 'Anterior';
  prevButton.className = 'btn  m-1';
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderCurrentPage();
      renderPagination();
    }
  });
  paginationContainer.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.innerText = i;
    pageButton.className = `btn m-1 ${i === currentPage ? 'btn-primary' : 'btn-outline-primary'}`;
    pageButton.addEventListener('click', () => {
      currentPage = i;
      renderCurrentPage();
      renderPagination();
    });
    paginationContainer.appendChild(pageButton);
  }

  const nextButton = document.createElement('button');
  nextButton.innerText = 'Siguiente';
  nextButton.className = 'btn  m-1';
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderCurrentPage();
      renderPagination();
    }
  });
  paginationContainer.appendChild(nextButton);
}

const renderCategories = (cards) => {
  categoriesContainer.innerHTML = ''
  const categoriasUnicas = new Set()

  cards.forEach(item => {
    if (item.categoria && item.categoria.trim() !== '') {
      categoriasUnicas.add(item.categoria)
    }
  });

  if (categoriasUnicas.size > 0) {
    categoriasUnicas.forEach(cat => {
      const button = document.createElement('button')
      button.className = 'btn btn-outline-info m-1 category-button'
      button.innerText = cat;

      button.addEventListener('click', () => {
        const filtro = fullCards.filter(card => card.categoria == cat)
        currentPage = 1
        renderCards(filtro)
        marcarBotonActivo(button, "category-button")
      })
      categoriesContainer.appendChild(button)

    });
  }
}

const marcarBotonActivo = (botonSeleccionado, grupoClase) => {
  const todosLosBotones = document.querySelectorAll(`.${grupoClase}`);
  todosLosBotones.forEach(btn => btn.classList.remove('active'));
  botonSeleccionado.classList.add('active');
}

fetch('./data.json')
  .then(res => res.json())
  .then(data => {
    dataFetched = data
    renderCards(data.cardsProducts)
    marcarBotonActivo(btnProducts, 'section-button')

  })
  .catch(err => console.error("Error al cargar productos y servicios:", err))

btnServices.addEventListener('click', () => {
  if (dataFetched) {
    currentPage = 1
    renderCards(dataFetched.cardsServices, true);
    renderCategories(dataFetched.cardsServices);
    marcarBotonActivo(btnServices, 'section-button')
  }
});

btnProducts.addEventListener('click', () => {
  currentPage = 1
  if (dataFetched) {
    renderCards(dataFetched.cardsProducts, true)
    renderCategories(dataFetched.cardsProducts);
    marcarBotonActivo(btnProducts, 'section-button')

  }
});

