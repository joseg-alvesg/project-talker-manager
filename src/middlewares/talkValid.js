const { reqFieldMessage } = require('../utils/helpers');

module.exports = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) return res.status(400).json(reqFieldMessage('talk'));
  if (!talk.watchedAt) {
    return res.status(400).json(reqFieldMessage('watchedAt'));
  }
  next();
};