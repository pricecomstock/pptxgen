// The standard, "bullet point" slide

import { Image } from ".";
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
  public plaintext: boolean = false;
  public ordered: boolean = false;

  constructor(
    public title: string,
    public bullets: string[],
    public bulletFormat: string,
    public maxWidth: string,
    public chart?: ChartSpec,
    public contentImages?: Image[]
  ) {
    this.plaintext = bulletFormat === "plain";
    this.ordered = bulletFormat === "ordered";
  }

  static async generateRandom(hasChart = false, hasImage = false) {
    const titlePromise = randString.compositeTitle();

    // TODO move this to another file that creates whole sets of bullets they can follow themes
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
}
