import {
  randomInt,
  randomChoice,
  generatedArray,
  getWeightedRandomFunction,
  randomDarkHexColor,
  weightedRandomChoiceFunction,
  WeightedChoice,
} from "../utils/randUtils";

type GradientType = "linear-gradient" | "radial-gradient";

const pickGradientStepCount = weightedRandomChoiceFunction<number>([
  new WeightedChoice(2, 14),
  new WeightedChoice(3, 8),
  new WeightedChoice(4, 3),
  new WeightedChoice(5, 1),
  new WeightedChoice(6, 1),
]);

const pickFont = weightedRandomChoiceFunction<string>([
  // Normal 70%
  new WeightedChoice("Rubik", 15),
  new WeightedChoice("Aleo", 15),
  new WeightedChoice("Nunito", 10),
  new WeightedChoice("Noto Serif", 10),
  new WeightedChoice("Cabin", 10),
  new WeightedChoice("Merriweather", 10),

  // Goofy 24%
  new WeightedChoice("Anton", 3),
  new WeightedChoice("Caveat", 3),
  new WeightedChoice("Kalam", 3),
  new WeightedChoice("Patrick Hand", 3),
  new WeightedChoice("Cutive Mono", 3),
  new WeightedChoice("Coming Soon", 3),
  new WeightedChoice("Just Me Again Down Here", 3),
  new WeightedChoice("Kavivanar", 3),

  // Hard to read 6%
  new WeightedChoice("Lobster", 1),
  new WeightedChoice("Pacifico", 1),
  new WeightedChoice("Dancing Script", 1),
  new WeightedChoice("Reenie Beanie", 1),
  new WeightedChoice("Condiment", 1),
  new WeightedChoice("Orbitron", 1),
]);

function randomThemeColors(length: number) {
  return generatedArray<string>(length, randomDarkHexColor);
}

export class Theme {
  constructor(
    public colors: String[],
    public texture: number,
    public gradientType: GradientType,
    /** Only applies to linear-gradient type. a string in format "18deg" */
    public gradientDirection: string,
    public font: string
  ) {}

  static createRandom() {
    return new Theme(
      randomThemeColors(pickGradientStepCount()),
      randomInt(1, 41),
      randomChoice(["linear-gradient", "radial-gradient"]),
      `${randomInt(-179, 180)}deg`,
      pickFont()
    );
  }
}
