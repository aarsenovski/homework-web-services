const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  author: String,
  country: String,
  language: String,
  pages: Number,
  title: String,
  year: Number,
});

const BookModel = mongoose.model("Book", bookSchema, "books");

// get all cars
const readBooks = async () => {
  return await BookModel.find();
};

// create
const addBook = async (data) => {
  const newBook = new BookModel(data);
  return await newBook.save();
};

const updateBook = async (id, data) => {
  return await BookModel.updateOne({ _id: id }, data);
};

const removeBook = async (id) => {
  return await BookModel.deleteOne({ _id: id });
};

module.exports = {
  readBooks,
  addBook,
  update,
  removeBook,
};
