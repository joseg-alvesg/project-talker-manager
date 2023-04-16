const { IS_FORMATE_EMAIL } = require('../utils/constants');
const { reqFieldMessage } = require('../utils/helpers');

module.exports = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email) return res.status(400).json(reqFieldMessage('email'));
  if (!IS_FORMATE_EMAIL.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  }
  if (!password) return res.status(400).json(reqFieldMessage('password')); 

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }
  next();
};