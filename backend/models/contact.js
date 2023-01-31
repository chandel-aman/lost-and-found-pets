const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  from_name: { type: String, required: true },
  phone: [String],
  reply_to: { type: String, required: true },
  message: { type: String, required: true },
  subject: { type: String, required: true },
});

module.exports = mongoose.model("Contact", contactSchema);
