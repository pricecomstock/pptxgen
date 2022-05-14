const boldClaims = {
  boldClaim: [
    "#claimSubject.is.capitalize# actually #claimDescription#",
    "#claimAuthority# #claimSubject.is# #claimDescription#",
    "#claimAuthority# #claimSubject# #claimVerb#",
    "I've #createVerb.ed# #grandioseAdjective.a# #claimObject.singularize.noArticle#!",
    "#organization# is #createVerb.ing# #adjective# #claimObject.noArticle.pluralize#!",
    "It is now possible to #verb# #claimObject#",
    "#verb.ing.capitalize# is now considered #characterQuality#"
  ],

  claimAuthority: [
    "There is mounting evidence that",
    "There is scientific consensus that",
    "It is undeniable:",
    "I will convince you that",
    "My #authorityFigure# told me that",
    "Listen to me:",
    "After years of study, I know that",
    "#interjection.capitalize#!",
    "#honorific.capitalize#!"
  ],

  claimSubject: [
    "#eventType.pluralize#",
    "#settingType.pluralize#",
    "#animal.pluralize#",
    "the #animal#",
    "#netflixGenre.lowercase# films",
    "#bodyFluid#",
    "#infectiousDisease#",
    "#monster.pluralize#",
    "#noun.a#",
    "the #object#",
    "#object.a#",
    "#object.pluralize#",
    "#clothing#",
    "the #sportsTeam#"
  ],

  claimObject: [
    "#eventType.s#",
    "#settingType.s#",
    "#room#",
    "#animal.s#",
    "the #animal#",
    "#noun.a#",
    "#object.a#",
    "#object.s#",
    "#clothing#"
  ],

  // preceded by be-verb
  claimDescription: [
    "made of #object.pluralize#",
    "destroying #noun.s# as we know it",
    "#adjective#",
    "#verb.ing# #noun.s#",
    "about to #ergativeVerb#!!",
    "#ergativeVerb.ing# #noun.s#",
    "#severityModifier# #humanAdjective#"
  ],

  // directly after subject
  claimVerb: [
    "makes people feel #mood#",
    "feels like #noun#",
    "can be #adjective#",
    "can be #verb.ed#",
    "#ergativeVerb.s#"
  ]
};

module.exports = boldClaims;
