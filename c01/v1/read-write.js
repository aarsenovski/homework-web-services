const fs = require("fs");

const readFile = async (filename) => {
  return new Promise((success, fail) => {
    fs.readFile(filename, "utf-8", (err, data) => {
      if (err) return fail(err);
      data = JSON.parse(data);
      return success(data);
    });
  });
};

const writeFile = async (filename, data) => {
  return new Promise((success, fail) => {
    data = JSON.stringify(data);
    fs.writeFile(filename, data, (err) => {
      if (err) return fail(err);
      return success();
    });
  });
};

module.exports = {
  readFile,
  writeFile,
};
