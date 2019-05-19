const chartText = {
  pollGroup: ["#occupation.s#", "experts in #field#"],
  chartTitle: [
    "",
    "",
    "#noun# comparison",
    "#adjective# comparison",
    "#field#",
    "#environmentalHazard#",
    "What's better?",
    "I polled a group of #pollGroup#",
    "What #pollGroup# prefer"
  ],

  // Bar Charts
  barChartXAxis1: [
    "#noun#",
    "#fightingMove#",
    "#organization#",
    "#disease#",
    "#musicGenre#",
    "#country#",
    "#instrument#",
    "#plant#",
    "#bodyFluid#",
    "#city#",
    "#sportsTeam#",
    "#computerTechnology#",
    "#netflixGenre#"
  ],
  barChartXAxis2: [
    "#verb.ing#",
    "#ergativeVerb#",
    "#infinitiveVerb#",
    "#emoji#",
    "#mood#"
  ],

  // Line Charts
  lineChartLabel: [
    "#barChartXAxis1#" // TODO shhhh this is fine it doesn't need it's own data
  ]
};

module.exports = chartText;
