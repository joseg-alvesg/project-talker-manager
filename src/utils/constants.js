const IS_FORMATE_DATE = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
const IS_FORMATE_EMAIL = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

module.exports = {
  IS_FORMATE_DATE,
  IS_FORMATE_EMAIL,
};