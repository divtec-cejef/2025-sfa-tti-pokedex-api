const jwt = require('jsonwebtoken');
const SECRET_KEY = 'pokedex-secret-key';

exports.generateToken = function (payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
};
