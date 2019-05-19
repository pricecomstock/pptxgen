const chartText = {
  pollGroup: ["#occupation.s#", "experts in #field#"],
  barChartTitle: [
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
  ],

  trendable: [
    "#adjective#",
    "#verb.ing#",
    "#ergativeVerb#",
    "#mood#",
    "#netflixGenre#",
    "#musicGenre#",
    "#noun.s#",
    "#personalNoun.s#",
    "#organization#",
    "#instrument.s#",
    "#stateOfInebriation#",
    "#toxicChemical#",
    "#disease#"
  ],

  trendLineChartTitle: [
    "#trendable# over time",
    "popularity of #trendable#",
    "#trendable# trends",
    "history of #trendable#"
  ]
};

module.exports = chartText;
