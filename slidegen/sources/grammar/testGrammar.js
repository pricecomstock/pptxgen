const grammar = require("./grammar");

function testGrammar(testTemplate, numCopies = 5) {
  for (let i = 0; i < numCopies; i++) {
    console.log(`${i + 1}: ${grammar.flatten(testTemplate)}`);
  }
}

testGrammar("#boldClaim#");

module.exports = testGrammar;
