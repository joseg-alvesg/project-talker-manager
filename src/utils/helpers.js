const inBetween = (num, min, max) => num >= min && num <= max;
const reqFieldMessage = (field) => ({ message: `O campo "${field}" é obrigatório` });

module.exports = {
  inBetween,
  reqFieldMessage,
};