// Descobre se estamos em /pages/ para ajustar caminho das imagens
const BASE = location.pathname.includes('/pages/') ? '../' : '';

/* Cria um card de produto */
function createCard({ title, price, image, link }) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.innerHTML = `
    <img src="${BASE}${image}" alt="${title}">
    <h3>${title}</h3>
    <p class="price">${price}</p>
    <a href="${link}" target="_blank" rel="noopener" class="btn-secondary">Ver na Shopee</a>
  `;
  return card;
}

/* Render Home (todos) */
const homeGrid = document.getElementById('home-grid');
if (homeGrid) {
  PRODUCTS.forEach(prod => homeGrid.appendChild(createCard(prod)));
}

/* Render Ofertas (todos) */
const ofertasGrid = document.getElementById('ofertas-grid');
if (ofertasGrid) {
  PRODUCTS.forEach(prod => ofertasGrid.appendChild(createCard(prod)));
}

/* Render Categoria (filtrado pelo #hash) */
const catGrid = document.getElementById('cat-grid');
if (catGrid) {
  const catName = location.hash.replace('#','') || 'beleza';
  document.getElementById('cat-title').textContent =
    `Categoria: ${catName.charAt(0).toUpperCase()+catName.slice(1)}`;

  const items = PRODUCTS.filter(p => p.category === catName);
  if (items.length) {
    items.forEach(p => catGrid.appendChild(createCard(p)));
  } else {
    catGrid.innerHTML = '<p>Sem produtos nesta categoria ainda 😥</p>';
  }
}
