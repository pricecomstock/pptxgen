const grammar = require('../grammar/grammar');
const ru = require('../../utils/randUtils');
const randomChoice = require('../../utils/randUtils').randomChoice
const getWeightedRandomFunction = require('../../utils/randUtils').getWeightedRandomFunction



const maxWidth = "100%"

function createChart(chartType, size, chartJsData, chartJsOptions, maxWidth) {
    return {
        chartType,
        size,
        chartJsData,
        chartJsOptions,
        maxWidth
    }
}

function getRandomPieChart() {
    const aspect = "ct-square" // no random for pie chart
    const data = {

    }

    options = {}
    
    return createChart('pie', aspect, data, options, maxWidth)
}

function getRandomBarChart() {
    const barDatasetGenerator = (dataPointCount) => {
        return {
            // label: grammar.flatten('#field#'),
            // data: ru.randomIntArray(dataPointCount,1,5,false),
            data: ru.randomIntArray(dataPointCount, 1, 10, false),
            backgroundColor: ru.generatedArray(dataPointCount, ru.randomColor),
            // borderSkipped: true
        }
    }

    
    const numData = 6;


    const size = {x:100, y:50}
    const chartJsData = {
        labels: ru.generatedArray(numData, () => grammar.flatten('#field#')),
        datasets: [barDatasetGenerator(numData)],
    };
    // console.log(data);
    const chartJsOptions = {
        legend: {display: false},
        title: {
            display: true,
            text: grammar.flatten('#aboutMe#'),
            fontSize: 20,
            padding: 20
        },
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 0,
                    fontSize: 24
                }
            }],
            xAxes: [{
                ticks: {
                    fontSize: 16
                }
            }]
        },
        layout: {
            padding: {
                left: 25,
                right: 25,
                top: 0,
                bottom: 15
            }
        }
    }

    return createChart('bar', size, chartJsData, chartJsOptions, maxWidth)
}

function getRandomChart() {
    // DELETETHIS after testing
    return getRandomBarChart();

    // let chartType = randomChoice('bar', 'line', 'pie');

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
    const lineDatasetGenerator = (index) => {
        return {
            label: grammar.flatten('#field#'),
            data: [ru.randomInt, index],
            backgroundColor: ru.randomColor(),
            borderSkipped: true
        }
    }
}

module.exports = {
    // getRandomPieChart,
    // getRandomBarChart,
    // getRandomLineChart,
    getRandomChart
}


// TODO WOW THIS HELPS https://tobiasahlin.com/blog/chartjs-charts-to-get-you-started/