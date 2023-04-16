const { inBetween, reqFieldMessage } = require('../utils/helpers');

module.exports = (req, res, next) => {
  const { talk } = req.body;
  if (talk.rate === undefined) {
    return res.status(400).json(reqFieldMessage('rate'));
  }
  if (!inBetween(talk.rate, 1, 5) || !Number.isInteger(talk.rate)) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};