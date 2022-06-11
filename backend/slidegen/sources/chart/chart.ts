import { ChartData, ChartType, ChartOptions } from "chart.js";
import { SlideVisualElement } from "../../slides/bodySlides/bodySlide";

export class ChartSpec extends SlideVisualElement {
  constructor(
    public chartType: ChartType,
    public chartJsData: ChartData,
    public chartJsOptions: ChartOptions
  ) {
    super();
  }
}
