const grammar = require("../grammar");

function generateJargonPhrase() {
  return grammar.flatten("#jargon#");
}

function generateShortJargonPhrase() {
  return grammar.flatten("#shortJargon#");
}

module.exports = {
  generateJargonPhrase,
  generateShortJargonPhrase
};
