const grammar = require("../grammar");

function boldClaim() {
  return grammar.flatten("#boldClaim#");
}

module.exports = {
  boldClaim: boldClaim,
};
