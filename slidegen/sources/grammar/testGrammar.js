const grammar = require("./grammar");

const timeout = 5000;

function testGrammar(testTemplate, numCopies = 5, filter = () => true) {
  const endTime = Date.now() + timeout;
  const samples = [];

  while (samples.length < numCopies && Date.now() < endTime) {
    const sample = grammar.flatten(testTemplate);
    if (filter(sample)) {
      samples.push(sample);
    }
  }

  samples.forEach((s, i) => {
    console.log(`${i + 1}: ${s}`);
  });
}

// const filter = (s) => /can be/gi.test(s);
const filter = () => true;
testGrammar("#boldClaim#", 8, filter);

module.exports = testGrammar;
