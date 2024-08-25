const { readFile, writeFile } = require("../read-write");

const getBooks = async (req, res) => {
  try {
    const books = await readFile("books.json");
    return res.status(200).send(books);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const addBook = async (req, res) => {
  try {
    const books = await readFile("books.json");
    const newBook = req.body;
    books.push(newBook);
    await writeFile("books.json", books);
    return res.status(201).send("New book added");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const updateBook = async (req, res) => {
  try {
    let books = await readFile("books.json");
    const bookId = Number(req.params.id);
    const newBookData = req.body;
    books = books.map((book, index) => {
      if (index === bookId) {
        return {
          ...book,
          ...newBookData,
        };
      }
      return book;
    });
    await writeFile("books.json", books);
    return res.status(200).send("Book updated successfully!");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error");
  }
};

const removeBook = async (req, res) => {
  try {
    let books = await readFile("books.json");
    const bookId = Number(req.params.id);

    books = books.filter((book, index) => index !== bookId);

    await writeFile("books.json", books);
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
