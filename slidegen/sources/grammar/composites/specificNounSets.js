const specificNounSets = {
  organization: [
    "#charity#",
    "#company#",
    "#company# and #charity#",
    "#company# and #company#",
    "#charity# and #company#",
    "Big #industry.capitalizeAll#",
    "#usGovAgency#",
    "#newspaper#"
  ],

  sportsTeam: [
    "#nflTeam#",
    "#nhlTeam#",
    "#nbaTeam#",
    "#mlbTeam#",
    "#eplTeam#",
    "#laligaTeam#"
  ],

  fightingMove: ["#wrestlingMove#", "#streetFighterMove#"],
  field: ["#iabCategory#", "#industry#", "#academicSubject#", "#artType#"],
  opinionTarget: [
    "#field#",
    "#artType#",
    "#occupation.s#",
    "#charity#",
    "#eventType#",
    "#appliance.s#"
  ]
};

module.exports = specificNounSets;
