// var testSlides = require("./serverTestSlides");
const titleGen = require("./slides/titleSlide");
const bodyGen = require("./slides/bodySlide");
const ru = require("./utils/randUtils");

const bodySlideGenFunctionWeightSpec = [
  // {
  //   // Notice this is a reference to the function and NOT an invocation
  //   value: titleGen.generateFullRandomTitleSlide,
  //   count: 8
  // },
  {
    value: bodyGen.generateStockPhotoSlide,
    count: 4
  },
  {
    value: bodyGen.generateWikiImageSlide,
    count: 5
  },
  {
    value: bodyGen.generateQuoteHalfImage,
    count: 3
  },
  {
    value: bodyGen.generateExtractHalfImage,
    count: 1
  },
  {
    value: bodyGen.generateHalfBulletSlide,
    count: 1
  },
  // {
  //   value: bodyGen.generateWeirdThoughtSlide,
  //   count: 3
  // },
  {
    value: bodyGen.generateStrategySlide,
    count: 1
  },
  {
    value: bodyGen.generateChartSlide,
    count: 2
  }
];

const numGradientStepsPicker = ru.getWeightedRandomFunction({
  2: 14,
  3: 8,
  4: 3,
  5: 1,
  6: 1
});

const fontPicker = ru.getWeightedRandomFunction({
  // Normal 70%
  Rubik: 15,
  Aleo: 15,
  Nunito: 10,
  "Noto Serif": 10,
  Cabin: 10,
  Merriweather: 10,

  // Goofy 24%
  Anton: 3,
  Caveat: 3,
  Kalam: 3,
  "Patrick Hand": 3,
  "Cutive Mono": 3,
  "Coming Soon": 3,
  "Just Me Again Down Here": 3,
  Kavivanar: 3,

  // Hard to read 6%
  Lobster: 1,
  Pacifico: 1,
  "Dancing Script": 1,
  "Reenie Beanie": 1,
  Condiment: 1,
  Orbitron: 1
});

function generateTheme() {
  let colors = [];
  let numGradientSteps = numGradientStepsPicker();
  for (let i = 0; i < numGradientSteps; i++) {
    colors.push(ru.randomDarkHexColor());
  }

  const gradientType =
    Math.random() < 0.5 ? "linear-gradient" : "radial-gradient";

  return {
    colors: colors,
    texture: ru.randomInt(1, 41),
    gradientType: gradientType,
    gradientDirection:
      gradientType == "linear-gradient" ? `${ru.randomInt(-179, 180)}deg` : "",
    font: fontPicker()
  };
}

async function generateSlideshow(presenter, desiredSlideCount, questions) {
  let currentSlideCount = 0;

  let slidePromises = [];

  // Generate new random slide picker without replacement
  // It will return a slide generator function!
  const getBodySlideGenerator = ru.getNonReplacingRandomDeckFunction(
    bodySlideGenFunctionWeightSpec
  );

  function addBodySlide() {
    slidePromises.push(getBodySlideGenerator()());
    currentSlideCount++;
  }

  // TITLE SLIDE
  if (presenter != "") {
    // both exist
    slidePromises.push(titleGen.generateTitleSlideForPresenter(presenter));
  } else {
    slidePromises.push(titleGen.generateFullRandomTitleSlide());
  }

  // ABOUT ME SLIDE
  slidePromises.push(bodyGen.generateAboutMeSlide());
  currentSlideCount++;

  // BODY SLIDES
  while (currentSlideCount < desiredSlideCount) {
    addBodySlide();
  }

  slidePromises.push(titleGen.generateEndSlide(questions));
  currentSlideCount++;

  let slideshow = {
    slides: await Promise.all(slidePromises),
    theme: generateTheme()
  };

  return slideshow;
}

module.exports.generateSlideshow = generateSlideshow;
