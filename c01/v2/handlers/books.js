const { readBooks } = require("../models/books");
const { readFile, writeFile } = require("../read-write");

const getBooks = async (req, res) => {
  try {
    const books = await readBooks();
    return res.status(200).send(books);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const addBook = async (req, res) => {
  try {
    await addBook(req.body);
    await writeFile("books.json", books);
    return res.status(201).send("New book added");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const updateBook = async (req, res) => {
  try {
    await updateBook(req.params.id, req.body);
    return res.status(200).send("Book updated successfully!");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const removeBook = async (req, res) => {
  try {
    await removeBook(req.params.id);
    return res.status(200).send("Book deleted successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};
module.exports = {
  getBooks,
  addBook,
  updateBook,
  removeBook,
};
