const randomChoice = require('./utils/randUtils').randomChoice
const wikipedia = require('./sources/wikipedia')
const reddit = require('./sources/reddit')
const jargonCreator = require('./sources/jargon')
const fs = require('fs');
const csvParse = require('csv-parse/lib/sync')
const stringLists = require('./sources/stringLists')

var books = []
fs.readFile('slidegen/sources/txt/books.csv', 'utf8', (err, data) => {
  if (err) throw err;
  books = csvParse(data, {
    columns: true,
    cast: true
  })
  .map( record => {
    return {
        title: record.original_title,
        authors: record.authors
      }
  })
})

var jeopardy = []
fs.readFile('slidegen/sources/txt/jeopardy.csv', 'utf8', (err, data) => {
  if (err) throw err;
  jeopardy = csvParse(data, {
    columns: true,
    cast: true
  })
  .map( record => {
    return {
        category: record.category,
        question: record.question,
        answer: record.answer
      }
  })
})

var quotes = []
fs.readFile('slidegen/sources/txt/author-quote.txt', 'utf8', (err, data) => {
  if (err) throw err;
  let lines = data.split('\n')

  quotes = lines.map( line => {
    let splitILine = line.split('\t')
    let author = splitILine[0]
    let quote = splitILine[1]
    return {
      author: author,
      quote: quote
    }
  })
})

async function wikiTitle() {
  let article = await wikipedia.getRandomWikipediaArticle()
  return article.title;
}

async function wikiExtract() {
  let article = await wikipedia.getRandomWikipediaArticle()
  return article.extract;
}

async function wikiExtractExcerpt() {
  // Gets one sentence from an extract
  let article = await wikipedia.getRandomWikipediaArticle()
  let extract = article.extract;
  return randomChoice(extract.split(".")) + "."
}

async function wikiDescription() {
  let article = await wikipedia.getRandomWikipediaArticle()
  return article.description;
}

async function wikiAll() {
  return await wikipedia.getRandomWikipediaArticle()
}

function jargon() {
  return jargonCreator.generateJargonPhrase()
}

function shortJargon() {
  return jargonCreator.generateShortJargonPhrase()
}

function quoteAndAuthor() {
  return randomChoice(quotes)
}

function quote() {
  return randomChoice(quotes).quote
}

function quoteAuthor() {
  return randomChoice(quotes).author
}

function bookTitle() {
  return randomChoice(books).title
}

function bookAuthor() {
  return randomChoice(books).authors
}

function jeopardyAnswer() {
  return randomChoice(jeopardy).answer
}

function jeopardyQuestion() {
  return randomChoice(jeopardy).question
}

function jeopardyCategory() {
  return randomChoice(jeopardy).category
}

async function redditNoContext() {
  return await reddit.randomTitleFromSubreddit("nocontext")
}

async function redditStrange() {
  return await reddit.randomTitleFromMultireddit([
    "fifthworldproblems",
    "fifthworldproblems",
    "fifthworldproblems",
    "totallynotrobots",
    "nosleep",
    "shittyadvice",
    "enlightenedbirdmen"
  ])
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
    "aspergers"
  ])
}
async function redditPhrases() {
  return await reddit.randomTitleFromMultireddit([
    "showerthoughts",
    "pointlessstories"
  ])
}

async function redditQuestion() {
  return await reddit.randomTitleFromSubreddit("nostupidquestions")
}

function getToKnowQuestion() {
  return randomChoice(stringLists.questionsToGetToKnowSomeone)
}

function philisophicalQuestion() {
  return randomChoice(stringLists.philisophicalQuestions)
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
  } else if (choice <= 0.5) {
    return await wikiDescription();
  } else if (choice <= 0.7) {
    return quote();
  } else if (choice <= 0.77) {
    return jargon();
  } else if (choice <= 0.85) {
    return shortJargon();
  } else {
    const redditChoice = Math.random();
    if (redditChoice <= 0.5) {
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

  if (choice <= 0.4) {
    return wikiTitle();
  } else if (choice <= 0.7) {
    return jeopardyAnswer();
  } else if (choice <= 0.85) {
    return bookTitle();
  } else {
    return jeopardyCategory();
  }
}

module.exports = {
  wikiTitle,
  wikiExtract,
  wikiExtractExcerpt,
  wikiDescription,
  wikiAll,
  jargon,
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
  philisophicalQuestions
}