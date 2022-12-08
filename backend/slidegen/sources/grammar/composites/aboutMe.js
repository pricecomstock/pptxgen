const aboutMe = {
  expertPreposition: [
    "expert in",
    "master of",
    "Ph.D. in",
    "master's degree in",
    "bachelor's degree in",
    "associate's degree in",
    "certified in",
    "enjoys",
    "#characterType# of",
  ],
  qualification: [
    "#occupation.capitalizeAll# for #organization#",
    "#expertStatement#",
    "#integer35# years of experience in #field#",
  ],
  opinionPhrase: [
    "#opinionVerb# #opinionTarget#",
    "#opinionTarget# makes me #mood#",
  ],

  nickname: [
    "#honorific# #field.capitalizeAll#",
    "#honorific# #mood.capitalizeAll#",
    "#honorific# #iabCategory#",
  ],

  nicknameStatement: [
    'you can call me "#nickname#"',
    'I\'ve been called "#nickname#"',
    'given the nickname "#nickname#"',
  ],

  funFact: [
    "has a pet #petAnimal# named #dogName#",
    "befriended #animal.a# named #dogName#",
    "drives #car.a#",
    "#opinionPhrase#",
    "survived #environmentalHazard.a#",
    "#nicknameStatement#",
    "is capable of performing #fightingMove.a#",
    "most prized possession is #object.a#",
    "spent a lot of time in my #room#",
    "grew up in a #naturalMaterial# hut",
    "always wearing at least one item made of #technicalFabric#",
    "#severityModifier# #stateOfInebriation# #currentTimeModifier#",
    "#sportsTeam# fan",
    "played #sportLevel# #sport# competitively",
  ],

  originVerb: ["originally from", "grew up in", "lived in"],
  origin: ["#originVerb# #city#", "#originVerb# #country#"],
  expertStatement: ["#expertPreposition.capitalize# #field#"],

  aboutMe: [
    "#expertStatement#",
    "#qualification#",
    "#funFact#",
    "#origin#",
    "#nicknameStatement#",
  ],
};

module.exports = aboutMe;
