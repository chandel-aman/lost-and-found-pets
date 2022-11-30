const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const breedsRoutes = require("./routes/breeds-route");
const petRoutes = require("./routes/pet-route");
const contactRoute = require("./routes/contact-route");
const HttpError = require("./models/http-erorr");

const app = express();

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/breeds/", breedsRoutes);
app.use("/api/pet/", petRoutes);
// app.use("/api/contact/", contactRoute);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route!", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknow error occured!" });
});

mongoose
  .connect(
    "mongodb+srv://Sam:yV4Xv2QPfqJJirRK@cluster0.1lasqbi.mongodb.net/lost-and-found-pets?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
    console.log("Connected to the database.");
  })
  .catch((error) => console.log(error));
