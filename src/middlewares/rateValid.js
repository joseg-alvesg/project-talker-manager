const { inBetween, reqFieldMessage } = require('../utils/helpers');

module.exports = (req, res, next) => {
  const { rate } = req.body;
  if (rate === undefined) {
    return res.status(400).json(reqFieldMessage('rate'));
  }
  if (!inBetween(rate, 1, 5) || !Number.isInteger(rate)) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  next();
};