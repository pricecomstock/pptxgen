import { ChartData, ChartDataSets, ChartOptions } from "chart.js";
import { ChartSpec } from "./chart";

import * as ru from "../../utils/randUtils";
const su = require("../../utils/stringUtils");
const chartTextGenerator = require("../grammar/generators/chartText");

const maxWidth = "100%";

function createChart(chartType, size, chartJsData, chartJsOptions, maxWidth) {
  return {
    chartType,
    size,
    chartJsData,
    chartJsOptions,
    maxWidth,
  };
}

function getRandomBarChart(): ChartSpec {
  const barDatasetGenerator = (dataPointCount): ChartDataSets => {
    const colors = ru.generatedArray(dataPointCount, () =>
      ru.randomAnyRBGAColor(0, 150, 1)
    );
    const transparent = ru.oneInN(3);
    return {
      // label: grammar.flatten('#field#'),
      // data: ru.randomIntArray(dataPointCount,1,5,false),
      data: ru.randomIntArray(dataPointCount, 1, 10, false),
      backgroundColor: colors.map(
        (color) => color.withAlpha(0.3).toStringHex(transparent) // only include alpha if transparent
      ),
      borderColor: colors.map((color) => color.toStringHex()),
      borderWidth: transparent ? 4 : 0,
    };
  };

  const numData = 2; // TODO Increase when I can make items in chart more related

  let widthVw = ru.randomInt(33, 36);
  let heightVw = ru.randomInt(33, 36);
  const size = { x: widthVw, y: heightVw };

  const chartTitle = chartTextGenerator.barChartTitle();

  const chartJsData: ChartData = {
    labels: chartTextGenerator.barChartXAxisArray(numData),
    datasets: [barDatasetGenerator(numData)],
  };
  // console.log(data);
  const chartJsOptions: ChartOptions = {
    legend: {
      display: false,
      labels: {
        fontSize: 36,
      },
    },
    title: {
      display: true,
      text: su.titleCase(chartTitle).match(/(\S+\s?){1,5}/g) || [], //clunkily split every few words
      fontSize: 56,
      padding: 20,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            fontSize: 36,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontSize: 48,
          },
        },
      ],
    },
    layout: {
      padding: {
        left: 25,
        right: 25,
        top: 0,
        bottom: 15,
      },
    },
    elements: {
      rectangle: {
        borderWidth: 8,
      },
    },
  };

  return createChart("bar", size, chartJsData, chartJsOptions, maxWidth);
}

function getRandomLineChart() {
  // TOOLS
  const lineChartTypes = {
    TREND: "trend",
    MULTILINE: "multiline",
  };
  const pickLineChartType = ru.getWeightedRandomFunction({
    [lineChartTypes.TREND]: 3,
    // TODO Uncomment and add multiline charts
    // [lineChartTypes.MULTILINE]: 1
  });

  // Yes this scope is wonky and it would be great if this was a Class for better
  // State Management instead but this is where we are
  const lineDatasetGenerator = (dataPointCount, isAreaChart, lineChartType) => {
    const isDashed = ru.oneInN(3);
    const color = ru.randomAnyRBGAColor(0, 150, 1);
    return {
      label:
        lineChartType !== lineChartTypes.TREND
          ? chartTextGenerator.lineChartLabel()
          : "",

      borderColor: color.toStringHex(),
      borderDash: isDashed ? ru.randomIntArray(4, 5, 25, false) : [],

      fill: isAreaChart ? "origin" : false,
      backgroundColor: color.withAlpha(0.3).toStringHex(true),

      data: ru.randomIntArray(dataPointCount, 1, 100, false),
    };
  };

  const getRandomDatasetCount = ru.getWeightedRandomFunction({
    2: 80,
    3: 17,
    40: 3,
  });

  const getRandomYearArray = (numberOfDataPoints) => {
    const interval = ru.randomInt(2, 12);
    const endYear = new Date().getFullYear() + ru.randomInt(-5, 10);
    const years = ru.generatedArray(numberOfDataPoints, (index) => {
      return endYear - interval * (numberOfDataPoints - index - 1);
    });

    return years;
  };

  const lineChartType = pickLineChartType();
  const dataPointCount = ru.randomInt(4, 8);
  const datasetCount =
    lineChartType === lineChartTypes.TREND ? 1 : getRandomDatasetCount();

  const chartTitle =
    lineChartType === lineChartTypes.TREND
      ? chartTextGenerator.trendLineChartTitle()
      : chartTextGenerator.barChartTitle(); // TODO implement multiline chart specific method

  let widthVw = ru.randomInt(33, 36);
  let heightVw = ru.randomInt(33, 36);
  const size = { x: widthVw, y: heightVw };

  const chartJsData = {
    labels: getRandomYearArray(dataPointCount),
    datasets: ru.generatedArray(datasetCount, () =>
      lineDatasetGenerator(dataPointCount, ru.oneInN(5), lineChartType)
    ),
  };
  // console.log(data);
  const chartJsOptions = {
    legend: {
      display: lineChartType !== lineChartTypes.TREND,
      position: "bottom",
      labels: {
        fontSize: 36,
      },
    }, // Line chart needs this
    title: {
      display: true,
      text: su.titleCase(chartTitle).match(/(\S+\s?){1,5}/g) || [], //clunkily split every few words
      fontSize: 56,
      padding: 20,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            fontSize: 36,
          },
          display: false,
        },
      ],
      xAxes: [
        {
          ticks: {
            fontSize: 48,
          },
          gridLines: {
            display: false, // don't show vertical lines
          },
          display: !ru.oneInN(5), // don't show axis 1/5 times
        },
      ],
    },
    layout: {
      padding: {
        left: 25,
        right: 25,
        top: 0,
        bottom: 15,
      },
    },
    elements: {
      line: {
        borderWidth: 10,
      },
    },
  };

  return createChart("line", size, chartJsData, chartJsOptions, maxWidth);
}

function getRandomChart() {
  let chartType = ru.randomChoice(["bar", "line"]);

  if (chartType == "bar") {
    return getRandomBarChart();
  } else if (chartType == "line") {
    return getRandomLineChart();
  } else {
    throw Error("You somehow selected a chart that doesn't exist");
  }
}

module.exports = {
  // getRandomPieChart,
  getRandomBarChart,
  getRandomLineChart,
  getRandomChart,
};

// TODO WOW THIS HELPS https://tobiasahlin.com/blog/chartjs-charts-to-get-you-started/
