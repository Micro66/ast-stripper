const { stripMethodBodies, getLanguageAndQuery } = require('./strip-method-bodies');

function isLanguageSupported(filePath) {
  try {
    getLanguageAndQuery(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  stripMethodBodies,
  isLanguageSupported
};