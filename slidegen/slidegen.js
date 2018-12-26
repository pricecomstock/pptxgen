// var testSlides = require("./serverTestSlides");
const titleGen = require("./slides/titleSlide");
const bodyGen = require("./slides/bodySlide");

// function generateSlideshow(length, title, subtitle) {
async function generateSlideshow() {
  //   return testSlides;
  // let emptySlides = Array(2).fill(0);
  // let slidePromises = emptySlides.map(() => {
  //   return titleGen.generateFullRandomTitleSlide();
  // });

  let slidePromises = []
  slidePromises.push(titleGen.generateFullRandomTitleSlide())
  for (i = 0; i < 6; i++) {
    slidePromises.push(bodyGen.generateBodySlideWithGraph())
  }

  return await Promise.all(slidePromises)
}

module.exports.generateSlideshow = generateSlideshow;
