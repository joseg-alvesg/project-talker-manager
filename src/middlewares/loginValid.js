module.exports = (req, res, next) => {
  const { email, password } = req.body;
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const validEmail = regex.test(email);
  
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!validEmail) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' }); 

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }
  next();
};