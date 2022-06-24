import { PresentationOptions } from "./presentationOptions";
import { Theme } from "./theme/theme";
import { DeckRandomizer, WeightedChoice } from "./utils/randUtils";

// var testSlides = require("./serverTestSlides");
const titleGen = require("./slides/titleSlide");
const bodyGen = require("./slides/bodySlide");

const bodySlideGenFunctionWeightSpec = [
  new WeightedChoice<Function>(bodyGen.generateStockPhotoSlide, 4),
  new WeightedChoice<Function>(bodyGen.generateWikiImageSlide, 5),
  new WeightedChoice<Function>(bodyGen.generateQuoteHalfImage, 3),
  new WeightedChoice<Function>(bodyGen.generateExtractHalfImage, 1),
  new WeightedChoice<Function>(bodyGen.generateHalfBulletSlide, 1),
  new WeightedChoice<Function>(bodyGen.generateWeirdThoughtSlide, 3),
  new WeightedChoice<Function>(bodyGen.generateStrategySlide, 1),
  new WeightedChoice<Function>(bodyGen.generateChartSlide, 2),
];

async function generateSlideshow(options: PresentationOptions) {
  const { presenter, slideCount: desiredSlideCount, questions } = options;
  let currentSlideCount = 0;

  let slidePromises = [];

  const bodySlideGeneratorPool =
    DeckRandomizer.fromWeightedChoiceArray<Function>(
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
