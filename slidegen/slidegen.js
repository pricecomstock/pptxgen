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
  {
    generator: bodyGen.generateWeirdThoughtSlide,
    weight: 3
  },
  {
    generator: bodyGen.generateStrategySlide,
    weight: 6
  }
]

function generateColor() {
  return "#" + (Math.random() * 0x777777<<0).toString(16).padStart(6, '0');
}

const numGradientStepsPicker = getWeightedRandomFunction({
  2: 6,
  3: 4,
  4: 3,
  5: 2,
  6: 1
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
    gradientDirection: gradientType == "linear-gradient" ? `${randomInt(-179, 180)}deg` : ''
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
