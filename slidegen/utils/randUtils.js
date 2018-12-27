function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min, max) {
  let exMax = max + 1;
  let range = exMax - min;
  return Math.floor(Math.random()*range) + min;
}

module.exports = {
  randomChoice,
  randomInt
};