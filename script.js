/* =========================================================
   SHOWTICKETS — lógica da página e carrinho
   ========================================================= */

// 1. Array de objetos: catálogo de eventos disponíveis no site.
const events = [
  {
    id: 1,
    name: "Neon Pulse Festival",
    category: "Eletrônica",
    date: "12 DEZ 2026",
    location: "Arena Central • Florianópolis, SC",
    price: 180,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=85",
    description: "Uma noite de música eletrônica e luzes."
  },
  {
    id: 2,
    name: "Rock the Night",
    category: "Rock",
    date: "19 DEZ 2026",
    location: "Stage Hall • São Paulo, SP",
    price: 120,
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=85",
    description: "Guitarras, energia e bandas ao vivo."
  },
  {
    id: 3,
    name: "Indie Summer",
    category: "Indie",
    date: "09 JAN 2027",
    location: "Parque das Artes • Curitiba, PR",
    price: 95,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=85",
    description: "Uma celebração da música independente."
  },
  {
    id: 4,
    name: "Pop Universe",
    category: "Pop",
    date: "16 JAN 2027",
    location: "Centro de Eventos • Porto Alegre, RS",
    price: 150,
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=85",
    description: "Hits, performances e uma grande produção."
  },
  {
    id: 5,
    name: "Electric Dreams",
    category: "Eletrônica",
    date: "23 JAN 2027",
    location: "Clube Horizonte • Florianópolis, SC",
    price: 110,
    image: "https://images.unsplash.com/photo-1571266028243-d220c9c3b1c8?auto=format&fit=crop&w=900&q=85",
    description: "Beats e experiências visuais imersivas."
  },
  {
    id: 6,
    name: "Alternative Sounds",
    category: "Rock",
    date: "30 JAN 2027",
    location: "Galpão 7 • Joinville, SC",
    price: 85,
    image: "https://images.unsplash.com/photo-1507874458355-6dbd8d6d5f4f?auto=format&fit=crop&w=900&q=85",
    description: "Sons alternativos em uma noite especial."
  }
];

// 2. Variáveis de estado. O carrinho é um array de objetos.
let cart = [];
let appliedCoupon = "";
let discountRate = 0;
let toastTimeout;

// 3. Seleção de elementos do HTML por meio do DOM.
const eventGrid = document.getElementById("event-grid");
const cartItems = document.getElementById("cart-items");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const couponForm = document.getElementById("coupon-form");
const couponInput = document.getElementById("coupon-input");
const couponFeedback = document.getElementById("coupon-feedback");
const checkoutButton = document.getElementById("checkout-button");
const toast = document.getElementById("toast");

// 4. Formatação de números para a moeda brasileira.
function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// 5. Exibe uma mensagem temporária na tela.
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(function () {
    toast.classList.remove("show");
  }, 2600);
}

// 6. Cria os cards dos eventos usando repetição e manipulação do DOM.
function renderEvents(list) {
  eventGrid.innerHTML = "";

  // Estrutura de repetição: percorre todos os eventos recebidos.
  list.forEach(function (event) {
    const card = document.createElement("article");
    card.className = "event-card";

    card.innerHTML = `
      <div class="event-image-wrap">
        <img class="event-image" src="${event.image}" alt="Imagem ilustrativa de ${event.name}" loading="lazy">
        <span class="event-category">${event.category}</span>
      </div>
      <div class="event-content">
        <span class="event-date">${event.date}</span>
        <h3>${event.name}</h3>
        <p class="event-location">⌖ ${event.location}</p>
        <div class="event-card-bottom">
          <span class="event-price">${formatCurrency(event.price)}<small>por ingresso</small></span>
          <button class="add-button" type="button" data-event-id="${event.id}">+ Adicionar</button>
        </div>
      </div>
    `;

    eventGrid.appendChild(card);
  });

  document.getElementById("empty-state").hidden = list.length !== 0;
}

// 7. Pesquisa textual e filtro de categoria.
function filterEvents() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filteredEvents = events.filter(function (event) {
    const matchesText =
      event.name.toLowerCase().includes(searchTerm) ||
      event.location.toLowerCase().includes(searchTerm) ||
      event.category.toLowerCase().includes(searchTerm);

    const matchesCategory =
      selectedCategory === "todos" || event.category === selectedCategory;

    // Operador lógico AND: os dois critérios precisam ser verdadeiros.
    return matchesText && matchesCategory;
  });

  renderEvents(filteredEvents);
}

// 8. Adiciona um ingresso ao carrinho ou aumenta sua quantidade.
function addToCart(eventId) {
  const selectedEvent = events.find(function (event) {
    return event.id === eventId;
  });

  if (!selectedEvent) {
    showToast("Não foi possível encontrar esse evento.");
    return;
  }

  const cartItem = cart.find(function (item) {
    return item.id === eventId;
  });

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...selectedEvent, quantity: 1 });
  }

  updateCart();
  showToast(selectedEvent.name + " adicionado ao carrinho!");
}

// 9. Altera a quantidade de ingressos. A quantidade mínima é zero.
function changeQuantity(eventId, amount) {
  const cartItem = cart.find(function (item) {
    return item.id === eventId;
  });

  if (!cartItem) return;

  cartItem.quantity += amount;

  if (cartItem.quantity <= 0) {
    cart = cart.filter(function (item) {
      return item.id !== eventId;
    });
  }

  updateCart();
}

// 10. Remove completamente um evento do carrinho.
function removeFromCart(eventId) {
  cart = cart.filter(function (item) {
    return item.id !== eventId;
  });
  updateCart();
  showToast("Ingresso removido do carrinho.");
}

// 11. Calcula os valores e atualiza a tabela e o resumo.
function updateCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = '<tr><td colspan="5" class="cart-empty">Seu carrinho está vazio. Adicione um evento para começar!</td></tr>';
  }

  let subtotal = 0;
  let totalQuantity = 0;

  // Percorre os itens e calcula subtotal e quantidade.
  cart.forEach(function (item) {
    const itemSubtotal = item.price * item.quantity;
    subtotal += itemSubtotal;
    totalQuantity += item.quantity;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${item.name}</strong><br><small>${item.date}</small></td>
      <td>${formatCurrency(item.price)}</td>
      <td>
        <span class="quantity-control">
          <button type="button" data-action="decrease" data-id="${item.id}" aria-label="Diminuir quantidade">−</button>
          <strong>${item.quantity}</strong>
          <button type="button" data-action="increase" data-id="${item.id}" aria-label="Aumentar quantidade">+</button>
        </span>
      </td>
      <td>${formatCurrency(itemSubtotal)}</td>
      <td><button class="remove-button" type="button" data-action="remove" data-id="${item.id}">Remover</button></td>
    `;
    cartItems.appendChild(row);
  });

  const discount = subtotal * discountRate;
  const total = subtotal - discount;

  document.getElementById("subtotal-value").textContent = formatCurrency(subtotal);
  document.getElementById("discount-value").textContent = "− " + formatCurrency(discount);
  document.getElementById("total-value").textContent = formatCurrency(total);
  document.getElementById("header-cart-count").textContent = totalQuantity;

  // Condicional: impede a finalização quando o carrinho está vazio.
  checkoutButton.disabled = cart.length === 0;
}

// 12. Valida e aplica o cupom de desconto.
function applyCoupon() {
  const code = couponInput.value.trim().toUpperCase();

  if (cart.length === 0) {
    couponFeedback.textContent = "Adicione um ingresso antes de aplicar o cupom.";
    couponFeedback.className = "coupon-feedback error";
    return;
  }

  if (code === "SHOW10") {
    appliedCoupon = code;
    discountRate = 0.10;
    couponFeedback.textContent = "Cupom SHOW10 aplicado: 10% de desconto!";
    couponFeedback.className = "coupon-feedback success";
    updateCart();
  } else if (code === "") {
    couponFeedback.textContent = "Digite um código de cupom.";
    couponFeedback.className = "coupon-feedback error";
  } else {
    appliedCoupon = "";
    discountRate = 0;
    couponFeedback.textContent = "Cupom inválido. Confira o código e tente novamente.";
    couponFeedback.className = "coupon-feedback error";
    updateCart();
  }
}

// 13. Simula a confirmação da compra. Não existe integração com pagamento.
function checkout() {
  if (cart.length === 0) {
    showToast("Seu carrinho está vazio.");
    return;
  }

  const quantity = cart.reduce(function (sum, item) {
    return sum + item.quantity;
  }, 0);

  const totalText = document.getElementById("total-value").textContent;
  alert("Compra simulada com sucesso!\\nIngressos: " + quantity + "\\nTotal: " + totalText + "\\n\\nEste projeto não realiza pagamentos reais.");

  cart = [];
  appliedCoupon = "";
  discountRate = 0;
  couponInput.value = "";
  couponFeedback.textContent = "Use SHOW10 para ganhar 10% de desconto.";
  couponFeedback.className = "coupon-feedback";
  updateCart();
}

// 14. Eventos: escutam ações do usuário e chamam as funções.
eventGrid.addEventListener("click", function (event) {
  const button = event.target.closest("[data-event-id]");
  if (button) {
    addToCart(Number(button.dataset.eventId));
  }
});

cartItems.addEventListener("click", function (event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const eventId = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === "increase") changeQuantity(eventId, 1);
  if (action === "decrease") changeQuantity(eventId, -1);
  if (action === "remove") removeFromCart(eventId);
});

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  filterEvents();
});

categoryFilter.addEventListener("change", filterEvents);

couponForm.addEventListener("submit", function (event) {
  event.preventDefault();
  applyCoupon();
});

checkoutButton.addEventListener("click", checkout);

// 15. Inicialização: mostra os eventos e o carrinho vazio ao abrir a página.
renderEvents(events);
updateCart();
