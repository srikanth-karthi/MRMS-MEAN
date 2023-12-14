var jwt = require('jsonwebtoken');
require("dotenv").config();

const secretKey = process.env.secretKey

var decodeToken = function(token) {
  if(!token) return 'tokenis required'
  return new Promise(function(resolve, reject) {
    jwt.verify(token, secretKey, function(err, decoded) {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = {
  decodeToken: decodeToken
};
