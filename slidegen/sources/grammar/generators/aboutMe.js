const grammar = require("../grammar");

function aboutMe() {
  return grammar.flatten("#aboutMe#");
}

module.exports = {
  aboutMe
};
