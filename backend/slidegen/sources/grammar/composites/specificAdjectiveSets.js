const { encouragingWord } = require("../corpora/corpora");

const specificAdjectiveSets = {
  grandioseAdjective: encouragingWord.filter(word => {
    return !["bravo", "congratulations"].includes(word);
  })
};

module.exports = specificAdjectiveSets;
