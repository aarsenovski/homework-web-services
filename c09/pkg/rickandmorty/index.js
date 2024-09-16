const getCharactersNames = async () => {
  try {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    const data = await res.json();
    const characterNames = data.results.map((character) => character.name);
    return characterNames;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getCharactersNames,
};
