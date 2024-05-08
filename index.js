import express from "express";
import { connectDB } from "./config/dbConfig.js";
import cors from "cors";
import { addNewItemToCart, deleteItemFromCart, getCartItems, getLocations, getProducts, getTables,getCategories } from "./controller/apiController.js";
import { config } from "dotenv";

const app = express();

config({
  path: "./.env",
});

const url = process.env.MONGO_URI;

connectDB(url);

app.use(express.json());
app.use(cors());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.get("/", (req, res) => {
  res.send("API Working with /");
});

// get requests
app.get("/api/v1/products", getProducts);
app.get("/api/v1/locations",getLocations);
app.get("/api/v1/tables",getTables);
app.get("/api/v1/categories",getCategories);



// post requests
app.post("/api/v1/cartitem",getCartItems);
app.post('/api/v1/cart/add', addNewItemToCart);
app.post('/api/v1/cart/decrement' , deleteItemFromCart)

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})