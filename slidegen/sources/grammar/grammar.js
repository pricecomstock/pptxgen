const randomChoice = require('../../utils/randUtils').randomChoice
const name = require('./elements/names')

const placeHolderRE = /%[A-Za-z.]+?%/g;

const templates = [
    "I am %NAMEMALE%",
    "I am %NAMEFEMALE%",
    "I am %NAMENEUTRAL%",
    "%EMOTIONALADJECTIVE.indefarticle% %STORYTYPE% about %NOUN.indefarticle% who %LESSON%"
]

const replacements = {
    "%NAMEMALE%": name.bind(null, "male"),
    "%NAMENEUTRAL%": name.bind(null, "neutral"),
    "%NAMEFEMALE%": name.bind(null, "female")
}

function replacer(match, _p1, _offset, _string) {
    return replacements[match]();
}

function resolveTemplate(template) {
    // TODO add referencing previous variables
    // TODO add some way for An vs A to work
    return template.replace(placeHolderRE, replacer)
}



// TESTING
templates.forEach((template) => {
    console.log(resolveTemplate(template))
})