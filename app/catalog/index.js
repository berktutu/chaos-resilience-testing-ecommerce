const express = require("express");

const app = express();

const products = [
  { id: 1, name: "Air Jordan MVP 92", price: 6549 },
  { id: 2, name: "Book 2 Spiridon", price: 8200 },
  { id: 3, name: "Luka 77", price: 5500 },
  { id: 4, name: "Nike Street Flare", price: 6599 },
];

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "up", service: "catalog" });
});

// Products endpoint
app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Catalog service is running on port ${PORT}`);
});
