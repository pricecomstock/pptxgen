// Functions for generating lists of items that fit a particular category
import { generatedArray, randomChoice } from "../utils/randUtils";
const grammar = require("../sources/grammar/grammar");

function listGeneratorForGrammarTemplate(
  grammarTemplate: string
): (length: number) => string[] {
  return (length) => {
    return generatedArray(length, () => grammar.flatten(grammarTemplate));
  };
}

export const nounList = listGeneratorForGrammarTemplate("#noun#");
export const adjectiveList = listGeneratorForGrammarTemplate("#adjective#");
export const verbList = listGeneratorForGrammarTemplate("#verb#");

export const emojiList = listGeneratorForGrammarTemplate("#emoji#");
export const applianceList = listGeneratorForGrammarTemplate("#appliance#");
export const newTechnologyList =
  listGeneratorForGrammarTemplate("#newTechnology#");
export const sportList = listGeneratorForGrammarTemplate("#sport#");

// Composite lists
const allListGenerators = [nounList, adjectiveList, verbList, emojiList];
export const randomList = randomChoice(allListGenerators);
