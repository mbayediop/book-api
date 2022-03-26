const mongoose = require("mongoose");

const BookModel = mongoose.model(
  "node-api",
  {
    author: {
      type: String,
      required: true
    },
    resume: {
      type: String,
      required: true
    },
    categorie: {
      type: String,
      required: true
    },
    maisonedition: {
      type: String,
      required: true
    },
    quantitestock: {
      type: Number,
      required: true
    },
    datedesortie: {
      type: Date,
      default: Date()
    }
  },
  "book"
);

module.exports = { BookModel };