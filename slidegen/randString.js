const randomChoice = require('./utils/randomChoice')
const wikipedia = require('./sources/wikipedia')
const jargon = require('./sources/jargon')
const fs = require('fs');

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

const stringFunctions = {
  async wikiTitle() {
    let article = await wikipedia.getRandomWikipediaArticle()
    return article.title;
  },
  async wikiExtract() {
    let article = await wikipedia.getRandomWikipediaArticle()
    return article.extract;
  },
  async wikiDescription() {
    let article = await wikipedia.getRandomWikipediaArticle()
    return article.description;
  },
  async wikiAll() {
    return await wikipedia.getRandomWikipediaArticle()
  },
  jargon() {
    return jargon.generateJargonPhrase()
  },
  quoteAndAuthor() {
    return randomChoice(quotes)
  },
  quote() {
    return randomChoice(quotes).quote
  },
  name() {
    return randomChoice(quotes).author
  }
}

module.exports = stringFunctions