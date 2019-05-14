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

function getRandomPieChart() {
  const aspect = "ct-square"; // no random for pie chart
  const data = {};

  options = {};

  return createChart("pie", aspect, data, options, maxWidth);
}

function getRandomBarChart() {
  const barDatasetGenerator = dataPointCount => {
    return {
      // label: grammar.flatten('#field#'),
      // data: ru.randomIntArray(dataPointCount,1,5,false),
      data: ru.randomIntArray(dataPointCount, 1, 10, false),
      backgroundColor: ru.generatedArray(dataPointCount, ru.randomColor)
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

function getRandomChart() {
  // DELETETHIS after testing
  return getRandomBarChart();

  // let chartType = ru.randomChoice('bar', 'line', 'pie');

  // if (chartType == 'bar') {
  //     return getRandomPieChart();
  // } else if (chartType == 'line') {
  //     return getRandomBarChart();
  // } else {
  //     return getRandomLineChart();
  // }
}

function getRandomLineChart() {
  // TODO this is just copy pasted because I'll need something like it
  const lineDatasetGenerator = index => {
    return {
      label: grammar.flatten("#field#"),
      data: [ru.randomInt, index],
      backgroundColor: ru.randomColor(),
      borderSkipped: true
    };
  };
}

module.exports = {
  // getRandomPieChart,
  // getRandomBarChart,
  // getRandomLineChart,
  getRandomChart
};

// TODO WOW THIS HELPS https://tobiasahlin.com/blog/chartjs-charts-to-get-you-started/
