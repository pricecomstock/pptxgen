const randomChoice = require('./utils/randomChoice')
const wikipedia = require('./sources/wikipedia')


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
  }
}

module.exports = stringFunctions