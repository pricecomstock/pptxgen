const tracery = require("tracery-grammar");

const grammar = tracery.createGrammar({
  simpleSubject: ["boy", "girl", "man", "woman", "child", "dog"],
  fullSubject: ["some old guy"],
  somberVerb: ["did it", "paid for it", "failed", "fucked up", "lost sight"]
});

grammar.addModifiers(tracery.baseEngModifiers);
grammar.addModifiers({
  ing(s) {
    // Add -ing, replacing "e" if the word ends in it
    return s.replace(/e?$/, "ing");
  }
});
