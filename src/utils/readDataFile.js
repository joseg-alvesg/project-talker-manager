const fs = require('fs/promises');

const readDataFile = async (path) => {
  try {
    const data = await fs.readFile(path);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const writeDataFile = async (path, att) => {
  try {
    const data = await fs.writeFile(path, JSON.stringify(att));
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  readDataFile,
  writeDataFile,
};