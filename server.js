const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDatabase = require("./config/database");
const fileUpload = require("express-fileupload");

dotenv.config({ path: "./config/config.env" });

connectDatabase();

const books = require("./routes/books");

const app = express();

if (process.env.NODE_ENV != "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(fileUpload());
app.use(express.static("uploads"));
app.use("/api/v1/books", books);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server running at port: ${PORT}`)
);
