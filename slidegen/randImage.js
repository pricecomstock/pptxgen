var reddit = require('./reddit')

const imageFunctions = {
  async landscape() {
    let url = await reddit.randomImageFromSubreddit("earthporn")
    return url
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
  }
};

module.exports = imageFunctions;
