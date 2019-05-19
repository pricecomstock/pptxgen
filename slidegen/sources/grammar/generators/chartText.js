const grammar = require("../grammar");
const ru = require("../../../utils/randUtils");

function chartTitle() {
  return grammar.flatten("#chartTitle.capitalize#");
}

const chooseBarXGenerationTemplate = ru.getWeightedRandomFunction({
  barChartXAxis1: 2,
  barChartXAxis2: 1
});
function barChartXAxisArray(count) {
  const generationTemplate = chooseBarXGenerationTemplate();
  return ru.generatedArray(count, () =>
    grammar.flatten(`#${generationTemplate}#`)
  );
}
function barChartXAxisSingle() {
  const generationTemplate = chooseBarXGenerationTemplate();
  return grammar.flatten(`#${generationTemplate}#`);
}

function lineChartLabel() {
  // generationTemplate = chooseBarXGenerationTemplate();
  return grammar.flatten(`#lineChartLabel#`);
}

module.exports = {
  chartTitle,
  barChartXAxisSingle,
  barChartXAxisArray,
  lineChartLabel
};
