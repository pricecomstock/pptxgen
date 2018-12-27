// var testSlides = require("./serverTestSlides");
const titleGen = require("./slides/titleSlide");
const bodyGen = require("./slides/bodySlide");

const weightedBodySlideGenFunctions = [
  // {
  //   // Notice this is a reference to the function and NOT an invocation
  //   generator: titleGen.generateFullRandomTitleSlide,
  //   weight: 8
  // },
  {
    generator: bodyGen.generateStockPhotoSlide,
    weight: 8
  },
  {
    generator: bodyGen.generateBodySlideWithGraph,
    weight: 8
  },
  {
    generator: bodyGen.generateWikiImageSlide,
    weight: 8
  },
  {
    generator: bodyGen.generateQuoteHalfImage,
    weight: 8
  },
  {
    generator: bodyGen.generateExtractHalfImage,
    weight: 8
  },
  {
    generator: bodyGen.generateStrategySlide,
    weight: 8
  },
  {
    generator: bodyGen.generateAboutMeSlide,
    weight: 8
  }
]

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
async function generateSlideshow(title, subtitle) {
  const slideCount = 12;

  
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

  if (title != '' && subtitle != '') { // both exist
    slidePromises.push(titleGen.generateTitleSlide(title, subtitle))
  } else {
    slidePromises.push(titleGen.generateFullRandomTitleSlide())
  }

  for (let i = 0; i < 8; i++) {
    slidePromises.push(getRandomBodySlideGenFunction()())
  }
  slidePromises.push(titleGen.generateFullRandomTitleSlide())

  return await Promise.all(slidePromises)
}

module.exports.generateSlideshow = generateSlideshow;
