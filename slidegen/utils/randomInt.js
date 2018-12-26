function randomInt(min, max) {
  let exMax = max + 1;
  let range = exMax - min;
  return Math.floor(Math.random()*range) + min;
}

module.exports = randomInt;