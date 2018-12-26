var reddit = require('./reddit')

// function generateSlideshow(length, title, subtitle) {
function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const imageFunctions = {
  async landscape() {
    let url = await reddit.randomImageFromSubreddit("earthporn")
    return url
  }
};

module.exports = imageFunctions;
