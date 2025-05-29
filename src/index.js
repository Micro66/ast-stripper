const { stripMethodBodies, getLanguageAndQuery, stripMethodBodiesFromContent } = require('./strip-method-bodies');

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
    stripMethodBodiesFromContent,
    isLanguageSupported
};