const tracery = require("tracery-grammar");
const corpora = require("./corpora/corpora.js");

// TODO ensure all these are not undefined somehow
// TODO separate NSFW things into a different file and use spread syntax ...obj to overwrite into a second nsfw_corpora maybe?
const grammar = tracery.createGrammar({
  ... corpora,

  petAnimal: [
    "dog",
    "cat",
    "parrot",
    "fish",
    "ferret",
    "snake",
    "gerbil",
    "rat"
  ],
  organization: [
    "#charity#",
    "#company#",
    "#company# and #charity#",
    "#company# and #company#",
    "#charity# and #company#",
    "Big #industry.capitalizeAll#",
    "#usGovAgency#",
    "#newspaper#"
  ],
  fightingMove: ["#wrestlingMove#", "#streetFighterMove#"],
  field: ["#iabCategory#", "#industry#", "#academicSubject#", "#artType#"],
  opinion: [
    "likes",
    "doesn't like",
    "doesn't care for",
    "loves",
    "feels weird about",
    "needs",
    "I don't understand",
    "I don't see the need for",
    "really enjoys"
  ],
  opinionTarget: [
    "#field#",
    "#artType#",
    "#occupation.s#",
    "#charity#",
    "#lifeEvent#"
  ],

  expertPreposition: [
    "expert in",
    "master of",
    "Ph.D. in",
    "master's degree in",
    "bachelor's degree in",
    "associate's degree in",
    "certified in",
    "enjoys",
    "#characterType# of"
  ],

  qualification: [
    "#occupation.capitalizeAll# for #organization#",
    "#expertStatement#",
    "#integer# years of experience in #field"
  ],
  opinion: ["#opinion# #opinionTarget#", "#opinionTarget# makes me #mood#"],

  nickname: [
    "#honorific# #field.capitalizeAll#",
    "#honorific# #mood.capitalizeAll#",
    "#honorific# #iabCategory#"
  ],
  nicknameStatement: [
    'you can call me "#nickname#"',
    'I\'ve been called "#nickname#"',
    'given the nickname "#nickname#"'
  ],

  integer35: Array(35).fill().map( (_v, i) => i.toString() ),
  integer100: Array(100).fill().map( (_v, i) => i.toString() ),

  funFact: [
    "has a pet #petAnimal# named #dogName#",
    "befriended #animal.a# named #dogName#",
    "drives #car.a#",
    "#opinion#",
    "survived #environmentalHazard.a#",
    "#nicknameStatement#",
    "is capable of performing #fightingMove.a#",
    "most prized possession is #object.a#",
    "spent a lot of time in my #room#",
    "grew up in a #naturalMaterial# hut",
    "always wearing at least one item made of #technicalFabric#"
  ],

  originVerb: ["originally from", "grew up in", "lived in"],
  origin: ["#originVerb# #city#", "#originVerb# #country#"],

  expertStatement: ["#expertPreposition.capitalize# #field#"],

  aboutMe: [
    "#expertStatement#",
    "#qualification#",
    "#funFact#",
    "#origin#",
    "#nicknameStatement#"
  ]
});

grammar.addModifiers(tracery.baseEngModifiers);
grammar.addModifiers({
  ing(s) {
    // Add -ing, replacing "e" if the word ends in it
    return s.replace(/e?$/, "ing");
  }
});

function aboutMe() {
  return grammar.flatten("#aboutMe#");
}

function test(grammarName) {
  for (let i = 0; i < 10; i++) {
    console.log(grammar.flatten(grammarName));
  }
}
// console.log(grammar.integer)
// test("always wearing at least one item made of #technicalFabric#")

module.exports = {
  aboutMe
};
