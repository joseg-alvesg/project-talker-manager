const { reqFieldMessage } = require('../utils/helpers');

module.exports = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json(reqFieldMessage('name'));
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};