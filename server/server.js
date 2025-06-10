const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();


const {dbconnection} = require("./config/db");
const PORT = process.env.PORT || 8000;
const dbUrl = process.env.MONGODB_URI;

dbconnection(dbUrl);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    }
);

