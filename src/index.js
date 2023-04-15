const express = require('express');
const path = require('path');
const { readDataFile, writeDataFile } = require('./utils/readAndWriteDataFile');

const tokenGenerator = require('./utils/tokenGenerator');
const loginValid = require('./middlewares/loginValid');
const tokenValid = require('./middlewares/tokenValid');
const nameValid = require('./middlewares/nameValid');
const ageValid = require('./middlewares/ageValid');
const talkValid = require('./middlewares/talkValid');
const talkWatchedValid = require('./middlewares/talkWatchedValid');
const talkRateValid = require('./middlewares/talkRateValid');
const talkRateQueryValid = require('./middlewares/talkRateQueryValid');
const talkDateQueryValid = require('./middlewares/talkDateQueryValid');
const rateValid = require('./middlewares/rateValid');
const { select } = require('./db/talkerDB');
const editObject = require('./utils/editeObject');

const talkerJson = path.resolve(__dirname, './talker.json');

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
    const data = await readDataFile(talkerJson);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ messsage: 'Deu algum erro aqui' });
  }
});

app.get('/talker/search', tokenValid, talkRateQueryValid, talkDateQueryValid, async (req, res) => {
  const { q, rate, date } = req.query;
  const data = await readDataFile(talkerJson);
  let filteredData = data;
  if (q) {
    filteredData = data.filter((d) => d.name.includes(q));
  }
  if (rate) {
    filteredData = filteredData.filter((d) => d.talk.rate === +rate);
  }
  if (date) {
    filteredData = filteredData.filter((d) => d.talk.watchedAt === date);
  }
  res.status(200).json(filteredData);
});

app.get('/talker/db', async (req, res) => {
  try {
    const [data] = await select();
    const organizedData = data.map((d) => editObject(d));
    res.status(200).json(organizedData);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await readDataFile(talkerJson);
    const findId = data.find((d) => d.id === Number(id));
    if (!findId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(findId);
  } catch (error) {
    res.status(500).json({ message: 'Deu algum erro aqui' });
  }
});

app.post('/login', loginValid, (req, res) => {
  const { email, password } = req.body;
  const token = tokenGenerator();
  const user = { email, password, token };
  res.status(200).json(user);
});

app.post('/talker',
  tokenValid,
  nameValid,
  ageValid,
  talkValid,
  talkWatchedValid,
  talkRateValid,
  async (req, res) => {
  const { name, age, talk } = req.body;
  const data = await readDataFile(talkerJson);
  const id = data[data.length - 1].id + 1;
  const newTalker = { id, name, age, talk };
  const allTalkers = [...data, newTalker];
  await writeDataFile(talkerJson, allTalkers);
  return res.status(201).json(newTalker);
});

app.put('/talker/:id', 
  tokenValid,
  nameValid,
  ageValid,
  talkValid,
  talkWatchedValid,
  talkRateValid,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const data = await readDataFile(talkerJson);
    const index = data.findIndex((d) => d.id === Number(id));
    if (!data[index]) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    data[index] = { id: Number(id), name, age, talk };
    await writeDataFile(talkerJson, data);
    res.status(200).json(data[index]);
});

app.delete('/talker/:id', tokenValid, async (req, res) => {
  const { id } = req.params;
  const data = await readDataFile(talkerJson);
  const filteredData = data.filter((d) => d.id !== Number(id));
  await writeDataFile(talkerJson, filteredData);
  res.sendStatus(204);
});

app.patch('/talker/rate/:id', tokenValid, rateValid, async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  const data = await readDataFile(talkerJson);
  const index = data.findIndex((d) => d.id === +id);
  data[index].talk.rate = rate;
  await writeDataFile(talkerJson, data);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`${PORT} Uma oddiseia no espaço`);
});
