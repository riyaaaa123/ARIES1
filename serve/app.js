require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("./db/conn");
const Products = require("./models/productSchema");
const DefaultData = require("./defaultdata");
const cors = require("cors");
const router = require("./routes/router");

app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);


const port = process.env.PORT||8005;
if()
app.listen(port, () => {
  console.log(`yeye,connected!,port no ${port}`);
});
DefaultData();
