const fs = require('fs/promises');
const path = require('path');

const dirPath = path.resolve(__dirname, '../talker.json');

module.exports = async () => {
  try {
    const data = await fs.readFile(dirPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};