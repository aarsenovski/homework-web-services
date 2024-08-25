const express = require("express");

const {
  getBooks,
  addBook,
  updateBook,
  removeBook,
} = require("./handlers/books");

const app = express();
app.use(express.json());

app.get("/books", getBooks);
app.post("/books", addBook);
app.put("/books/:id", updateBook);
app.delete("/books/:id", removeBook);

app.listen(3000, () => console.log("Server started at port 3000"));
