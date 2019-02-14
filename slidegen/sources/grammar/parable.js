const tracery = require("tracery-grammar");

const grammar = tracery.createGrammar({
  storyType: [
      "parable",
      "story",
      "tale",
      ""
  ],
  preposition: [
      "of",
      "about",
      "regarding",
  ],
  
});

grammar.addModifiers(tracery.baseEngModifiers);
grammar.addModifiers({
  ing(s) {
    // Add -ing, replacing "e" if the word ends in it
    return s.replace(/e?$/, "ing");
  }
});

console.log(grammar.flatten("#genericContinue#"))