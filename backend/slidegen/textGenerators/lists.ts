// Functions for generating lists of items that fit a particular category
import { generatedArray, randomChoice } from "../utils/randUtils";
const grammar = require("../sources/grammar/grammar");

/**
 * Returns a list of items generated by the given template.
 */
export function getListFromGrammarTemplate(
  grammarTemplate: string,
  length: number
) {
  return generatedArray(length, () => grammar.flatten(grammarTemplate));
}

/**
 * Picks a template from an array and uses it to generate items in a list of length length.
 *
 * Given a template #template# you can fetch a list of raw child templates
 * using grammar.raw["template"]
 * Note that this doesn't have surrounding ##
 */
export function getListFromRandomGrammarTemplate(
  grammarTemplateArray: string[],
  length: number
) {
  const grammarTemplate = randomChoice(grammarTemplateArray);
  return getListFromGrammarTemplate(grammarTemplate, length);
}

// Below here are generated functions for a specific type. Everything is going to be pretty
// tied into corpora, so I'm not sure there's any point to pre-generating functions

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