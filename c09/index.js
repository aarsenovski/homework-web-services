const express = require("express");

const { getSection } = require("./pkg/config/index");
const { getTheCharactersNames } = require("./handlers/rickandmorty");

const app = express();

app.get("/character/:id", getTheCharactersNames);

app.listen(getSection("rickandmorty").port, () =>
  console.log(`Server started at port ${getSection("rickandmorty").port}`)
);
