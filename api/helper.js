function isLetter(str) {
  var objRegExp  = /^[a-z\u00C0-\u00ff]+$/;
  return objRegExp.test(str);
}
function isEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
module.exports = {
    isLetter,
    isEmail
}