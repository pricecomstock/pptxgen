function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Like randomChoice but actually removes chosen object!
function randomPop(array) {
  if (array.length === 0) {
    return undefined;
  }
  let index = Math.floor(Math.random() * array.length);
  let chosen = array.splice(index, 1)[0];
  return chosen;
}

function randomInt(min, max) {
  let exMax = max + 1;
  let range = exMax - min;
  return Math.floor(Math.random() * range) + min;
}

function norm() {
  const precision = 6; // the higher this goes, the better approx of norm we get
  let rand = 0;
  for (let i = 0; i < precision; i++) {
    rand += Math.random();
  }

  return rand / precision;
}

function normInt(min, max) {
  return Math.floor(min + norm() * (max - min + 1));
}

function randomIntArray(len, min, max, normalDistributed) {
  let arr = [];

  if (normalDistributed) {
    for (let i = 0; i < len; i++) {
      arr.push(normInt(min, max));
    }
  } else {
    for (let i = 0; i < len; i++) {
      arr.push(randomInt(min, max));
    }
  }

  return arr;
}

function randomDarkHexColor() {
  let r = ((Math.random() * 0xbb) << 0).toString(16).padStart(2, "0");
  let g = ((Math.random() * 0xbb) << 0).toString(16).padStart(2, "0");
  let b = ((Math.random() * 0xbb) << 0).toString(16).padStart(2, "0");
  return "#" + r + g + b;
}

class rbgaColor {
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a || 1;
  }

  toString() {
    return `rgba(${this.r},${this.g},${this.b},${this.a})`;
  }

  withAlpha(cloneAlpha) {
    return new rbgaColor(this.r, this.g, this.b, cloneAlpha);
  }

  toStringHex(includeAlpha) {
    let intTo2DigitHex = val255 => val255.toString(16).padStart(2, "0");

    return `#${intTo2DigitHex(this.r)}${intTo2DigitHex(this.g)}${intTo2DigitHex(
      this.b
    )}${includeAlpha ? intTo2DigitHex(Math.floor(this.a * 255)) : ""}`;
  }
}

function randomAnyRBGAColor(min, max, alpha) {
  const minColorValue = min || 0;
  const maxColorValue = max || 255;
  return new rbgaColor(
    randomInt(minColorValue, maxColorValue),
    randomInt(minColorValue, maxColorValue),
    randomInt(minColorValue, maxColorValue),
    alpha || Math.random()
  );
}
/* This function takes an object like
{ 'a': 10, 'b': 40, 'c': 50 }
and will create a function that when called, will return a random key weighted by its value.
Easiest way is to treat the weight as a percentage
*/
function getWeightedRandomFunction(spec) {
  var i,
    j,
    table = [];

  for (i in spec) {
    for (j = 0; j < spec[i]; j++) {
      table.push(i);
    }
  }

  return function() {
    return table[Math.floor(Math.random() * table.length)];
  };
}

// Format of spec is different than above function in order to
// support object
function getNonReplacingRandomDeckFunction(spec) {
  let deck = [];

  spec.forEach(item => {
    item.value;
    for (let j = 0; j < item.count; j++) {
      deck.push(item.value);
    }
  });

  return function() {
    return randomPop(deck);
  };
}

function oneInN(n) {
  return Math.random() < 1 / n;
}

function generatedArray(length, generatorFunction) {
  return Array(length)
    .fill()
    .map((_value, index) => generatorFunction(index));
}

// let testSpec = [{ value: "hello", count: 3 }, { value: "wow", count: 2 }];

// let testSpecFunction = getNonReplacingRandomDeckFunction(testSpec);
// for (let i = 0; i < 10; i++) {
//   console.log(testSpecFunction(20, 50));
// }

module.exports = {
  randomChoice,
  randomInt,
  norm,
  normInt,
  getWeightedRandomFunction,
  getNonReplacingRandomDeckFunction,
  randomIntArray,
  oneInN,
  randomDarkHexColor: randomDarkHexColor,
  generatedArray,
  randomAnyRBGAColor
};
