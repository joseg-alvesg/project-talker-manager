const express = require('express');

const tokenGenerator = require('../utils/tokenGenerator');

const loginValid = require('../middlewares/loginValid');

const router = express.Router();

router.post('/', loginValid, (req, res) => {
  const { email, password } = req.body;
  const token = tokenGenerator();
  const user = { email, password, token };
  res.status(200).json({ token: user.token });
});

module.exports = router;