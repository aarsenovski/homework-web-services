const { getCharactersNames } = require("../pkg/rickandmorty");

const getTheCharactersNames = async (req, res) => {
  try {
    const characters = await getCharactersNames();
    return res.status(200).send(characters);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error!");
  }
};

module.exports = {
  getTheCharactersNames,
};
