const ru = require("../../utils/randUtils");
const chartTextGenerator = require("../grammar/generators/chartText");

const maxWidth = "100%";

function createChart(chartType, size, chartJsData, chartJsOptions, maxWidth) {
  return {
    chartType,
    size,
    chartJsData,
    chartJsOptions,
    maxWidth
  };
}

function getRandomBarChart() {
  const barDatasetGenerator = dataPointCount => {
    return {
      // label: grammar.flatten('#field#'),
      // data: ru.randomIntArray(dataPointCount,1,5,false),
      data: ru.randomIntArray(dataPointCount, 1, 10, false),
      backgroundColor: ru.generatedArray(dataPointCount, ru.randomDarkHexColor)
      // borderSkipped: true
    };
  };

  const numData = ru.randomInt(2, 3);

  let widthVw = ru.randomInt(33, 36);
  let heightVw = ru.randomInt(33, 36);
  const size = { x: widthVw, y: heightVw };

  const chartJsData = {
    labels: chartTextGenerator.barChartXAxisArray(numData),
    datasets: [barDatasetGenerator(numData)]
  };
  // console.log(data);
  const chartJsOptions = {
    legend: { display: false },
    title: {
      display: true,
      text: chartTextGenerator.chartTitle().match(/(\S+\s?){1,5}/g) || [], //clunkily split every few words
      fontSize: 56,
      padding: 20
    },
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            fontSize: 36
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            fontSize: 48
          }
        }
      ]
    },
    layout: {
      padding: {
        left: 25,
        right: 25,
        top: 0,
        bottom: 15
      }
    }
  };

  return createChart("bar", size, chartJsData, chartJsOptions, maxWidth);
}

function getRandomLineChart() {
  const lineDatasetGenerator = (dataPointCount, isAreaChart) => {
    const isDashed = ru.oneInN(3);
    const color = ru.randomAnyRBGAColor(0, 170, 1);
    return {
      label: chartTextGenerator.lineChartLabel(),

      borderColor: color.toStringHex(),
      borderDash: isDashed ? ru.randomIntArray(4, 5, 25, false) : [],

      fill: isAreaChart ? "origin" : false,
      backgroundColor: color.withAlpha(0.3).toStringHex(true),

      data: ru.randomIntArray(dataPointCount, 1, 10, false)
    };
  };

  const getRandomDatasetCount = ru.getWeightedRandomFunction({
    1: 30,
    2: 60,
    3: 7,
    40: 3
  });

  const dataPointCount = ru.randomInt(4, 8);
  const datasetCount = getRandomDatasetCount();

  let widthVw = ru.randomInt(33, 36);
  let heightVw = ru.randomInt(33, 36);
  const size = { x: widthVw, y: heightVw };

  const chartJsData = {
    labels: ru.randomIntArray(dataPointCount, 1, 10),
    datasets: ru.generatedArray(datasetCount, () =>
      lineDatasetGenerator(dataPointCount, ru.oneInN(5))
    )
  };
  // console.log(data);
  const chartJsOptions = {
    legend: { display: true }, // Line chart needs this
    title: {
      display: true,
      text: chartTextGenerator.chartTitle().match(/(\S+\s?){1,5}/g) || [], //clunkily split every few words
      fontSize: 56,
      padding: 20
    },
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            fontSize: 36
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            fontSize: 48
          }
        }
      ]
    },
    layout: {
      padding: {
        left: 25,
        right: 25,
        top: 0,
        bottom: 15
      }
    }
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
  getRandomChart
};

// TODO WOW THIS HELPS https://tobiasahlin.com/blog/chartjs-charts-to-get-you-started/
