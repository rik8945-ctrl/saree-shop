const productGrid = document.getElementById("productGrid");

function loadProducts() {
  const products = JSON.parse(
    localStorage.getItem("sareeProducts") || "[]"
  );

  if (!productGrid) return;

  if (products.length === 0) {
    productGrid.innerHTML = `
      <p class="empty">
        No sarees available yet.
      </p>
    `;
    return;
  }

  productGrid.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `
      <img
        src="${product.image}"
        alt="${escapeHtml(product.name)}"
      >

      <div class="product-info">

        <h3>
          ${escapeHtml(product.name)}
        </h3>

        <div class="product-price">
          ₹${escapeHtml(product.price)}
        </div>

        <a
          class="shop-now"
          href="${product.link}"
          target="_blank"
          rel="noopener noreferrer"
        >
          SHOP NOW
        </a>

      </div>
    `;

    productGrid.appendChild(card);
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

loadProducts();
