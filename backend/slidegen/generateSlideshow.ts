import { PresentationOptions } from "./presentationOptions";
import { Theme } from "./theme/theme";
import { DeckRandomizer } from "./utils/randUtils";

// var testSlides = require("./serverTestSlides");
const titleGen = require("./slides/titleSlide");
const bodyGen = require("./slides/bodySlide");

const bodySlideGenFunctionWeightSpec = [
  {
    value: bodyGen.generateStockPhotoSlide,
    count: 4,
  },
  {
    value: bodyGen.generateWikiImageSlide,
    count: 5,
  },
  {
    value: bodyGen.generateQuoteHalfImage,
    count: 3,
  },
  {
    value: bodyGen.generateExtractHalfImage,
    count: 1,
  },
  {
    value: bodyGen.generateHalfBulletSlide,
    count: 1,
  },
  // {
  //   value: bodyGen.generateWeirdThoughtSlide,
  //   count: 3
  // },
  {
    value: bodyGen.generateStrategySlide,
    count: 1,
  },
  {
    value: bodyGen.generateChartSlide,
    count: 2,
  },
];

async function generateSlideshow(options: PresentationOptions) {
  const { presenter, slideCount: desiredSlideCount, questions } = options;
  let currentSlideCount = 0;

  let slidePromises = [];

  const bodySlideGeneratorPool = DeckRandomizer.fromObjectSpec<Function>(
    bodySlideGenFunctionWeightSpec
  );

  function addBodySlide() {
    const generator = bodySlideGeneratorPool.draw();
    slidePromises.push(generator());
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
    theme: Theme.createRandom(),
  };

  return slideshow;
}

module.exports.generateSlideshow = generateSlideshow;
