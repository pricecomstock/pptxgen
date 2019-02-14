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
const animals = loadJsonFromCorporaFile("animals/common.json").animals;
const dogNames = loadJsonFromCorporaFile("animals/dog_names.json").dog_names;

// ARCHETYPES
const charactersJson = loadJsonFromCorporaFile("archetypes/character.json");
const characterTypes = reduceToNameAndSynonymArray(charactersJson.characters)
const characterQualities = charactersJson.characters.reduce( (accumulator, currentCharacter) => {
    return accumulator.concat(currentCharacter.qualities);
}, []);

const eventsJson = loadJsonFromCorporaFile("archetypes/event.json");
const eventTypes = reduceToNameAndSynonymArray(eventsJson.events);

const settingJson = loadJsonFromCorporaFile("archetypes/setting.json");
const settingTypes = reduceToNameAndSynonymArray(settingJson.settings);

// ARCHITECTURE
const passages = loadJsonFromCorporaFile("architecture/passages.json").passages;
const rooms = loadJsonFromCorporaFile("architecture/rooms.json").rooms;

// ART
const artIsms = loadJsonFromCorporaFile("art/isms.json").isms;

// ACADEMIC
const academicSubjects = loadJsonFromCorporaFile("books/academic_subjects.json").subjects;

// CORPORATE
const cars = loadJsonFromCorporaFile("corporations/cars.json").cars;
const charities = loadJsonFromCorporaFile("corporations/charities.json").charities;
const companies = loadJsonFromCorporaFile("corporations/fortune500.json").companies;
const industries = loadJsonFromCorporaFile("corporations/industries.json").industries;
const newspapers = loadJsonFromCorporaFile("corporations/newspapers.json").newspapers;

// TAROT
const tarotJson = loadJsonFromCorporaFile("divination/tarot_interpretations.json");
const tarotMeanings = tarotJson.tarot_interpretations.reduce( (accumulator, currentItem) => {
        return accumulator.concat(currentItem.meanings.light).concat(currentItem.meanings.shadow)
    }, []);
const tarotFortunes = tarotJson.tarot_interpretations.reduce( (accumulator, currentItem) => {
        return accumulator.concat(currentItem.fortune_telling)
    }, []);

// FILM & TV
const iabCategories = loadJsonFromCorporaFile("film-tv/iab_categories.json").iab
    .map( (category) => category.category_name)
const netflixGenres = loadJsonFromCorporaFile("film-tv/netflix-categories.json").categories

// GAMES
const streetFighterMoves = loadJsonFromCorporaFile("games/street_fighter_ii.json").characters
.reduce( (accumulator, currentItem) => {
    return accumulator.concat(currentItem.moves);
},[])
const wrestlingMoves = loadJsonFromCorporaFile("games/wrestling_moves.json").moves
const fightingMoves = streetFighterMoves.concat(wrestlingMoves);

// GEOGRAPHY
const countries = loadJsonFromCorporaFile("geography/countries.json").countries
const environMentalHazards = loadJsonFromCorporaFile("geography/environmental_hazards.json").entries
const usCities = loadJsonFromCorporaFile("geography/us_cities.json").cities.map( city => {
    return `${city.city}, ${city.state}`
})

// TODO Governments onward
const occupations = loadJsonFromCorporaFile("humans/occupations.json").occupations

const corpora = {
    animals,
    dogNames,
    characterTypes,
    characterQualities,
    eventTypes,
    settingTypes,
    passages,
    rooms,
    artIsms,
    academicSubjects,
    cars,
    charities,
    companies,
    industries,
    newspapers,
    tarotMeanings,
    tarotFortunes,
    iabCategories,
    netflixGenres,
    fightingMoves,
    countries,
    environMentalHazards,
    usCities,

    occupations
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