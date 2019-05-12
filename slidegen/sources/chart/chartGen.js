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
    const numberOfDatasets = 6;


    const size = {x:100, y:50}
    const chartJsData = {
        label: ['A', 'B', 'C', 'D', 'E', 'F'],
        // datasets: ru.randomIntArray(numberOfDatasets, 0, 15, ru.oneInN(2)),
        datasets: [
            {
                label: '# of votes',
                data: ru.randomIntArray(numberOfDatasets, 0, 15, ru.oneInN(2)),
                backgroundColor: ru.generatedArray(numberOfDatasets, ru.randomColor),
                borderColor: ru.generatedArray(numberOfDatasets, ru.randomColor)
            }
        ],
    };
    // console.log(data);
    const chartJsOptions = {}

    return createChart('bar', size, chartJsData, chartJsOptions, maxWidth)
}

function getRandomLineChart() {
    const aspect = getRandomAspectRatio();
    const data = {
        labels: ['A', 'B', 'C', 'D', 'E'],
        series: [
            ru.randomIntArray(6, 0, 10, ru.oneInN(2))
        ]
    }

    options = {}

    // const options = {
    //     width: 300,
    //     height:200
    // }
    
    return createChart('line', aspect, data, options, maxWidth)
}

function getRandomChart() {
    // DELETETHIS after testing
    return getRandomBarChart();

    let chartType = randomChoice('bar', 'line', 'pie');

    if (chartType == 'bar') {
        return getRandomPieChart();
    } else if (chartType == 'line') {
        return getRandomBarChart();
    } else {
        return getRandomLineChart();
    }
}

module.exports = {
    getRandomPieChart,
    getRandomBarChart,
    getRandomLineChart,
    getRandomChart
}