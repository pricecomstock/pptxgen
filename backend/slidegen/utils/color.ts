/** Represents an rbga color  */
export class RGBAColor {
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
    return new RGBAColor(this.r, this.g, this.b, cloneAlpha);
  }

  /** Gives the hex string representing this color */
  toStringHex(includeAlpha) {
    let intTo2DigitHex = (val255) => val255.toString(16).padStart(2, "0");

    return `#${intTo2DigitHex(this.r)}${intTo2DigitHex(this.g)}${intTo2DigitHex(
      this.b
    )}${includeAlpha ? intTo2DigitHex(Math.floor(this.a * 255)) : ""}`;
  }
}
