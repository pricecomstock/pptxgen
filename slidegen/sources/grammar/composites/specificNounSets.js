const specificNounSets = {
  organization: [
    "#charity#",
    "#company#",
    "Big #industry.capitalizeAll#",
    "#usGovAgency#",
    "#newspaper#"
  ],

  sportsTeam: [
    "#nflTeam#",
    "#nhlTeam#",
    "#nbaTeam#",
    "#mlbTeam#",
    "#eplTeam#",
    "#laligaTeam#"
  ],

  fightingMove: ["#wrestlingMove#", "#streetFighterMove#"],
  field: [
    "#iabCategory#",
    "#industry#",
    "#academicSubject#",
    "#artType#",
    "#netflixGenre#"
  ],
  opinionTarget: [
    "#field#",
    "#artType#",
    "#occupation.s#",
    "#charity#",
    "#eventType#",
    "#appliance.s#"
  ],
  petAnimal: [
    "dog",
    "cat",
    "fish",
    "iguana",
    "pig",
    "puppy",
    "kitty",
    "rat",
    "mouse",
    "gerbil",
    "hamster",
    "snake",
    "parrot",
    "parakeet",
    "millipede",
    "bunny"
  ],
  authorityFigure: [
    "mother",
    "father",
    "parent",
    "aunt",
    "uncle",
    "grandfather",
    "grandmother",
    "grandparent",
    "teacher",
    "guru",
    "therapist",
    "life coach",
    "#sportLevel# #sport.lowercase# coach",
    "president",
    "prophet"
  ]
};

module.exports = specificNounSets;
