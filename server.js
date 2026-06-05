const express = require("express");

const app = express();

app.use(express.json());

let products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000
  },
  {
    id: 2,
    name: "Mobile",
    price: 25000
  }
];


// GET ALL PRODUCTS
app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});


// GET PRODUCT BY ID
app.get("/api/products/:id", (req, res) => {

  const product = products.find(
    p => p.id === parseInt(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.status(200).json(product);
});


// CREATE PRODUCT
app.post("/api/products", (req, res) => {

  const { name, price } = req.body;

  const newProduct = {
    id: products.length + 1,
    name,
    price
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product created",
    product: newProduct
  });
});


// UPDATE PRODUCT
app.put("/api/products/:id", (req, res) => {

  const product = products.find(
    p => p.id === parseInt(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  product.name = req.body.name;
  product.price = req.body.price;

  res.status(200).json({
    message: "Product updated",
    product
  });
});


// DELETE PRODUCT
app.delete("/api/products/:id", (req, res) => {

  const productIndex = products.findIndex(
    p => p.id === parseInt(req.params.id)
  );

  if (productIndex === -1) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  products.splice(productIndex, 1);

  res.status(200).json({
    message: "Product deleted"
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
