const tracery = require("tracery-grammar");

const grammar = tracery.createGrammar({
  exploreVerb: [
    "go deeper",
    "explore further",
    "learn more",
    "continue",
    "take a closer look"
  ],
  verbSubject: ["let's", "we must", "time to"],

  genericContinue: ["#verbSubject# #exploreVerb#"]
});

grammar.addModifiers(tracery.baseEngModifiers);
grammar.addModifiers({
  ing(s) {
    // Add -ing, replacing "e" if the word ends in it
    return s.replace(/e?$/, "ing");
  }
});

console.log(grammar.flatten("#genericContinue#"));
