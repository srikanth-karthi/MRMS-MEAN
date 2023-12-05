var jwt = require('jsonwebtoken');
var secretKey = 'your_secret_key';

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
