const { IS_FORMATE_DATE } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { date } = req.query;
  if (date && !IS_FORMATE_DATE.test(date)) {
    return res.status(400).json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};