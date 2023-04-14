const express = require('express');
const readDataFile = require('./utils/readDataFile');
const tokenGenerator = require('./utils/tokenGenerator');

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

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await readDataFile();
    const findId = data.find((d) => d.id === Number(id));
    if (!findId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(findId);
  } catch (error) {
    res.status(500).json({ message: 'Deu algum erro aqui' });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const token = tokenGenerator();
  const user = { email, password, token };
  res.status(200).json(user);
});

app.listen(PORT, () => {
  console.log('3001 tá on hein');
});
