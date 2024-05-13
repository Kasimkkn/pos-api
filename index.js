import express from "express";
import { connectDB } from "./config/dbConfig.js";
import cors from "cors";
import { config } from "dotenv";
import {  userLogin } from "./controller/apiController.js";
import { addProducts, getProducts, updateProducts } from "./controller/productsController.js";
import { addNewItemToCart, deleteItemFromCart, getCartItems } from "./controller/cartController.js";
import { createBill } from "./controller/billController.js";
import { addLocation, getLocations, updateLocation } from "./controller/locationController.js";
import { addTable, getTables, updateTable } from "./controller/tableController.js";
import { addCategory, getCategories, updateCategory } from "./controller/categoriesController.js";
import { getDailySales, getItemWiseMonthlySales, getItemWiseSales, getMonthlySales, getTableWiseSales } from "./controller/reportController.js";

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
app.post('/api/v1/login' , userLogin);


// adding request
app.post("/api/v1/newproduct" , addProducts);
app.post("/api/v1/addlocation", addLocation);
app.post('/api/v1/addtable' , addTable)
app.post('/api/v1/addcategories' , addCategory);

// update requests
app.put("/api/v1/updateproducts", updateProducts);
app.put("/api/v1/updatelocation", updateLocation);
app.put("/api/v1/updatetable", updateTable);
app.put("/api/v1/updatecategory", updateCategory);


// create bill
app.post('/api/v1/createbill', createBill);


// report requests
app.post('/api/v1/daily', getDailySales);
app.post('/api/v1/monthly', getMonthlySales);
app.post('/api/v1/tablewise', getTableWiseSales);
app.post('/api/v1/itemwise', getItemWiseSales);
app.post('/api/v1/itemwisemonthly', getItemWiseMonthlySales);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})