const tracery = require("tracery-grammar");

// grammar sets
const corpora = require("./corpora/corpora");
const aboutMe = require("./composites/aboutMe");
const chartText = require("./composites/chartText");
const jargon = require("./composites/jargon");
const speech = require("./composites/speech");
const specificNounSets = require("./composites/specificNounSets");
const specificVerbSets = require("./composites/specificVerbSets");
const specificAdjectiveSets = require("./composites/specificAdjectiveSets");
const specificModifierSets = require("./composites/specificModifierSets");
const utility = require("./composites/utility");

// TODO ensure all these are not undefined somehow
// TODO separate NSFW things
const grammarSpec = {
  ...corpora,

  ...aboutMe,
  ...chartText,
  ...speech,

  ...specificNounSets,
  ...specificVerbSets,
  ...specificAdjectiveSets,
  ...specificModifierSets,
  ...utility,
  ...jargon
};
const grammar = tracery.createGrammar(grammarSpec);

grammar.addModifiers(tracery.baseEngModifiers);
grammar.addModifiers({
  ing(s) {
    if (s.match(/[aeiou][^0-9aeiou]$/gi)) {
      return s.replace(/(\w)$/, "$1$1ing");
    } else {
      return s.replace(/e?$/, "ing");
    }
  },
  lowercase(s) {
    return s.toLowerCase();
  }
});

// function test(grammarName) {
//   for (let i = 0; i < 10; i++) {
//     console.log(grammar.flatten(grammarName));
//   }
// }

module.exports = grammar;
