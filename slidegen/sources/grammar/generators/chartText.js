const grammar = require("../grammar");
const ru = require("../../../utils/randUtils");

function chartTitle() {
  return grammar.flatten("#chartTitle#");
}

const chooseBarXGenerationTemplate = ru.getWeightedRandomFunction({
  barChartXAxis1: 2,
  barChartXAxis2: 1
});
function barChartXAxisArray(count) {
  generationTemplate = chooseBarXGenerationTemplate();
  return ru.generatedArray(count, () =>
    grammar.flatten(`#${generationTemplate}#`)
  );
}
function barChartXAxisSingle(count) {
  generationTemplate = chooseBarXGenerationTemplate();
  return grammar.flatten(`#${generationTemplate}#`);
}

module.exports = {
  chartTitle,
  barChartXAxisSingle,
  barChartXAxisArray
};
