// var testSlides = require("./serverTestSlides");
const titleGen = require("./slides/titleSlide");

// function generateSlideshow(length, title, subtitle) {
function generateSlideshow() {
  //   return testSlides;
  let emptySlides = Array(4).fill(0);
  return emptySlides.map(() => {
    return titleGen.generateTitleSlide("Dogs", "Price Comstock");
  });
}

module.exports.generateSlideshow = generateSlideshow;
