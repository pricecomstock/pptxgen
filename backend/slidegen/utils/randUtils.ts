import { RGBAColor } from "./color";

/** Chooses and returns a random item from an array */
export function randomChoice<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Chooses a random item from an array, removes it, and returns it */
export function randomPop<T>(arr: Array<T>) {
  if (arr.length === 0) {
    return undefined;
  }
  let index = Math.floor(Math.random() * arr.length);
  let chosen = arr.splice(index, 1)[0];
  return chosen;
}

/** Chooses a random integer between min and max, inclusive */
export function randomInt(min: number, max: number): number {
  let exMax = max + 1;
  let range = exMax - min;
  return Math.floor(Math.random() * range) + min;
}

/**
 * Returns a random number between 0 and 1 according to a normal distribution
 */
export function norm(): number {
  const precision = 6; // the higher this goes, the better approx of norm we get
  let rand = 0;
  for (let i = 0; i < precision; i++) {
    rand += Math.random();
  }

  return rand / precision;
}

/** Returns a random integer between min and max inclusive, according to a normal distribution */
export function normInt(min: number, max: number): number {
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
): number[] {
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
export function randomDarkHexColor(): string {
  let r = ((Math.random() * 0xbb) << 0).toString(16).padStart(2, "0");
  let g = ((Math.random() * 0xbb) << 0).toString(16).padStart(2, "0");
  let b = ((Math.random() * 0xbb) << 0).toString(16).padStart(2, "0");
  return "#" + r + g + b;
}

export function randomAnyRBGAColor(min, max, alpha): RGBAColor {
  const minColorValue = min || 0;
  const maxColorValue = max || 255;
  return new RGBAColor(
    randomInt(minColorValue, maxColorValue),
    randomInt(minColorValue, maxColorValue),
    randomInt(minColorValue, maxColorValue),
    alpha || Math.random()
  );
}

/** Takes an object like `{ 'a': 1, 'b': 2, 'c': 3 }` and expands it to
 * ['a', 'b', 'b', 'c', 'c', 'c']
 */
export function expandCountsToArray<T extends string | number>(
  spec: Record<T, number>
): Array<T> {
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
@deprecated because it only supports strings well
*/
export function getWeightedRandomFunction<T extends string | number>(
  spec: Record<T, number>
): () => T {
  let i: T,
    j: number,
    table = [];

  for (i in spec) {
    for (j = 0; j < spec[i]; j++) {
      table.push(i);
    }
  }

  // If everything is an integer, we want the function to return numbers instead of strings
  if (
    table.every((tableItem) => {
      return !isNaN(tableItem) && !isNaN(parseInt(tableItem));
    })
  ) {
    table = table.map(Number);
  }

  return function () {
    return table[Math.floor(Math.random() * table.length)];
  };
}

/**
 *
 */
export function weightedRandomChoiceFunction<T>(
  weightedChoices: Array<WeightedChoice<T>>
): () => T {
  const arr = weightedChoices.flatMap((choice) => choice.expand());
  return () => {
    return randomChoice(arr);
  };
}

/** Randomly returns true approximately once out of N calls */
export function oneInN(n): boolean {
  return Math.random() < 1 / n;
}

/** Retruns an array with each item created by calling the given function */
export function generatedArray<T>(
  length: number,
  generatorFunction: (index: number) => T
): T[] {
  let a = Array(length);
  a.fill(undefined);
  a = a.map((_value, index) => generatorFunction(index));

  return a;
}

/** Retruns an array with each item created by calling the given function */
export function generatedAsyncArray<T>(
  length: number,
  generatorFunction: (index: number) => Promise<T>
): Promise<T[]> {
  return Promise.all(
    Array(length)
      .fill(undefined)
      .map((_value, index) => generatorFunction(index))
  );
}

/** Shuffles an array in place. This is mutative! */
export function shuffleArrayInPlace<T>(arr: Array<T>): Array<T> {
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

  static fromWeightedChoiceArray<T>(spec: Array<WeightedChoice<T>>) {
    let arr: T[] = [];
    spec.forEach((item) => {
      for (let i = 0; i < item.weight; i++) {
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

export class WeightedChoice<T> {
  constructor(public value: T, public weight: number) {}

  public expand(): Array<T> {
    return Array(this.weight).fill(this.value);
  }
}

module.exports = {
  randomChoice,
  randomInt,
  norm,
  normInt,
  getWeightedRandomFunction,
  weightedRandomChoiceFunction,
  randomIntArray,
  oneInN,
  randomDarkHexColor,
  generatedArray,
  randomAnyRBGAColor,
  DeckRandomizer,
  WeightedChoice,
};
