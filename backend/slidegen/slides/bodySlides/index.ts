import { ChartSpec } from "../../sources/chart/chart";
import { BulletSlideOptions } from "./bullets";

export type SlideType = "Bullets" | "HalfImageBullets" | "HalfImageTitle";

export interface Position {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export class SlideVisualElement {
  /** I believe width and position are not actually used since the switch to Grid-based slides */
  public width?: string;

  /** I believe width and position are not actually used since the switch to Grid-based slides */
  public position?: Position;

  constructor(width?: string, position?: Position) {
    this.width = width;
    this.position = position;
  }
}

export class Image extends SlideVisualElement {
  public url: string;

  constructor(url: string, width?: string, position?: Position) {
    super(width, position);
    this.url = url;
  }
}

export class HalfImageBulletsOptions {
  constructor(
    public title: string, // idk what this does
    public bullets: string[],
    public plaintext: boolean, // TODO Rename
    public ordered: boolean, // TODO Rename
    public maxWidth: string
  ) {}
}

export class HalfImageTitleOptions {
  constructor(
    public title: string,
    public bullets: string[],
    public plaintext: boolean, // TODO Rename
    public ordered: boolean, // TODO Rename
    public maxWidth: string,
    public chart?: ChartSpec // TODO specify
  ) {}
}

export type SlideOptions =
  | BulletSlideOptions
  | HalfImageBulletsOptions
  | HalfImageTitleOptions;

export class Slide {
  constructor(public type: SlideType, public options: SlideOptions) {}
}
