const fs = require("fs");

const SOURCE_CONFIG = `${__dirname}/../config.json`;

let config = null;

if (config === null) {
  const file = fs.readFileSync(SOURCE_CONFIG, "utf-8");
  config = JSON.parse(file);
}

const getSection = (section) => {
  if (!config[section]) {
    throw `Configuration section ${section} does not exist`;
  }
  return config[section];
};

module.exports = {
  getSection,
};
