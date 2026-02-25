const button = document.getElementById("load-products");
const statusDiv = document.getElementById("status");
const list = document.getElementById("products");

button.addEventListener("click", async () => {
  statusDiv.textContent = "Loading...";
  list.innerHTML = "";

  try {
    const resp = await fetch("/api/products");

    if (!resp.ok) {
      const errorBody = await resp.json().catch(() => ({}));
      statusDiv.textContent =
        errorBody.error || "Failed to load products (server error)";
      statusDiv.className = "status status-error";
      return;
    }

    const products = await resp.json();
    statusDiv.textContent = `Loaded ${products.length} products`;
    statusDiv.className = "status status-success";

    products.forEach((p) => {
      const li = document.createElement("li");
      li.textContent = `${p.name} - $${p.price}`;
      li.className = "product-item";
      list.appendChild(li);
    });
  } catch (err) {
    statusDiv.textContent = "Failed to load products (network error)";
    statusDiv.className = "status status-error";
  }
});
