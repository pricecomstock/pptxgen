const tracery = require("tracery-grammar");
const corpora = require("./corpora/corpora.js");

// TODO ensure all these are not undefined somehow
const grammar = tracery.createGrammar({
  animal: corpora.animals,
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
  city: corpora.usCities,
  country: corpora.countries,
  car: corpora.cars,
  dogName: corpora.dogNames,
  charity: corpora.charities,
  characterType: corpora.characterTypes,
  lifeEvent: corpora.eventTypes,
  artType: corpora.artIsms,
  iabCategory: corpora.iabCategories,
  industry: corpora.industries,
  academicSubject: corpora.academicSubjects,
  company: corpora.companies,
  organization: ["#charity#", "#company#", "Big #industry.capitalizeAll#"],
  occupation: corpora.occupations,
  field: ["#iabCategory#", "#industry#", "#academicSubject#"],
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
  opinionTarget: ["#field#", "#artType#", "#occupation.s#", "#charity#", "#lifeEvent#"],

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

  qualification: ["#occupation.capitalizeAll# for #organization#"],

  funFact: [
    "has a pet #petAnimal# named #dogName#",
    "befriended #animal.a# named #dogName#",
    "#opinion# #opinionTarget#",
    "drives a #car#"
  ],

  origin: ["originally from #city#"],

  expertStatement: ["#expertPreposition.capitalize# #field#"],

  aboutMe: ["#expertStatement#", "#qualification#", "#funFact#", "#origin#"]
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

module.exports = {
    aboutMe
}
