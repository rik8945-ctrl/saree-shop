// Supabase Credentials
const SUPABASE_URL = "https://amccedlicdnyulaesqdw.supabase.co";
const SUPABASE_KEY = "Sb_publishable_CYRf_kgkkeGsJLFZgO9Djw_7Fq2GoHc";

// Supabase Client Initialize
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const productGrid = document.getElementById("productGrid");

async function loadProducts() {
  if (!productGrid) return;

  try {
    // Supabase की products टेबल से डेटा फेच करें
    const { data: products, error } = await supabaseClient
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    if (!products || products.length === 0) {
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
          src="${escapeHtml(product.image_url)}"
          alt="${escapeHtml(product.name)}"
          loading="lazy"
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
      <p class="empty">
        Failed to load sarees. Please check configuration.
      </p>
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

// पेज लोड होते ही प्रोडक्ट्स लाएं
loadProducts();
