// function generateSlideshow(length, title, subtitle) {
function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const imageFunctions = {
  landscape() {
    return randomChoice([
      "https://i.redd.it/vruwxsxpxf621.jpg",
      "https://i.redd.it/3otpo2ob4g621.jpg",
      "https://i.redd.it/9008lx3wgg621.jpg"
    ]);
  }
};

module.exports = imageFunctions;
