const button = document.getElementById("load-products");
const statusDiv = document.getElementById("status");
const list = document.getElementById("products");

const webStatusValue = document.getElementById("web-status-value");
const catalogStatusValue = document.getElementById("catalog-status-value");
const detailsContainer = document.getElementById("product-details-content");

function clearElement(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

async function refreshSystemStatus() {
  try {
    const resp = await fetch("/api/status");

    if (!resp.ok) {
      webStatusValue.textContent = "error";
      webStatusValue.className = "status-down";

      catalogStatusValue.textContent = "error";
      catalogStatusValue.className = "status-down";
      return;
    }

    const data = await resp.json();

    webStatusValue.textContent = data.web.status;
    webStatusValue.className =
      data.web.status === "up" ? "status-up" : "status-down";

    catalogStatusValue.textContent = data.catalog.status;
    catalogStatusValue.className =
      data.catalog.status === "up" ? "status-up" : "status-down";
  } catch (err) {
    webStatusValue.textContent = "unknown";
    webStatusValue.className = "status-down";

    catalogStatusValue.textContent = "unknown";
    catalogStatusValue.className = "status-down";
  }
}

async function loadProductDetails(productId) {
  detailsContainer.textContent = "Loading details...";

  try {
    const resp = await fetch(`/api/products/${productId}`);

    if (!resp.ok) {
      detailsContainer.textContent = "Failed to load product details.";
      return;
    }

    const details = await resp.json();

    clearElement(detailsContainer);

    const nameEl = document.createElement("div");
    nameEl.textContent = `Name: ${details.name}`;

    const priceEl = document.createElement("div");
    priceEl.textContent = `Price: $${details.price}`;

    const idEl = document.createElement("div");
    idEl.textContent = `ID: ${details.id}`;

    detailsContainer.appendChild(nameEl);
    detailsContainer.appendChild(priceEl);
    detailsContainer.appendChild(idEl);
  } catch (err) {
    detailsContainer.textContent = "Catalog service unavailable.";
  }
}

button.addEventListener("click", async () => {
  statusDiv.textContent = "Loading...";
  statusDiv.className = "status";
  clearElement(list);

  try {
    const resp = await fetch("/api/products");

    if (!resp.ok) {
      statusDiv.textContent = "Failed to load products (server error)";
      statusDiv.className = "status status-error";
      return;
    }

    const products = await resp.json();
    statusDiv.textContent = `Loaded ${products.length} products`;
    statusDiv.className = "status status-success";

    products.forEach((p) => {
      const li = document.createElement("li");
      li.className = "product-item";

      const row = document.createElement("div");
      row.style.display = "flex";
      row.style.justifyContent = "space-between";
      row.style.alignItems = "center";

      const nameSpan = document.createElement("span");
      nameSpan.textContent = p.name;

      const priceStrong = document.createElement("strong");
      priceStrong.textContent = `$${p.price}`;

      row.appendChild(nameSpan);
      row.appendChild(priceStrong);
      li.appendChild(row);

      li.addEventListener("click", () => {
        loadProductDetails(p.id);
      });

      list.appendChild(li);
    });
  } catch (err) {
    statusDiv.textContent = "Failed to load products (network error)";
    statusDiv.className = "status status-error";
  }
});

refreshSystemStatus();
