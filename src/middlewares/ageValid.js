const { reqFieldMessage } = require('../utils/helpers');

module.exports = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(400).json(reqFieldMessage('age'));
  if (!Number.isInteger(age) || age < 18) {
    return res.status(400)
      .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }
  next();
};