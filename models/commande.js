const mongoose = require("mongoose")

const commandeModel = new mongoose.Model(
    "node-api",
    {
    quantityCom: Number,
    etat: Boolean,
    book_id: String,
  },
  "commande"
  );

  module.exports = { commandeModel };