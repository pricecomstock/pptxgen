function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

module.exports = randomChoice;