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

app.get("/health", (req, res) => {
  res.json({ status: "up", service: "web" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Web service is running on port ${PORT}`);
});
