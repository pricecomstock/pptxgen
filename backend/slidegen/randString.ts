const randomChoice = require("./utils/randUtils").randomChoice;
const getWeightedRandomFunction = require("./utils/randUtils")
  .getWeightedRandomFunction;
const wikipedia = require("./sources/wikipedia");
const reddit = require("./sources/reddit");
const jargonCreator = require("./sources/grammar/generators/jargon");
const misc = require("./sources/miscApi");
const fs = require("fs");
const csvParse = require("csv-parse/lib/sync");
const stringLists = require("./sources/stringLists");
const aboutMeGenerator = require("./sources/grammar/generators/aboutMe");
const boldClaimGenerator = require("./sources/grammar/generators/boldClaim");

export function titleCase(s) {
  return s.replace(/\w*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

let books = [];
fs.readFile("backend/slidegen/sources/txt/books.csv", "utf8", (err, data) => {
  if (err) throw err;
  books = csvParse(data, {
    columns: true,
    cast: true,
  }).map((record) => {
    return {
      title: record.original_title,
      authors: record.authors,
    };
  });
});

let jeopardy = [];
fs.readFile(
  "backend/slidegen/sources/txt/jeopardy.csv",
  "utf8",
  (err, data) => {
    if (err) throw err;
    jeopardy = csvParse(data, {
      columns: true,
    })
      .map((record) => {
        return {
          category: titleCase(record.category),
          question: record.question,
          answer: record.answer,
        };
      })
      .filter((record) => {
        return !record.question.includes("<a href"); // filter out image based jeopardy questions
      });
  }
);

let quotes = [];
fs.readFile(
  "backend/slidegen/sources/txt/author-quote.txt",
  "utf8",
  (err, data) => {
    if (err) throw err;
    let lines = data.split("\n");

    quotes = lines.map((line) => {
      let splitILine = line.split("\t");
      let author = splitILine[0];
      let quote = splitILine[1];
      return {
        author: author,
        quote: quote,
      };
    });
  }
);

export async function wikiTitle(): Promise<string> {
  let article = await wikipedia.getRandomWikipediaArticle();
  return article.title;
}

export async function wikiExtract(): Promise<string> {
  let article = await wikipedia.getRandomWikipediaArticle();
  return article.extract;
}

export async function wikiExtractExcerpt(): Promise<string> {
  // Gets one sentence from an extract
  let article = await wikipedia.getRandomWikipediaArticle();
  let extractSentences = article.extract.split(".").filter((sentence) => {
    return !(sentence.trim() == "");
  });
  return randomChoice(extractSentences) + ".";
}

export async function wikiDescription(): Promise<string> {
  let article = await wikipedia.getRandomWikipediaArticle();
  return article.description;
}

export async function wikiAll(): Promise<string> {
  return await wikipedia.getRandomWikipediaArticle();
}

export function jargon(): string {
  return jargonCreator.generateJargonPhrase();
}

export function shortJargon(): string {
  return jargonCreator.generateShortJargonPhrase();
}

export function quoteAndAuthor(): string {
  return randomChoice(quotes);
}

export function quote(): string {
  return randomChoice(quotes).quote;
}

export function quoteAuthor(): string {
  return randomChoice(quotes).author;
}

export function bookTitle(): string {
  return randomChoice(books).title;
}

export function bookAuthor(): string {
  return randomChoice(books).authors;
}

export function jeopardyAnswer(): string {
  return randomChoice(jeopardy).answer;
}

export function jeopardyQuestion(): string {
  return randomChoice(jeopardy).question;
}

export function jeopardyCategory(): string {
  return randomChoice(jeopardy).category;
}

export async function redditNoContext(): Promise<string> {
  return await reddit.randomTitleFromSubreddit("nocontext");
}

export async function redditStrange(): Promise<string> {
  return await reddit.randomTitleFromMultireddit([
    "fifthworldproblems",
    "fifthworldproblems",
    "fifthworldproblems",
    "totallynotrobots",
    "nosleep",
    "shittyadvice",
    "enlightenedbirdmen",
  ]);
}

export async function redditAdvice(): Promise<string> {
  return await reddit.randomTitleFromMultireddit([
    "advice",
    "relationships",
    "legalAdvice",
    "anxiety",
    "shittyadvice",
    "frugal",
    "minimalism",
    "socialskills",
    "fitness",
    "writing",
    "christianity",
    "entrepreneur",
  ]);
}

export async function redditPhrases(): Promise<string> {
  return await reddit.randomTitleFromMultireddit([
    "showerthoughts",
    "pointlessstories",
  ]);
}

export async function redditQuestion(): Promise<string> {
  return await reddit.randomTitleFromSubreddit("nostupidquestions");
}

export function getToKnowQuestion(): Promise<string> {
  return randomChoice(stringLists.questionsToGetToKnowSomeone);
}

export function philisophicalQuestion(): Promise<string> {
  return randomChoice(stringLists.philisophicalQuestions);
}

export async function compositeQuestion(): Promise<string> {
  const choice = Math.random();

  if (choice <= 0.5) {
    return getToKnowQuestion();
  } else if (choice <= 0.8) {
    return await redditQuestion();
  } else {
    return philisophicalQuestion();
  }
}

export async function compositePhrase(): Promise<string> {
  const choice = Math.random();

  if (choice <= 0.25) {
    return jeopardyQuestion();
  } else if (choice <= 0.4) {
    return boldClaimGenerator.boldClaim();
  } else if (choice <= 0.55) {
    return quote();
  } else if (choice <= 0.65) {
    return await misc.getRandomAdvice();
  } else if (choice <= 0.71) {
    return await misc.getNumberTrivia();
  } else if (choice <= 0.73) {
    return jargon();
  } else if (choice <= 0.76) {
    return shortJargon();
  } else {
    const redditChoice = Math.random();
    if (redditChoice <= 0.4) {
      return await redditAdvice();
    } else if (redditChoice <= 0.8) {
      return await redditStrange();
    } else {
      return await redditPhrases();
    }
  }
}

export async function compositeTopic(): Promise<string> {
  const choice = Math.random();

  if (choice <= 0.5) {
    return await wikiTitle();
  } else if (choice <= 0.7) {
    return jeopardyAnswer();
  } else if (choice <= 0.85) {
    return bookTitle();
  } else {
    return jeopardyCategory();
  }
}

export async function compositeTitle(): Promise<string> {
  const chooser = getWeightedRandomFunction({
    wiki: 10,
    book: 20,
    jeopardyAnswer: 50,
    jeopardyCategory: 20,
  });

  const choice = chooser();

  if (choice === "wiki") {
    return await wikiTitle();
  } else if (choice === "book") {
    return bookTitle();
  } else if (choice === "jeopardyAnswer") {
    return jeopardyAnswer();
  } else {
    return jeopardyCategory();
  }
}

export async function compositeProfound(): Promise<string> {
  const choice = Math.random();

  if (choice <= 0.5) {
    return await compositeQuestion();
  } else if (choice <= 0.75) {
    return quote();
  } else if (choice <= 0.87) {
    return await misc.getInspirationalQuote();
  } else if (choice <= 0.95) {
    return await redditPhrases();
  } else {
    return await redditStrange();
  }
}

export async function compositeHuman(): Promise<string> {
  const choice = Math.random();

  if (choice <= 0.5) {
    return quoteAuthor();
  } else {
    return bookAuthor();
  }
}

export async function compositeBullet(): Promise<string> {
  const choice = Math.random();

  if (choice <= 0.8) {
    return await compositePhrase();
  } else if (choice <= 0.95) {
    return await compositeQuestion();
  } else {
    return await compositeTopic();
  }
}

export function aboutMe(): string {
  return aboutMeGenerator.aboutMe();
}

module.exports = {
  wikiTitle,
  wikiExtract,
  wikiExtractExcerpt,
  wikiDescription,
  wikiAll,
  jargon,
  shortJargon,
  quoteAndAuthor,
  quote,
  quoteAuthor,
  bookTitle,
  bookAuthor,
  jeopardyAnswer,
  jeopardyQuestion,
  jeopardyCategory,
  redditQuestion,
  getToKnowQuestion,
  philisophicalQuestion,
  compositeQuestion,
  compositePhrase,
  compositeTopic,
  redditNoContext,
  redditStrange,
  redditAdvice,
  redditPhrases,
  compositeHuman,
  compositeBullet,
  compositeProfound,
  compositeTitle,
  aboutMe,
};
