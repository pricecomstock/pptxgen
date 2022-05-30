/** Chooses and returns a random item from an array */
export function randomChoice(arr: Array<any>) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Chooses a random item from an array, removes it, and returns it */
export function randomPop(arr: Array<any>) {
  if (arr.length === 0) {
    return undefined;
  }
  let index = Math.floor(Math.random() * arr.length);
  let chosen = arr.splice(index, 1)[0];
  return chosen;
}

/** Chooses a random integer between min and max, inclusive */
export function randomInt(min: number, max: number) {
  let exMax = max + 1;
  let range = exMax - min;
  return Math.floor(Math.random() * range) + min;
}

/**
 * Returns a random number between 0 and 1 according to a normal distribution
 */
export function norm() {
  const precision = 6; // the higher this goes, the better approx of norm we get
  let rand = 0;
  for (let i = 0; i < precision; i++) {
    rand += Math.random();
  }

  return rand / precision;
}

/** Returns a random integer between min and max inclusive, according to a normal distribution */
export function normInt(min: number, max: number) {
  return Math.floor(min + norm() * (max - min + 1));
}

/** Creates an array of random integers
 * TODO Switch to using generatedArray function
 */
export function randomIntArray(
  len: number,
  min: number,
  max: number,
  isNormalDistributed: boolean
) {
  let arr = [];

  if (isNormalDistributed) {
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

/** Returns a random hex color code  */
export function randomDarkHexColor() {
  let r = ((Math.random() * 0xbb) << 0).toString(16).padStart(2, "0");
  let g = ((Math.random() * 0xbb) << 0).toString(16).padStart(2, "0");
  let b = ((Math.random() * 0xbb) << 0).toString(16).padStart(2, "0");
  return "#" + r + g + b;
}

/** Represents an rbga color  */
class rbgaColor {
  public r: number;
  public g: number;
  public b: number;
  public a: number;
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a || 1;
  }

  toString() {
    return `rgba(${this.r},${this.g},${this.b},${this.a})`;
  }

  /** Returns a clone with the specified alpha instead of this one */
  withAlpha(cloneAlpha) {
    return new rbgaColor(this.r, this.g, this.b, cloneAlpha);
  }

  /** Gives the hex string representing this color */
  toStringHex(includeAlpha) {
    let intTo2DigitHex = (val255) => val255.toString(16).padStart(2, "0");

    return `#${intTo2DigitHex(this.r)}${intTo2DigitHex(this.g)}${intTo2DigitHex(
      this.b
    )}${includeAlpha ? intTo2DigitHex(Math.floor(this.a * 255)) : ""}`;
  }
}

export function randomAnyRBGAColor(min, max, alpha) {
  const minColorValue = min || 0;
  const maxColorValue = max || 255;
  return new rbgaColor(
    randomInt(minColorValue, maxColorValue),
    randomInt(minColorValue, maxColorValue),
    randomInt(minColorValue, maxColorValue),
    alpha || Math.random()
  );
}

/** Takes an object like `{ 'a': 1, 'b': 2, 'c': 3 }` and expands it to
 * ['a', 'b', 'b', 'c', 'c', 'c']
 */
export function expandCountsToArray(spec: Record<any, number>) {
  let i: any,
    j: number,
    arr = [];

  for (i in spec) {
    for (j = 0; j < spec[i]; j++) {
      arr.push(i);
    }
  }

  return arr;
}

/** Takes an object like
`{ 'a': 10, 'b': 40, 'c': 50 }`
and returns a function that, when called, will return a random key weighted by its value.
Easiest way is to treat the weight as a percentage. Probably not the most efficient since it
creates an array with a length equal to the sum of the values
*/
export function getWeightedRandomFunction(spec: Record<any, number>) {
  var i: any,
    j: number,
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

/** A bad deck function */
export function getNonReplacingRandomDeckFunction(
  spec: Array<{ value: any; count: number }>
) {
  let deck = [];

  spec.forEach((item) => {
    item.value;
    for (let j = 0; j < item.count; j++) {
      deck.push(item.value);
    }
  });

  return function() {
    return randomPop(deck);
  };
}

/** Randomly returns true approximately once out of N calls */
export function oneInN(n) {
  return Math.random() < 1 / n;
}

/** Retruns an array with each item created by calling the given function */
export function generatedArray(
  length: number,
  generatorFunction: (index: number) => {}
) {
  return Array(length)
    .fill(undefined)
    .map((_value, index) => generatorFunction(index));
}

/** Shuffles an array in place. This is mutative! */
export function shuffleArrayInPlace(arr) {
  let currentIndex = arr.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
}

/** Creates a "deck" from an array, and then allows drawing from it without replacement until all items have
 * been drawn.
 *
 * Uses the exact array that is input so pass a copy if you are going to be using that array elsewhere!
 */
export class DeckRandomizer<T> {
  private items: Array<T>;
  private _pointer: number;

  constructor(arr: Array<T>) {
    // Sets directly to input array to allow for TypedArrays
    this.items = arr;
    shuffleArrayInPlace(this.items);

    this._pointer = 0;
  }

  static fromObjectSpec<T>(spec: Array<{ value: T; count: number }>) {
    let arr: T[] = [];
    spec.forEach((item) => {
      for (let i = 0; i < item.count; i++) {
        arr.push(item.value);
      }
    });

    return new DeckRandomizer<T>(arr);
  }

  draw(): T {
    if (this._pointer >= this.items.length) {
      this.reshuffleDeck();
    }
    let item = this.items[this._pointer];
    this._pointer += 1;
    return item;
  }

  drawMultiple(count: number): T[] {
    if (count > this.items.length) {
      throw Error("cannot pick that many random items");
    }

    const itemsRemaining = this.items.length - this._pointer;
    if (count > itemsRemaining) {
      let initialItems = this.items.slice(this._pointer);
      this.reshuffleDeck();
      let nextSetOfItems = this.items.slice(0, count - initialItems.length);
      return [...initialItems, ...nextSetOfItems];
    } else {
      return this.items.slice(this._pointer, this._pointer + count);
    }
  }

  reshuffleDeck(): void {
    this._pointer = 0;
    shuffleArrayInPlace(this.items);
  }
}

module.exports = {
  randomChoice,
  randomInt,
  norm,
  normInt,
  getWeightedRandomFunction,
  getNonReplacingRandomDeckFunction,
  randomIntArray,
  oneInN,
  randomDarkHexColor,
  generatedArray,
  randomAnyRBGAColor,
  DeckRandomizer,
};
