export class PresentationOptions {
  /** The number of body slides in a presentation, excluding title and ending slides*/
  public slideCount: number;

  /** The name of the presenter */
  public presenter: string;

  /** Whether or not to prompt for questions at the end of the slideshow */
  public questions: boolean;

  /** The topic that should appear on the title page */
  public topic: string;

  constructor(queryParams: qs.ParsedQs) {
    this.slideCount = Number(queryParams.slideCount) || 6;
    this.presenter = String(queryParams.presenter) || "";
    this.questions = queryParams.questions === "true";
    this.topic = String(queryParams.topic) || "";
  }
}
