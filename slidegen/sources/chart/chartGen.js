const grammar = require('../grammar/grammar');
const ru = require('../../utils/randUtils');
const randomChoice = require('../../utils/randUtils').randomChoice
const getWeightedRandomFunction = require('../../utils/randUtils').getWeightedRandomFunction

const getRandomAspectRatio = getWeightedRandomFunction({
    'ct-square': 5,
    'ct-octave': 5,
    'ct-golden-section': 5,
    'ct-perfect-fifth': 5,
    'ct-perfect-fourth': 5,
    'ct-major-sixth': 5,
    'ct-double-octave': 1
})

const maxWidth = "100%"

function createChart(chartType, aspect, data, maxWidth) {
    return {
        chartType,
        aspect,
        data,
        maxWidth
    }
}

function getRandomPieChart() {
    const aspect = "ct-square" // no random for pie chart
    const data = {

    }
    
    return createChart('pie', aspect, data, maxWidth)
}

function getRandomBarChart() {
    const aspect = getRandomAspectRatio();
    
    
    return createChart('bar', aspect, data, maxWidth)
}

function getRandomLineChart() {
    const aspect = getRandomAspectRatio();
    const data = {
        labels: ['A', 'B', 'C', 'D', 'E'],
        series: [
            ru.randomIntArray(6, 0, 10, ru.oneInN(2))
        ]
    }
    
    return createChart('line', aspect, data, maxWidth)
}

function getRandomChart() {
    // DELETETHIS after testing
    return getRandomLineChart();

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