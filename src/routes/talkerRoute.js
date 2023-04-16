const express = require('express');
const path = require('path');

const { readDataFile, writeDataFile } = require('../utils/readAndWriteDataFile');
const editObject = require('../utils/editeObject');

const { select } = require('../db/talkerDB');

const tokenValid = require('../middlewares/tokenValid');
const nameValid = require('../middlewares/nameValid');
const ageValid = require('../middlewares/ageValid');
const talkValid = require('../middlewares/talkValid');
const talkWatchedValid = require('../middlewares/talkWatchedValid');
const talkRateValid = require('../middlewares/talkRateValid');
const talkRateQueryValid = require('../middlewares/talkRateQueryValid');
const talkDateQueryValid = require('../middlewares/talkDateQueryValid');
const rateValid = require('../middlewares/rateValid');

const talkerJson = path.resolve(__dirname, '../talker.json');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await readDataFile(talkerJson);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ messsage: 'Erro no get /talker' });
  }
});

router.get('/search',
  tokenValid,
  talkRateQueryValid,
  talkDateQueryValid,
  async (req, res) => {
  try {
    const { q, rate, date } = req.query;
    const data = await readDataFile(talkerJson);
    let filteredData = data;
    if (q) filteredData = data.filter((d) => d.name.includes(q));
    if (rate) filteredData = filteredData.filter((d) => d.talk.rate === +rate);
    if (date) filteredData = filteredData.filter((d) => d.talk.watchedAt === date);
    res.status(200).json(filteredData);
  } catch (error) {
    res.status(500).json({ message: 'Erro no get /search' });
  }
});

router.get('/db', async (req, res) => {
  try {
    const [data] = await select();
    const organizedData = data.map((d) => editObject(d));
    res.status(200).json(organizedData);
  } catch (err) {
    res.status(500).json({ message: 'Erro no get /db' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await readDataFile(talkerJson);
    const findId = data.find((d) => d.id === Number(id));
    if (!findId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(findId);
  } catch (error) {
    res.status(500).json({ message: 'Erro no get /:id' });
  }
});

router.post('/',
  tokenValid,
  nameValid,
  ageValid,
  talkValid,
  talkWatchedValid,
  talkRateValid,
  async (req, res) => {
    try {
      const { name, age, talk } = req.body;
      const data = await readDataFile(talkerJson);
      const id = data[data.length - 1].id + 1;
      const newTalker = { id, name, age, talk };
      const allTalkers = [...data, newTalker];
      await writeDataFile(talkerJson, allTalkers);
      return res.status(201).json(newTalker);
    } catch (error) {
      res.status(500).json({ message: 'Erro no post /talker' });
    }
});

router.put('/:id', 
  tokenValid,
  nameValid,
  ageValid,
  talkValid,
  talkWatchedValid,
  talkRateValid,
  async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const data = await readDataFile(talkerJson);
    const index = data.findIndex((d) => d.id === Number(id));
    if (!data[index]) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    data[index] = { id: Number(id), name, age, talk };
    await writeDataFile(talkerJson, data);
    res.status(200).json(data[index]);
  } catch (error) {
    res.status(500).json({ message: 'Erro no put /:id' });
  }
});

router.delete('/:id', tokenValid, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await readDataFile(talkerJson);
    const filteredData = data.filter((d) => d.id !== Number(id));
    await writeDataFile(talkerJson, filteredData);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Erro no delete /:id' });
  }
});

router.patch('/rate/:id', tokenValid, rateValid, async (req, res) => {
  try {
    const { id } = req.params;
    const { rate } = req.body;
    const data = await readDataFile(talkerJson);
    const index = data.findIndex((d) => d.id === +id);
    data[index].talk.rate = rate;
    await writeDataFile(talkerJson, data);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Erro no patch /rate/:id' });
  }
});

module.exports = router;