const express = require('express');
const readDataFile = require('./utils/readDataFile');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  try {
    const data = await readDataFile();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ messsage: 'Deu algum erro aqui' });
  }
});

app.listen(PORT, () => {
  console.log('3001 tá on hein');
});
