const { IS_FORMATE_DATE } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { talk } = req.body;
  if (!IS_FORMATE_DATE.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};