import {
  randomInt,
  randomChoice,
  generatedArray,
  getWeightedRandomFunction,
  randomDarkHexColor,
} from "../utils/randUtils";

type GradientType = "linear-gradient" | "radial-gradient";

const pickGradientStepCount = getWeightedRandomFunction<number>({
  2: 14,
  3: 8,
  4: 3,
  5: 1,
  6: 1,
});

const pickFont = getWeightedRandomFunction<string>({
  // Normal 70%
  Rubik: 15,
  Aleo: 15,
  Nunito: 10,
  "Noto Serif": 10,
  Cabin: 10,
  Merriweather: 10,

  // Goofy 24%
  Anton: 3,
  Caveat: 3,
  Kalam: 3,
  "Patrick Hand": 3,
  "Cutive Mono": 3,
  "Coming Soon": 3,
  "Just Me Again Down Here": 3,
  Kavivanar: 3,

  // Hard to read 6%
  Lobster: 1,
  Pacifico: 1,
  "Dancing Script": 1,
  "Reenie Beanie": 1,
  Condiment: 1,
  Orbitron: 1,
});

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
