const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lostPetSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  petName: {type: String, required: true},
  petType: { type: String, required: true },
  breed: { type: String, required: true },
  sex: { type: String, required: true },
  color: { type: String, required: true },
  mark: { type: String },
  file: { type: String },
  reward: { type: String },
  lost: { type: Boolean, required: true },
});

module.exports = mongoose.model("Pet", lostPetSchema);
