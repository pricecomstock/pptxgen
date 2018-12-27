function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min, max) {
  let exMax = max + 1;
  let range = exMax - min;
  return Math.floor(Math.random()*range) + min;
}

function norm() {
  const precision = 6 // the higher this goes, the better approx of norm we get
  let rand = 0;
  for (let i=0; i<precision; i++) {
    rand += Math.random();
  }

  return rand / precision
}

function normInt(min, max) {
  return Math.floor(min + norm() * (max - min + 1));
}

// for (let i=0; i<10; i++) {
//   console.log(normInt(20,50))
// }

module.exports = {
  randomChoice,
  randomInt,
  norm,
  normInt
};