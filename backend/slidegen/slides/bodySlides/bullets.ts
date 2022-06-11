// The standard, "bullet point" slide

import { Image } from "./bodySlide";
import * as randString from "../../randString";
import { ChartSpec } from "../../sources/chart/chart";
import {
  generatedAsyncArray,
  getWeightedRandomFunction,
} from "../../utils/randUtils";

const randomNumBullets = getWeightedRandomFunction({
  1: 60,
  2: 38,
  3: 2,
});

const randomBulletFormat = getWeightedRandomFunction({
  plain: 1,
  ordered: 3,
  bullet: 6,
});

export class BulletSlideOptions {
  constructor(
    public title: string,
    public bullets: string[],
    public bulletFormat: string,
    public maxWidth: string,
    public chart?: ChartSpec,
    public contentImages?: Image[]
  ) {}

  static async generateRandom(hasChart = false, hasImage = false) {
    const titlePromise = randString.compositeTitle();

    const bulletsPromise = generatedAsyncArray<string>(
      randomNumBullets(),
      randString.compositeBullet
    );

    const bulletFormat = randomBulletFormat();

    const maxWidth = "100%";

    // const chart = ;

    // const contentImages = ;

    const [title, bullets] = await Promise.all([titlePromise, bulletsPromise]);

    return new BulletSlideOptions(title, bullets, bulletFormat, maxWidth);
  }

  // TODO rename to be more clearly a boolean, or eliminate
  get plaintext() {
    return this.bulletFormat === "plain";
  }

  // TODO rename to be more clearly a boolean, or eliminate
  get ordered() {
    return this.bulletFormat === "ordered";
  }
}
