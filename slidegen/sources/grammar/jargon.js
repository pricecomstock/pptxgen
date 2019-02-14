const tracery = require("tracery-grammar");

const grammar = tracery.createGrammar({
  adverb: [ "appropriately", "assertively", "authoritatively", "collaboratively", "compellingly", "competently", "completely", "continually", "conveniently", "credibly", "distinctively", "dramatically", "dynamically", "efficiently", "energistically", "enthusiastically", "fungibly", "globally", "holisticly", "interactively", "intrinsically", "monotonectally", "objectively", "phosfluorescently", "proactively", "professionally", "progressively", "quickly", "rapidiously", "seamlessly", "synergistically", "uniquely" ],
  verb: [ "actualize", "administrate", "aggregate", "architect", "benchmark", "brand", "build", "cloudify", "communicate", "conceptualize", "coordinate", "create", "cultivate", "customize", "deliver", "deploy", "develop", "dinintermediate", "disseminate", "drive", "embrace", "e-enable", "empower", "enable", "engage", "engineer", "enhance", "envisioneer", "evisculate", "evolve", "expedite", "exploit", "extend", "fabricate", "facilitate", "fashion", "formulate", "foster", "generate", "grow", "harness", "impact", "implement", "incentivize", "incubate", "initiate", "innovate", "integrate", "iterate", "leverage", "maintain", "matrix", "maximize", "mesh", "monetize", "morph", "myocardinate", "negotiate", "network", "optimize", "orchestrate", "task", "plagiarize", "pontificate", "predominate", "procrastinate", "productivate", "productize", "promote", "provide", "pursue", "recaptiualize", "reconceptualize", "redefine", "re-engineer", "reintermediate", "reinvent", "repurpose", "restore", "revolutionize", "right-shore", "scale", "seize", "simplify", "strategize", "streamline", "supply", "syndicate", "synergize", "synthesize", "target", "transform", "transition", "underwhelm", "unleash", "utilize", "visualize", "whiteboard" ],
  adjective: [ "24/7", "24/365", "accurate", "adaptive", "agile", "alternative", "expanded array of", "B2B", "B2C", "backend", "backward-compatible", "best-of-breed", "bleeding-edge", "bricks-and-clicks", "business", "clicks-and-mortar", "client-based", "client-centered", "client-centric", "client-focused", "cloud-based", "cloud-centric", "cloudified", "collaborative", "compelling", "competitive", "cooperative", "corporate", "cost effective", "covalent", "cross functional", "cross-media", "cross-platform", "cross-unit", "customer directed", "customized", "cutting-edge", "distinctive", "distributed", "diverse", "dynamic", "e-business", "economically sound", "effective", "efficient", "elastic", "emerging", "empowered", "enabled", "end-to-end", "enterprise", "enterprise-wide", "equity invested", "error-free", "ethical", "excellent", "exceptional", "extensible", "extensive", "flexible", "focused", "frictionless", "front-end", "fully researched", "fully tested", "functional", "functionalized", "fungible", "future-proof", "global", "go forward", "goal-oriented", "granular", "high standards in", "high-payoff", "hyperscale", "high-quality", "highly efficient", "holistic", "impactful", "inexpensive", "independent", "innovative", "installed base", "integrated", "interactive", "interdependent", "intermandated", "interoperable", "intuitive", "just in time", "leading-edge", "leveraged", "long-term high-impact", "low-risk high-yield", "magnetic", "maintainable", "market positioning", "market-driven", "mission-critical", "multidisciplinary", "multifunctional", "multimedia based", "next-generation", "on-demand", "one-to-one", "open-source", "optimal", "organic", "orthogonal", "out-of-the-box", "pandemic", "parallel", "performance based", "plug-and-play", "premier", "premium", "principle-centered", "proactive", "process-centric", "professional", "progressive", "prospective", "quality", "real-time", "reliable", "resource-sucking", "resource-maximizing", "resource-leveling", "revolutionary", "robust", "scalable", "seamless", "stand-alone", "standardized", "standards compliant", "state of the art", "sticky", "strategic", "superior", "sustainable", "synergistic", "tactical", "team building", "team driven", "technically sound", "timely", "top-line", "transparent", "turnkey", "ubiquitous", "unique", "user-centric", "user friendly", "value-added", "vertical", "viral", "virtual", "visionary", "web-enabled", "wireless", "world-class", "worldwide" ],
  noun: [ "action items", "alignments", "applications", "architectures", "bandwidth", "benefits", "best practices", "catalysts", "channels", "clouds", "collaboration", "communities", "content", "convergence", "core competencies", "customer service", "data", "deliverables", "e-business", "e-commerce", "e-markets", "e-tailers", "e-services", "experiences", "expertise", "functionalities", "fungibility", "growth strategies", "human capital", "ideas", "idea-sharing", "imperatives", "infomediaries", "information", "infrastructures", "initiatives", "innovation", "intellectual capital", "interfaces", "leadership", "leadership skills", "manufactured products", "markets", "materials", "meta-services", "methodologies", "methods of empowerment", "metrics", "mindshare", "models", "networks", "niches", "niche markets", "nosql", "opportunities", 'out-of-the-box thinking', "outsourcing", "paradigms", "partnerships", "platforms", "portals", "potentialities", "rocess improvements", "processes", "products", "quality vectors", "relationships", "resources", "results", "ROI", "scenarios", "schemas", "scrums", "services", "solutions", "sources", "sprints", "strategic theme areas", "storage", "supply chains", "synergy", "systems", "technologies", "technology", "testing procedures", "total linkage", "users", "value", "vortals", "web-readiness", "web services", "wins", "virtualization" ],
  nounPreposition: ["access to", "the loss of", "the acquistion of", "summaries of", "exploration of", "maneuvering around", "discovery of"],

  nounPhrase: [ "#adjective# #noun#", "#verb.ed# #noun#", "#adjective#, #adjective# #noun#", "#adverb# #verb.ed# #noun#", "#nounPreposition# #noun#" ],
  verbPhrase: [ "#adverb# #verb#", "#adverb# #verb.ing#", "#adverb# #verb.ed#", "#adverb# and #adverb# #verb.ing#" ],

  shortJargon: [ "#nounPhrase#", "#verbPhrase#", "#verb# #noun#", "#verb.ing# #noun#" ],
  jargon: ["#verbPhrase# #nounPhrase#"]
});

grammar.addModifiers(tracery.baseEngModifiers);
grammar.addModifiers({
  ing(s) {
    // Add -ing, replacing "e" if the word ends in it
    return s.replace(/e?$/, "ing");
  }
});

console.log(grammar.flatten("#shortJargon#"));
console.log(grammar.flatten("#jargon#"));

function generateJargonPhrase() {
  return grammar.flatten("#jargon#");
}

function generateShortJargonPhrase() {
  return grammar.flatten("#shortJargon#");
}

// module.exports = {
//   generateJargonPhrase,
//   generateShortJargonPhrase
// }
