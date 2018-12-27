var reddit = require('./sources/reddit')
const wikipedia = require('./sources/wikipedia')

const imageFunctions = {
  async landscape() {
    let url = await reddit.randomImageFromSubreddit("earthporn")
    return url
  },
  async background() {
    return await reddit.randomImageFromMultireddit([
      "earthporn",
      "botanicalporn",
      "waterporn",
      "seaporn",
      "skyporn",
      "fireporn",
      "winterporn",
      "desertporn",
      "autumnporn",
      "weatherporn",
      "bridgeporn",
      "cityporn",
      "ruralporn",
      "spaceporn"
    ])
  },
  async animal() {
    return await reddit.randomImageFromMultireddit([
      "aww",
      "doggos",
      "cats"
    ])
  },
  async gif() {
    return await reddit.randomImageOrGifFromMultireddit([
      "gifs",
      "highqualitygifs"
    ]) 
  },
  async graph() {
    return await reddit.randomImageOrGifFromMultireddit([
      "dataisbeautiful",
      "dataisugly",
      "data_irl",
      "mapporn",
      "wordcloud",
      "redactedcharts"
    ])
  },
  async stockPhoto() {
    return await reddit.randomImageFromSubreddit([
      "wtfstockphotos"
    ])
  },
  async wiki() {
    let imageUrl = null;

    while (!imageUrl) {
      let article = await wikipedia.getRandomWikipediaArticle();
      imageUrl = article.originalimage.source;
    }
    
    return imageUrl
  }
};

module.exports = imageFunctions;
