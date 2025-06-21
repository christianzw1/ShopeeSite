// Descobre se estamos em /pages/ para ajustar caminho das imagens
const BASE = location.pathname.includes('/pages/') ? '../' : '';

/* ============ COMPONENTE CARD ============ */
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

/* ============ HOME – Achados da Semana ============ */
const homeGrid = document.getElementById('home-grid');
if (homeGrid) {
  PRODUCTS.forEach(prod => homeGrid.appendChild(createCard(prod)));
}

/* ============ OFERTAS ============ */
const ofertasGrid = document.getElementById('ofertas-grid');
if (ofertasGrid) {
  PRODUCTS.forEach(prod => ofertasGrid.appendChild(createCard(prod)));
}

/* ============ CATEGORIA ============ */
const catGrid = document.getElementById('cat-grid');
if (catGrid) {
  const catName = location.hash.replace('#', '') || 'beleza';
  document.getElementById('cat-title').textContent =
    `Categoria: ${catName.charAt(0).toUpperCase() + catName.slice(1)}`;

  const items = PRODUCTS.filter(p => p.category === catName);
  if (items.length) {
    items.forEach(p => catGrid.appendChild(createCard(p)));
  } else {
    catGrid.innerHTML = '<p>Sem produtos nesta categoria ainda 😥</p>';
  }
}

/* ============ BUSCA POR CÓDIGO ============ */
const codeForm   = document.getElementById('code-form');
const codeInput  = document.getElementById('code-input');
const codeResult = document.getElementById('code-result');

if (codeForm) {
  codeForm.addEventListener('submit', e => {
    e.preventDefault();
    const code = codeInput.value.trim().toUpperCase();
    if (!code) return;

    // Limpa resultado anterior
    codeResult.innerHTML = '';
    codeResult.hidden = false;

    const product = PRODUCTS.find(p => p.code.toUpperCase() === code);
    if (product) {
      codeResult.appendChild(createCard(product));
      codeResult.scrollIntoView({ behavior: 'smooth' });
    } else {
      codeResult.innerHTML = '<p style="text-align:center;">Código não encontrado 😥</p>';
    }

    codeInput.value = '';
  });
}
