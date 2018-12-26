// var testSlides = require("./serverTestSlides");
const titleGen = require("./slides/titleSlide");

// function generateSlideshow(length, title, subtitle) {
async function generateSlideshow() {
  //   return testSlides;
  let emptySlides = Array(2).fill(0);
  let slidePromises = emptySlides.map(() => {
    return titleGen.generateTitleSlide("Dogs", "Price Comstock");
  });

  return await Promise.all(slidePromises)
}

module.exports.generateSlideshow = generateSlideshow;
