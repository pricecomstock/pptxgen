const grammar = require("../grammar");
const ru = require("../../../utils/randUtils");

const chooseBarXGenerationTemplate = ru.getWeightedRandomFunction({
  barChartXAxis1: 2,
  barChartXAxis2: 1
});

function barChartTitle() {
  return grammar.flatten("#barChartTitle.capitalize#");
}

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

function trendLineChartTitle() {
  return grammar.flatten("#trendLineChartTitle.capitalize#");
}
function lineChartLabel() {
  const generationTemplate = chooseBarXGenerationTemplate();
  return grammar.flatten(`#${generationTemplate}#`);
}

module.exports = {
  barChartTitle,
  barChartXAxisSingle,
  barChartXAxisArray,
  lineChartLabel,
  trendLineChartTitle
};
