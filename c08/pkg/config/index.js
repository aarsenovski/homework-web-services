const fs = require("fs");

const CONFIG_SOURCE = `${__dirname}/../../config.json`;

let config = null;

if (config === null) {
  const file = fs.readFileSync(CONFIG_SOURCE, "utf-8");
  config = JSON.parse(file); // go imame vo objekt
}

const getSection = (section) => {
  if (!config[section])
    // ako sekcijata ne postoi config[section] e null, negacija na null e true
    throw `Configuration section ${section} does not exist!`;
  return config[section];
};

module.exports = {
  getSection,
};
