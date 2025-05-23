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


fetch('./BD/dataBase.json')
  .then(res => res.json())
  .then(data => {
    dataFetched = data
    renderCards(data.services)
    marcarBotonActivo(btnServices, 'section-button')
      renderCategories(dataFetched.services);

  }).catch(err => console.error("Error al cargar productos y servicios:", err))

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

  const truncate = (str, max = 35) => {
    return str.length > max ? str.slice(0, max) + '…' : str;
  }


  cardsToShow.forEach(item => {
    const card = document.createElement('div')
    card.className = 'col-6 col-md-3 mb-4 mb-4'
    card.innerHTML = `
      <div  class="card shadow" style="width: 100% cursor: pointer">
          <img src="${item.img}" class="card-img-top" alt="${item.name}">
         <div class="card-body">
            <h5 class="card-title">${truncate(item.name, 25)}</h5>
            <p class="card-text">$${item.price}</p>
          <div class="btnCard add-cart">Añadir al Carrito</div>
        </div>
      </div>
    `
    card.querySelector('.card').addEventListener('click', () => {
      sessionStorage.setItem('selectedItem', JSON.stringify(item))
      window.location.href = '/pages/detail.html'
    })

    card.querySelector('.add-cart').addEventListener('click', e => {
      e.stopPropagation()
      addToCart(item.name, item.price, item.img)
    })
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
    if (item.category && item.category.trim() !== '') {
      categoriasUnicas.add(item.category)
    }
  });

  if (categoriasUnicas.size > 0) {
    categoriasUnicas.forEach(cat => {
      const button = document.createElement('button')
      button.className = 'category-button'
      button.innerText = cat;

      button.addEventListener('click', () => {
        const filtro = fullCards.filter(card => card.category == cat)
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

btnServices.addEventListener('click', () => {
  if (dataFetched) {
    currentPage = 1
    renderCards(dataFetched.services, true);
    renderCategories(dataFetched.services);
    marcarBotonActivo(btnServices, 'section-button')
  }
});

btnProducts.addEventListener('click', () => {
  currentPage = 1
  if (dataFetched) {
    renderCards(dataFetched.products, true)
    renderCategories(dataFetched.products);
    marcarBotonActivo(btnProducts, 'section-button')

  }
});
