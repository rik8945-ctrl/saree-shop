// Supabase Credentials
const SUPABASE_URL = "https://amccedlicdnyulaesqdw.supabase.co";
const SUPABASE_KEY = "EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtY2NlZGxpY2RueXVsYWVzcWR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0NzI1NjAsImV4cCI6MjEwNzA0ODU2MH0.xtle9ghaER6U22ttQImeJVgHHFivmJDJswbdI6SK66k";

// Supabase Client Initialize
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const productGrid = document.getElementById("productGrid");

async function loadProducts() {
  if (!productGrid) return;

  try {
    const { data: products, error } = await supabaseClient
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    if (!products || products.length === 0) {
      productGrid.innerHTML = `
        <p class="empty">No sarees available yet.</p>
      `;
      return;
    }

    productGrid.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("article");
      card.className = "product-card";

      card.innerHTML = `
        <img
          src="${escapeHtml(product.image_url)}"
          alt="${escapeHtml(product.name)}"
          loading="lazy"
        >
        <div class="product-info">
          <h3>${escapeHtml(product.name)}</h3>
          <div class="product-price">₹${escapeHtml(product.price)}</div>
          <a
            class="shop-now"
            href="${escapeHtml(product.affiliate_link)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            SHOP NOW
          </a>
        </div>
      `;

      productGrid.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading products:", err);
    productGrid.innerHTML = `
      <p class="empty">Failed to load sarees. Please check configuration.</p>
    `;
  }
}

function escapeHtml(value) {
  if (!value) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

loadProducts();
