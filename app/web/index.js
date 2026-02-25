const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/products", async (req, res) => {
  try {
    const response = await axios.get("http://localhost:4000/products");
    res.json(response.data);
  } catch (error) {
    console.error("Error calling catalog service:", error.message);
    res.status(503).json({ error: "Catalog service is unavailable" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/products/${req.params.id}`
    );

    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(503).json({ error: "Catalog service unavailable" });
  }
});

app.get("/api/status", async (req, res) => {
  const status = {
    web: { status: "up" },
    catalog: { status: "unknown" },
  };

  try {
    const response = await axios.get("http://localhost:4000/health");
    if (response.status === 200) {
      status.catalog.status = "up";
    } else {
      status.catalog.status = "degraded";
    }
  } catch (error) {
    status.catalog.status = "down";
    status.catalog.error = error.message;
  }

  res.json(status);
});

app.get("/health", (req, res) => {
  res.json({ status: "up", service: "web" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Web service is running on port ${PORT}`);
});
