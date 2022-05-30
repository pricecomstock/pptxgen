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

function titleCase(s) {
  return s.replace(/\w*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

var books = [];
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

var jeopardy = [];
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

var quotes = [];
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

async function wikiTitle() {
  let article = await wikipedia.getRandomWikipediaArticle();
  return article.title;
}

async function wikiExtract() {
  let article = await wikipedia.getRandomWikipediaArticle();
  return article.extract;
}

async function wikiExtractExcerpt() {
  // Gets one sentence from an extract
  let article = await wikipedia.getRandomWikipediaArticle();
  let extractSentences = article.extract.split(".").filter((sentence) => {
    return !(sentence.trim() == "");
  });
  return randomChoice(extractSentences) + ".";
}

async function wikiDescription() {
  let article = await wikipedia.getRandomWikipediaArticle();
  return article.description;
}

async function wikiAll() {
  return await wikipedia.getRandomWikipediaArticle();
}

function jargon() {
  return jargonCreator.generateJargonPhrase();
}

function shortJargon() {
  return jargonCreator.generateShortJargonPhrase();
}

function quoteAndAuthor() {
  return randomChoice(quotes);
}

function quote() {
  return randomChoice(quotes).quote;
}

function quoteAuthor() {
  return randomChoice(quotes).author;
}

function bookTitle() {
  return randomChoice(books).title;
}

function bookAuthor() {
  return randomChoice(books).authors;
}

function jeopardyAnswer() {
  return randomChoice(jeopardy).answer;
}

function jeopardyQuestion() {
  return randomChoice(jeopardy).question;
}

function jeopardyCategory() {
  return randomChoice(jeopardy).category;
}

async function redditNoContext() {
  return await reddit.randomTitleFromSubreddit("nocontext");
}

async function redditStrange() {
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

async function redditAdvice() {
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
  ]);
}
async function redditPhrases() {
  return await reddit.randomTitleFromMultireddit([
    "showerthoughts",
    "pointlessstories",
  ]);
}

async function redditQuestion() {
  return await reddit.randomTitleFromSubreddit("nostupidquestions");
}

function getToKnowQuestion() {
  return randomChoice(stringLists.questionsToGetToKnowSomeone);
}

function philisophicalQuestion() {
  return randomChoice(stringLists.philisophicalQuestions);
}

async function compositeQuestion() {
  const choice = Math.random();

  if (choice <= 0.5) {
    return getToKnowQuestion();
  } else if (choice <= 0.8) {
    return await redditQuestion();
  } else {
    return philisophicalQuestion();
  }
}

async function compositePhrase() {
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

async function compositeTopic() {
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

async function compositeTitle() {
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

async function compositeProfound() {
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

async function compositeHuman() {
  const choice = Math.random();

  if (choice <= 0.5) {
    return quoteAuthor();
  } else {
    return bookAuthor();
  }
}

async function compositeBullet() {
  const choice = Math.random();

  if (choice <= 0.8) {
    return await compositePhrase();
  } else if (choice <= 0.95) {
    return await compositeQuestion();
  } else {
    return await compositeTopic();
  }
}

function aboutMe() {
  return aboutMeGenerator.aboutMe();
}

// setTimeout(async () => {
//   console.debug("Composite Bullet:", await compositeBullet())
//   console.debug("Composite Topic:", await compositeTopic())
//   console.debug("Composite Human:", await compositeHuman())
//   console.debug("Composite Phrase:", await compositePhrase())
//   console.debug("Composite Question:", await compositeQuestion())
// }, 3000)

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
