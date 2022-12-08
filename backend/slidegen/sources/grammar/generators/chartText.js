const grammar = require("../grammar");

const {
  getListFromRandomGrammarTemplate,
} = require("../../../textGenerators/lists");

function barChartTitle() {
  return grammar.flatten("#barChartTitle.capitalize#");
}

function barChartXAxisArray(count) {
  return getListFromRandomGrammarTemplate(grammar.raw["barChartXAxis"], count);
}

function barChartXAxisSingle() {
  return grammar.flatten(`#barChartXAxis#`);
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
  trendLineChartTitle,
};
