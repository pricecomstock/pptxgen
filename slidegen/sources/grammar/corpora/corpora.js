const fs = require('fs')
const path = require('path')

const basePath = ""

console.time("loaded corpora");

function reduceToNameAndSynonymArray(list) {
    return list.reduce( (accumulator, currentItem) => {
        let typeNames = currentItem.synonyms.concat(currentItem.name)
        return accumulator.concat(typeNames)
    }, []);
}

function loadJsonFromCorporaFile(relativeFilePath) {
    return JSON.parse(fs.readFileSync(path.join(__dirname, relativeFilePath)))
}

// ANIMALS
const animal = loadJsonFromCorporaFile("animals/common.json").animals;
const dogName = loadJsonFromCorporaFile("animals/dog_names.json").dog_names;

// ARCHETYPES
const charactersJson = loadJsonFromCorporaFile("archetypes/character.json");
const characterType = reduceToNameAndSynonymArray(charactersJson.characters)
const characterQuality = charactersJson.characters.reduce( (accumulator, currentCharacter) => {
    return accumulator.concat(currentCharacter.qualities);
}, []);

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
const academicSubject = loadJsonFromCorporaFile("books/academic_subjects.json").subjects;

// CORPORATE
const car = loadJsonFromCorporaFile("corporations/cars.json").cars;
const charity = loadJsonFromCorporaFile("corporations/charities.json").charities;
const company = loadJsonFromCorporaFile("corporations/fortune500.json").companies;
const industry = loadJsonFromCorporaFile("corporations/industries.json").industries;
const newspaper = loadJsonFromCorporaFile("corporations/newspapers.json").newspapers;

// TAROT
const tarotJson = loadJsonFromCorporaFile("divination/tarot_interpretations.json");
const tarotMeaning = tarotJson.tarot_interpretations.reduce( (accumulator, currentItem) => {
        return accumulator.concat(currentItem.meanings.light).concat(currentItem.meanings.shadow)
    }, []);
const tarotFortune = tarotJson.tarot_interpretations.reduce( (accumulator, currentItem) => {
        return accumulator.concat(currentItem.fortune_telling)
    }, []);

// FILM & TV
const iabCategory = loadJsonFromCorporaFile("film-tv/iab_categories.json").iab
    .map( (category) => category.category_name)
const netflixGenre = loadJsonFromCorporaFile("film-tv/netflix-categories.json").categories

// GAMES
const streetFighterMove = loadJsonFromCorporaFile("games/street_fighter_ii.json").characters
.reduce( (accumulator, currentItem) => {
    return accumulator.concat(currentItem.moves);
},[])
const wrestlingMove = loadJsonFromCorporaFile("games/wrestling_moves.json").moves

// GEOGRAPHY
const country = loadJsonFromCorporaFile("geography/countries.json").countries
const environmentalHazard = loadJsonFromCorporaFile("geography/environmental_hazards.json").entries
const city = loadJsonFromCorporaFile("geography/us_cities.json").cities.map( city => {
    return `${city.city}, ${city.state}`
})

// GOVERNMENT
const usGovAgency = loadJsonFromCorporaFile("governments/us_federal_agencies.json").agencies

// HUMANS
const occupation = loadJsonFromCorporaFile("humans/occupations.json").occupations
const mood = loadJsonFromCorporaFile("humans/moods.json").moods
const humanAdjective = loadJsonFromCorporaFile("humans/descriptions.json").descriptions
const humanPrefix = loadJsonFromCorporaFile("humans/prefixes.json").prefixes
const honorific = loadJsonFromCorporaFile("humans/englishHonorifics.json").englishHonorifics

// MATERIALS
const bodyFluid = loadJsonFromCorporaFile("materials/abridged-body-fluids.json")["abridged body fluids"]
const buildingMaterial = loadJsonFromCorporaFile("materials/building-materials.json")["building materials"]
const gemstone = loadJsonFromCorporaFile("materials/gemstones.json").gemstones
const layMetal = loadJsonFromCorporaFile("materials/layperson-metals.json")["layperson metals"]
const naturalMaterial = loadJsonFromCorporaFile("materials/natural-materials.json")["natural materials"]
const technicalFabric = loadJsonFromCorporaFile("materials/technical-fabrics.json")["technical fabrics"]

// MATH
const primeNumber = loadJsonFromCorporaFile("mathematics/primes.json").primes


// OBJECTS
const object = loadJsonFromCorporaFile("objects/objects.json").objects
const clothing = loadJsonFromCorporaFile("objects/clothing.json").clothes

// TODO get more MEDICINE onward

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