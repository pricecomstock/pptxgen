const { DeckRandomizer, generatedArray } = require("../../../utils/randUtils");
const grammar = require("../grammar");

function aboutMe() {
  return grammar.flatten("#aboutMe#");
}

function uniqueAboutMeArray(length) {
  const deck = new DeckRandomizer(grammar.raw["aboutMe"]);
  return generatedArray(length, () => grammar.flatten(deck.draw()));
}

module.exports = {
  aboutMe,
  uniqueAboutMeArray,
};
