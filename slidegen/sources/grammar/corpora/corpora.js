const fs = require("fs");
const path = require("path");

const basePath = "";

console.time("loaded corpora");

function reduceToNameAndSynonymArray(list) {
  return list.reduce((accumulator, currentItem) => {
    let typeNames = currentItem.synonyms.concat(currentItem.name);
    return accumulator.concat(typeNames);
  }, []);
}

function loadJsonFromCorporaFile(relativeFilePath) {
  return JSON.parse(fs.readFileSync(path.join(__dirname, relativeFilePath)));
}

function flat(array) {
  return array.reduce((accumulator, currentItem) => {
    return accumulator.concat(currentItem);
  }, []);
}

// ANIMALS
const animal = loadJsonFromCorporaFile("animals/common.json").animals;
const dogName = loadJsonFromCorporaFile("animals/dog_names.json").dog_names;

// ARCHETYPES
const charactersJson = loadJsonFromCorporaFile("archetypes/character.json");
const characterType = reduceToNameAndSynonymArray(charactersJson.characters);
const characterQuality = charactersJson.characters.reduce(
  (accumulator, currentCharacter) => {
    return accumulator.concat(currentCharacter.qualities);
  },
  []
);

const eventsJson = loadJsonFromCorporaFile("archetypes/event.json");
const eventType = reduceToNameAndSynonymArray(eventsJson.events);

const settingJson = loadJsonFromCorporaFile("archetypes/setting.json");
const settingType = reduceToNameAndSynonymArray(settingJson.settings);

// ARCHITECTURE
const passage = loadJsonFromCorporaFile("architecture/passages.json").passages;
const room = loadJsonFromCorporaFile("architecture/rooms.json").rooms;

// ART
const artType = loadJsonFromCorporaFile("art/isms.json").isms;

// ACADEMIC
const academicSubject = loadJsonFromCorporaFile("books/academic_subjects.json")
  .subjects;

// CORPORATE
const car = loadJsonFromCorporaFile("corporations/cars.json").cars;
const charity = loadJsonFromCorporaFile("corporations/charities.json")
  .charities;
const company = loadJsonFromCorporaFile("corporations/fortune500.json")
  .companies;
const industry = loadJsonFromCorporaFile("corporations/industries.json")
  .industries;
const newspaper = loadJsonFromCorporaFile("corporations/newspapers.json")
  .newspapers;

// TAROT
const tarotJson = loadJsonFromCorporaFile(
  "divination/tarot_interpretations.json"
);
const tarotMeaning = tarotJson.tarot_interpretations.reduce(
  (accumulator, currentItem) => {
    return accumulator
      .concat(currentItem.meanings.light)
      .concat(currentItem.meanings.shadow);
  },
  []
);
const tarotFortune = tarotJson.tarot_interpretations.reduce(
  (accumulator, currentItem) => {
    return accumulator.concat(currentItem.fortune_telling);
  },
  []
);

// FILM & TV
const iabCategory = loadJsonFromCorporaFile(
  "film-tv/iab_categories.json"
).iab.map(category => category.category_name);
const netflixGenre = loadJsonFromCorporaFile("film-tv/netflix-categories.json")
  .categories;

// GAMES
const streetFighterMove = loadJsonFromCorporaFile(
  "games/street_fighter_ii.json"
).characters.reduce((accumulator, currentItem) => {
  return accumulator.concat(currentItem.moves);
}, []);
const wrestlingMove = loadJsonFromCorporaFile("games/wrestling_moves.json")
  .moves;

// GEOGRAPHY
const country = loadJsonFromCorporaFile("geography/countries.json").countries;
const environmentalHazard = loadJsonFromCorporaFile(
  "geography/environmental_hazards.json"
).entries;
const city = loadJsonFromCorporaFile("geography/us_cities.json").cities.map(
  city => {
    return `${city.city}, ${city.state}`;
  }
);

// GOVERNMENT
const usGovAgency = loadJsonFromCorporaFile(
  "governments/us_federal_agencies.json"
).agencies;

// HUMANS
const occupation = loadJsonFromCorporaFile("humans/occupations.json")
  .occupations;
const mood = loadJsonFromCorporaFile("humans/moods.json").moods;
const humanAdjective = loadJsonFromCorporaFile("humans/descriptions.json")
  .descriptions;
const humanPrefix = loadJsonFromCorporaFile("humans/prefixes.json").prefixes;
const honorific = loadJsonFromCorporaFile("humans/englishHonorifics.json")
  .englishHonorifics;

// MATERIALS
const bodyFluid = loadJsonFromCorporaFile(
  "materials/abridged-body-fluids.json"
)["abridged body fluids"];
const buildingMaterial = loadJsonFromCorporaFile(
  "materials/building-materials.json"
)["building materials"];
const gemstone = loadJsonFromCorporaFile("materials/gemstones.json").gemstones;
const layMetal = loadJsonFromCorporaFile("materials/layperson-metals.json")[
  "layperson metals"
];
const naturalMaterial = loadJsonFromCorporaFile(
  "materials/natural-materials.json"
)["natural materials"];
const technicalFabric = loadJsonFromCorporaFile(
  "materials/technical-fabrics.json"
)["technical fabrics"];

// MATH
const primeNumber = loadJsonFromCorporaFile("mathematics/primes.json").primes;

// MEDICINE
const disease = flat(
  loadJsonFromCorporaFile("medicine/diseases.json").diseases
);
const infectiousDisease = loadJsonFromCorporaFile(
  "medicine/infectious_diseases.json"
).diseases;
const drug = loadJsonFromCorporaFile("medicine/drugs.json").drugs;
const hospital = loadJsonFromCorporaFile("medicine/hospitals.json").hospitals;
const symptom = loadJsonFromCorporaFile("medicine/symptoms.json").symptoms;

// MUSIC
const musicGenre = loadJsonFromCorporaFile("music/genres.json").genres;
const instrument = loadJsonFromCorporaFile("music/instruments.json")
  .instruments;

// MYTHOLOGY
const greekGod = loadJsonFromCorporaFile("mythology/greek_gods.json")
  .greek_gods;
const greekTitan = loadJsonFromCorporaFile("mythology/greek_titans.json")
  .greek_titans;
const monster = loadJsonFromCorporaFile("mythology/monsters.json").names;

const allNorseGods = loadJsonFromCorporaFile("mythology/norse_gods.json")
  .norse_deities;
const norseGod = allNorseGods.gods.concat(allNorseGods.goddesses);

const lovecraftJson = loadJsonFromCorporaFile("mythology/lovecraft.json");
const lovecraftDeity = lovecraftJson.deities;
const lovecraftCreature = lovecraftJson.supernatural_creatures;

// OBJECTS
const object = loadJsonFromCorporaFile("objects/objects.json").objects;
const clothing = loadJsonFromCorporaFile("objects/clothing.json").clothes;

// PLANTS
const cannabisStrain = loadJsonFromCorporaFile("plants/cannabis.json").cannabis;
const plant = loadJsonFromCorporaFile("plants/plants.json").instruments.map(
  p => p.name
);
const flower = loadJsonFromCorporaFile("plants/flowers.json").flowers;

// SCIENCE
const elements = loadJsonFromCorporaFile("science/elements.json").elements.map(
  e => e.name
);
const toxicChemicalJson = loadJsonFromCorporaFile(
  "science/toxic_chemicals.json"
);
const toxicChemical = toxicChemicalJson.chemicals.concat(
  toxicChemicalJson.gases
);
const weatherCondition = loadJsonFromCorporaFile(
  "science/weather_conditions.json"
).conditions;
const sizeComparisonFruit = loadJsonFromCorporaFile(
  "science/pregnancy.json"
).pregnancy.map(p => p.fruit);

// SPORTS
const sport = loadJsonFromCorporaFile("sports/sports.json").sports;
const nflTeam = loadJsonFromCorporaFile("sports/nfl_teams.json").nfl_teams.map(
  t => t.name
);
const nhlTeam = loadJsonFromCorporaFile("sports/nhl_teams.json").nhl_teams.map(
  t => t.name
);
const nbaTeam = loadJsonFromCorporaFile("sports/nba_teams.json").nba_teams.map(
  t => t.name
);
const mlbTeam = loadJsonFromCorporaFile("sports/mlb_teams.json").mlb_teams.map(
  t => t.name
);
const eplTeam = loadJsonFromCorporaFile(
  "sports/football/epl_teams.json"
).epl_teams.map(t => t.name);
const laligaTeam = loadJsonFromCorporaFile(
  "sports/football/laliga_teams.json"
).laLiga_teams.map(t => t.name);

// TECHNOLOGY
const programmingLanguage = loadJsonFromCorporaFile(
  "technology/programming_languages.json"
);
const newTechnology = loadJsonFromCorporaFile(
  "technology/new_technologies.json"
).technologies;
const knot = loadJsonFromCorporaFile("technology/knots.json").knots;
const computerTechnology = loadJsonFromCorporaFile(
  "technology/computer_sciences.json"
).computer_sciences;
const appliance = loadJsonFromCorporaFile("technology/appliances.json")
  .appliances;

// WORDS - LITERATURE
const shakespeareSonnet = flat(
  loadJsonFromCorporaFile(
    "words/literature/shakespeare_sonnets.json"
  ).sonnets.map(s => s.lines)
);
const shakespearePhrase = loadJsonFromCorporaFile(
  "words/literature/shakespeare_phrases.json"
).phrasess; // sic
const lovecraftWord = loadJsonFromCorporaFile(
  "words/literature/lovecraft_words.json"
).words;

// WORDS - GENERAL
const emoji = loadJsonFromCorporaFile("words/emoji/emoji.json").emoji;
const kaomoji = loadJsonFromCorporaFile("words/emoji/cute_kaomoji.json")
  .cuteKaomoji;
const adjective = loadJsonFromCorporaFile("words/adjs.json").adjs;
const adverb = loadJsonFromCorporaFile("words/adverbs.json").adverbs;
const compoundBreakdown = loadJsonFromCorporaFile("words/compounds.json")
  .compounds // TODO standalone "points"
  .map(c => `${c.compoundWord} = ${c.firstWord} + ${c.secondWord}`);
const eggcorn = flat(
  loadJsonFromCorporaFile("words/eggcorns.json").eggcorns.map(e => e.mistakes)
);
const encouragingWord = loadJsonFromCorporaFile("words/encouraging_words.json")
  .encouraging_words; // TODO good for picture captions

const ergativeVerb = loadJsonFromCorporaFile("words/ergative_verbs.json")
  .ergative_verbs;
const infinitiveVerb = loadJsonFromCorporaFile("words/infinitive_verbs.json");
const resumeVerb = loadJsonFromCorporaFile("words/resume_action_words.json")
  .resume_action_words; // TODO combine with nouns for bullshit resume items
const verb = loadJsonFromCorporaFile("words/verbs.json").verbs.map(
  v => v.present
);

const interjection = loadJsonFromCorporaFile("words/interjections.json")
  .interjections;
const noun = loadJsonFromCorporaFile("words/nouns.json").nouns;
const personalNoun = loadJsonFromCorporaFile("words/personal_nouns.json")
  .personalNouns;

const harvardSentence = loadJsonFromCorporaFile("words/harvard_sentences.json")
  .data;
const oprahQuote = loadJsonFromCorporaFile("words/oprah_quotes.json")
  .oprahQuotes;
const proverb = loadJsonFromCorporaFile("words/proverbs.json").proverbs;

const harryPotterSpell = loadJsonFromCorporaFile("words/spells.json").spells;
const stateOfInebriation = loadJsonFromCorporaFile(
  "words/states_of_drunkenness.json"
).states_of_drunkenness;

const corpora = {
  animal,
  dogName,
  characterType,
  characterQuality,
  eventType,
  settingType,
  passage,
  room,
  artType,
  academicSubject,
  car,
  charity,
  company,
  industry,
  newspaper,
  tarotMeaning,
  tarotFortune,
  iabCategory,
  netflixGenre,
  streetFighterMove,
  wrestlingMove,
  country,
  environmentalHazard,
  city,
  usGovAgency,
  occupation,
  mood,
  humanAdjective,
  humanPrefix,
  honorific,
  bodyFluid,
  gemstone,
  buildingMaterial,
  layMetal,
  naturalMaterial,
  technicalFabric,
  primeNumber,
  disease,
  infectiousDisease,
  drug,
  hospital,
  symptom,
  musicGenre,
  instrument,
  greekGod,
  greekTitan,
  norseGod,
  monster,
  lovecraftDeity,
  lovecraftCreature,
  cannabisStrain,
  plant,
  flower,
  elements,
  toxicChemical,
  weatherCondition,
  sizeComparisonFruit,
  sport,
  nflTeam,
  nhlTeam,
  nbaTeam,
  mlbTeam,
  eplTeam,
  laligaTeam,
  programmingLanguage,
  newTechnology,
  knot,
  computerTechnology,
  appliance,
  shakespeareSonnet,
  shakespearePhrase,
  lovecraftWord,
  emoji,
  kaomoji,
  adjective,
  adverb,
  compoundBreakdown,
  eggcorn,
  encouragingWord,
  ergativeVerb,
  infinitiveVerb,
  resumeVerb,
  verb,
  interjection,
  noun,
  personalNoun,
  harvardSentence,
  oprahQuote,
  proverb,
  harryPotterSpell,
  stateOfInebriation,

  object,
  clothing
};

// Check to make sure I didn't mess anything up in the incredibly clumsy process above
for (const key in corpora) {
  if (corpora.hasOwnProperty(key)) {
    if (corpora[key] == undefined) {
      throw ReferenceError(`corpora.${key} is null`);
    }
  }
}

console.timeEnd("loaded corpora");

module.exports = corpora;
