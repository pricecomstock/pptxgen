const tracery = require("tracery-grammar");
const { isPlural, isSingular, plural, singular } = require("pluralize");

// grammar sets
const corpora = require("./corpora");
const aboutMe = require("./composites/aboutMe");
const chartText = require("./composites/chartText");
const jargon = require("./composites/jargon");
const speech = require("./composites/speech");
const specificNounSets = require("./composites/specificNounSets");
const specificVerbSets = require("./composites/specificVerbSets");
const specificAdjectiveSets = require("./composites/specificAdjectiveSets");
const specificModifierSets = require("./composites/specificModifierSets");
const utility = require("./composites/utility");
const boldClaims = require("./composites/boldClaims");

// TODO ensure all these are not undefined somehow
// TODO separate NSFW things
const grammarSpec = {
  ...corpora,

  ...aboutMe,
  ...boldClaims,
  ...chartText,
  ...speech,

  ...specificNounSets,
  ...specificVerbSets,
  ...specificAdjectiveSets,
  ...specificModifierSets,
  ...utility,
  ...jargon,
};

export const grammar = tracery.createGrammar(grammarSpec);

grammar.addModifiers(tracery.baseEngModifiers);
grammar.addModifiers({
  ing(s) {
    if (s.match(/[wl]$/gi)) {
      // Some ending letters just get -ing, regardless of previous vowel
      return `${s}ing`;
    } else if (s.match(/[aeiou][^0-9aeiou]$/gi)) {
      // Most letters preceded by a vowel double
      return s.replace(/(\w)$/, "$1$1ing");
    } else {
      // Add -ing, replacing e if it's there
      return s.replace(/e?$/, "ing");
    }
  },
  lowercase(s) {
    return s.toLowerCase();
  },
  is(s) {
    return `${s} ${isPlural(s) ? "are" : "is"}`;
  },
  was(s) {
    return `${s} ${isPlural(s) ? "were" : "was"}`;
  },

  noArticle(s) {
    const words = tokenize(s);
    if (["a", "an", "the"].includes(words[0])) {
      return words.slice(1).join(" ");
    } else {
      return s;
    }
  },

  singularize: (phrase) => applyToPrepositionPhrase(phrase, singular),
  pluralize: (phrase) => applyToPrepositionPhrase(phrase, plural),
});

function tokenize(s) {
  return s.split(/\s+/);
}

function applyToPrepositionPhrase(phrase, fn) {
  const prepositionMatch = /(\w.*)\s(of|from|at|with|for|to)(.*)/;
  const match = phrase.match(prepositionMatch);
  if (!match) return fn(phrase);

  const [
    _whole = "",
    prePreposition = "",
    preposition = "",
    postPreposition = "",
  ] = match;

  return `${fn(prePreposition)} ${preposition}${postPreposition}`;
}

module.exports = grammar;
