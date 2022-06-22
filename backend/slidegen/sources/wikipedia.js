const axios = require("axios").create({
  baseURL: "https://en.wikipedia.org/api/rest_v1/",
  timeout: 3000,
});

async function getRandomWikipediaArticle() {
  try {
    const response = await axios.get("/page/random/summary");
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports.getRandomWikipediaArticle = getRandomWikipediaArticle;
