import productTimers from "./timeCount.js";

const productList = document.querySelector(".product-list");

async function fetchProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  displayProducts(products);
}

function displayProducts(products) {
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    productCard.innerHTML = `
    <div class="product-card__image-container">
        <img class="product-card__image" src="${product.image}" alt="${product.title}">
    </div>
    <h2 class="product-card__title">${product.title}</h2>
    
    <div class="product-card__footer">
        <span class="product-card__timer" id="timer-${product.id}">Cargando...</span>
        <button class="product-card__button" id="button-${product.id}">Go to detail</button>
    </div>
`;

    const button = productCard.querySelector(".product-card__button");
    // Añadir el evento de clic al botón
    button.addEventListener("click", () => {
      alert("(Click) Vas a ir al detalle del producto");
    });
    const timerDisplay = productCard.querySelector(".product-card__timer");

    // Obtener el tiempo del temporizador basado en el ID del producto
    const timerData = productTimers.find((timer) => timer.id === product.id);
    const timer = timerData
      ? timerData.time
      : Math.floor(Math.random() * (180 - 60 + 1)) + 60; // Aleatorio entre 60 y 180 segundos
    // Temporizador
    let timeLeft = timer;
    timerDisplay.textContent = formatTime(timeLeft);

    const countdown = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = formatTime(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(countdown);
        button.disabled = true;
      }
    }, 1000);

    productList.appendChild(productCard);
  });
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

fetchProducts();
