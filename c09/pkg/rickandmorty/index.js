const { getSection } = require("../config/index");
const CACHE = {};

//

const getCharactersNames = async (id) => {
  const time = new Date().getTime() / 1000; // vreme vo sekundi

  if (
    CACHE[id] &&
    time < CACHE[id].timestamp + getSection("rickandmorty").exp
  ) {
    console.log("cache");
    return CACHE[id];
  }
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await res.json();

    CACHE[id] = {
      timestamp: new Date().getTime() / 1000,
      name: data.name,
    };
    console.log("fetch");
    return data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getCharactersNames,
};
