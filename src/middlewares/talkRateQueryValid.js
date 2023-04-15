module.exports = (req, res, next) => {
  const { rate } = req.query;
    if (rate && (rate < 1 || rate > 5 || !Number.isInteger(+rate))) {
      return res.status(400)
        .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
  next();
};