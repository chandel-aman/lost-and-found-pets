const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const breedsSchema = new Schema({
  breeds: { dogBreeds: [String], catBreeds: [String], hamBreeds: [String] },
});

module.exports = mongoose.model("Breeds", breedsSchema);
