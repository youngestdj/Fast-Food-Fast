const jwt = require('jsonwebtoken');

exports.verifyToken = (request, response, next) => {
  const token = request.headers['x-access-token'] || request.body.token || request.query.token;
  if (!token) {
    return response.status(401).json({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token, process.env.TRAVIS_FFF_TOKEN, (err, decoded) => {
    if (err) {
      return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    }
    request.userId = decoded.id;
    request.role = decoded.role;
    next();
  });
};
