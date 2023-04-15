const conn = require('./connections');

const select = () => conn.execute(
  'SELECT * FROM talkers',
);

module.exports = {
  select,
};