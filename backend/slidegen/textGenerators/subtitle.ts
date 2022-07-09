const grammar = require("../sources/grammar/grammar");
import {
  WeightedChoice,
  weightedRandomChoiceFunction,
} from "../utils/randUtils";

const subtitleGenerator = weightedRandomChoiceFunction<() => string>([
  new WeightedChoice(() => "", 10),
  new WeightedChoice(() => grammar.flatten("#sponsorship#"), 3),
]);

export function getSubtitle(): string {
  return subtitleGenerator()();
}
