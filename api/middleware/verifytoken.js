var jwtdecoder = require('./jwtdecoder');

var verifyToken = function(req, res, next) {
  var authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  var tokenArray = authorizationHeader.split(' ');
  var bearer = tokenArray[0];
  var token = tokenArray[1];
  
  console.log('Received token:', token); // Log the token for debugging purposes
  
  if (token == null || bearer.toLowerCase() !== 'bearer') {
    return res.status(403).json({ message: 'Invalid token format.' });
  }
  

  jwtdecoder.decodeToken(token)
    .then(function(decoded) {
      req.decoded = decoded;
      next();
    })
    .catch(function(err) {
      // console.error('Token verification error:', err);
      return res.status(401).json({ message: 'Failed to authenticate token.' });
    });
    
};

module.exports = {
  verifyToken: verifyToken
};
