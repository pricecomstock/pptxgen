// var testSlides = require("./serverTestSlides");
const titleGen = require("./slides/titleSlide");
const bodyGen = require("./slides/bodySlide");
const randomInt = require("./utils/randUtils").randomInt;
const randomChoice = require("./utils/randUtils").randomChoice;
const getWeightedRandomFunction = require("./utils/randUtils").getWeightedRandomFunction;


const weightedBodySlideGenFunctions = [
  // {
  //   // Notice this is a reference to the function and NOT an invocation
  //   generator: titleGen.generateFullRandomTitleSlide,
  //   weight: 8
  // },
  {
    generator: bodyGen.generateStockPhotoSlide,
    weight: 6
  },
  {
    generator: bodyGen.generateBodySlideWithGraph,
    weight: 10
  },
  {
    generator: bodyGen.generateWikiImageSlide,
    weight: 12
  },
  {
    generator: bodyGen.generateQuoteHalfImage,
    weight: 6
  },
  {
    generator: bodyGen.generateExtractHalfImage,
    weight: 1
  },
  {
    generator: bodyGen.generateHalfBulletSlide,
    weight: 5
  },
  // {
  //   generator: bodyGen.generateWeirdThoughtSlide,
  //   weight: 3
  // },
  {
    generator: bodyGen.generateStrategySlide,
    weight: 3
  },
  {
    generator: bodyGen.generateChartSlide,
    weight: 0 // TODO reduce this to a normal value
  }
]

function generateColor() {
  let r = (Math.random()*0xBB<<0).toString(16).padStart(2, '0')
  let g = (Math.random()*0xBB<<0).toString(16).padStart(2, '0')
  let b = (Math.random()*0xBB<<0).toString(16).padStart(2, '0')
  return "#" + r + g + b;
}

const numGradientStepsPicker = getWeightedRandomFunction({
  2: 14,
  3: 8,
  4: 3,
  5: 1,
  6: 1
})

const fontPicker = getWeightedRandomFunction({
  // Normal 70%
  "Rubik": 15,
  "Aleo": 15,
  "Nunito": 10,
  "Noto Serif": 10,
  "Cabin": 10,
  "Merriweather": 10,

  // Goofy 24%
  "Anton": 3,
  "Caveat": 3,
  "Kalam": 3,
  "Patrick Hand": 3,
  "Cutive Mono": 3,
  "Coming Soon": 3,
  "Just Me Again Down Here": 3,
  "Kavivanar": 3,


  // Hard to read 6%
  "Lobster": 1,
  "Pacifico": 1,
  "Dancing Script": 1,
  "Reenie Beanie": 1,
  "Condiment": 1,
  "Orbitron": 1
})

function generateTheme() {

  let colors = []
  let numGradientSteps = numGradientStepsPicker()
  for (let i=0; i<numGradientSteps; i++) {
    colors.push(generateColor())
  }

  const gradientType = Math.random() < 0.5 ? "linear-gradient" : "radial-gradient";

  return {
    colors: colors,
    texture: randomInt(1, 41),
    gradientType: gradientType,
    gradientDirection: gradientType == "linear-gradient" ? `${randomInt(-179, 180)}deg` : '',
    font: fontPicker()
  }
}

function getRandomBodySlideGenFunction() {
  const generators = weightedBodySlideGenFunctions.map( generator => {
    return generator.generator
  })
  const weights = weightedBodySlideGenFunctions.map( generator => {
    return generator.weight
  })
  const totalWeight = weights.reduce( (a,b) => {return a + b}, 0 );

  const randomNum = Math.random() * totalWeight

  let checkedWeight = 0;
  for (let i = 0; i < weights.length; i++) {
    checkedWeight += weights[i]
    if (randomNum <= checkedWeight) {
      return generators[i]
    }
  }
}

function getBodySlideGenerators(count) {
  let bodySlideGenerators = []
  for (let i = 0; i < count; i++) {
    bodySlideGenerators.push(getRandomBodySlideGenFunction())
  }

  console.log(bodySlideGenerators)

  return bodySlideGenerators
}

// function generateSlideshow(length, title, subtitle) {
async function generateSlideshow(presenter, desiredSlideCount, questions) {
  let currentSlideCount = 0;
  
  // let slideGenerators = []
  // These are function references, not invocations
  // slideGenerators.push(titleGen.generateFullRandomTitleSlide)
  // slideGenerators.concat(getBodySlideGenerators(6))
  // console.log(slideGenerators)
  // slideGenerators.push(titleGen.generateFullRandomTitleSlide) // TODO End slide
  
  // let slidePromises = slideGenerators.map( generator => {
    //   return generator() // invoke to get a promise
    // })
  let slidePromises = []
  
  function addBodySlide() {
    slidePromises.push(getRandomBodySlideGenFunction()())
    currentSlideCount++;
  }
    
  // TITLE SLIDE
  if (presenter != '') { // both exist
    slidePromises.push(titleGen.generateTitleSlideForPresenter(presenter))
  } else {
    slidePromises.push(titleGen.generateFullRandomTitleSlide())
  }
  currentSlideCount++;

  // ABOUT ME SLIDE
  slidePromises.push(bodyGen.generateAboutMeSlide())
  currentSlideCount++;
  
  // BODY SLIDES
  while (currentSlideCount < desiredSlideCount - 1) {
    addBodySlide()
  }

  slidePromises.push(titleGen.generateEndSlide(questions))
  currentSlideCount++;

  let slideshow = {
    slides: await Promise.all(slidePromises),
    theme: generateTheme()
  }

  return slideshow
}

module.exports.generateSlideshow = generateSlideshow;
