const jwt = require('jsonwebtoken');


exports.isLetter = (str) => {
  const objRegExp = /^[a-z\u00C0-\u00ff]+$/;
  return objRegExp.test(str);
};
exports.isEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
exports.signToken = (result) => {
  const token = jwt.sign({ id: result.id, role: result.role }, process.env.SECRET, {
    expiresIn: 86400000000,
  });
  return token;
};
