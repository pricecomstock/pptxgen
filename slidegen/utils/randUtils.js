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

function randomIntArray(len, min, max, normalDistributed) {
  let arr = []

  if (normalDistributed) {
    for (let i = 0; i < len; i++) {
      arr.push(normInt(min, max))
    }
  } else {
    for (let i = 0; i < len; i++) {
      arr.push(randomInt(min, max))
    }
  }

  return arr
}

function randomColor() {
  let r = (Math.random()*0xBB<<0).toString(16).padStart(2, '0')
  let g = (Math.random()*0xBB<<0).toString(16).padStart(2, '0')
  let b = (Math.random()*0xBB<<0).toString(16).padStart(2, '0')
  return "#" + r + g + b;
}

/* This function takes an object like
{ 'a': 10, 'b': 40, 'c': 50 }
and will create a function that when called, will return a random key weighted by its value.
Easiest way is to treat the weight as a percentage
*/
function getWeightedRandomFunction(spec) {
  var i, j, table=[];
  // const totalWeight = Object.keys(spec).reduce( (prev, cur) => {
  //   return prev + cur;
  // });

  for (i in spec) {
    // The constant 10 below should be computed based on the
    // weights in the spec for a correct and optimal table size.
    // E.g. the spec {0:0.999, 1:0.001} will break this impl.
    for (j=0; j<spec[i]; j++) {
      table.push(i);
    }
  }

  return function() {
    return table[Math.floor(Math.random() * table.length)];
  }
}

function oneInN(n) {
  return Math.random() < (1/n);
}

function generatedArray(length, generatorFunction) {
  return Array(length).fill().map(() => generatorFunction())
}

// let testSpec = {
//   a: 5,
//   b: 25,
//   c: 70
// }

// let testSpecFunction = getWeightedRandomFunction(testSpec)
// for (let i=0; i<10; i++) {
//   console.log(testSpecFunction(20,50))
// }

module.exports = {
  randomChoice,
  randomInt,
  norm,
  normInt,
  getWeightedRandomFunction,
  randomIntArray,
  oneInN,
  randomColor,
  generatedArray
};