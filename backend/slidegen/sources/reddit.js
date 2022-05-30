const randomChoice = require("../utils/randUtils").randomChoice;

// TODO maybe have some state on if reddit isn't responding or is going slowly so we can redirect to wiki image sources

const axios = require("axios").create({
  baseURL: "https://reddit.com/",
  timeout: 5000
});

async function randomUrlFromSubreddit(subreddit, testRE) {
  let url = "";
  let response = {};
  while (!testRE.test(url)) {
    // not an image url, retry
    try {
      response = await axios.get(`r/${subreddit}/random.json`);

      let data = response.data;
      if (Array.isArray(response.data)) {
        data = data[0];
      }

      // Find the children with a valid image url
      const validChildren = data.data.children.filter(child => {
        return testRE.test(child.data.url);
      });

      if (validChildren && validChildren.length !== 0) {
        let validChild = randomChoice(validChildren);
        try {
          url = validChild.data.url;
        } catch (err) {
          console.error("Error getting data from validChildren", validChildren);
        }
        // console.log(url)
      }
    } catch (err) {
      console.error("Loading from reddit failed", err.message);
      // console.log(response)
      url = "";
    }
  }
  return url;
}

async function randomTitleFromSubreddit(subreddit) {
  let title = "";
  let response = {};
  // const tagMatchRe = /[\[\(].+[\]\)]/gi
  while (title == "") {
    try {
      response = await axios.get(`r/${subreddit}/random.json`);

      let data = response.data;
      if (Array.isArray(response.data)) {
        data = data[0];
      }

      title = randomChoice(data.data.children).data.title;
    } catch (err) {
      console.error("error getting subreddit title", err.msg);
    }

    // title = title.replace(tagMatchRe, "")
    title = title.trim();
  }
  return title;
}

async function randomImageFromSubreddit(subreddit) {
  const validImageUrlRE = /\.(jpg|png)$/;
  return this.randomUrlFromSubreddit(subreddit, validImageUrlRE);
}

async function randomImageOrGifFromSubreddit(subreddit) {
  const validImageUrlRE = /\.(jpg|png|gif)$/;
  return this.randomUrlFromSubreddit(subreddit, validImageUrlRE);
}

async function randomImageFromMultireddit(subredditList) {
  return this.randomImageFromSubreddit(randomChoice(subredditList));
}

async function randomImageOrGifFromMultireddit(subredditList) {
  return this.randomImageOrGifFromSubreddit(randomChoice(subredditList));
}

async function randomTitleFromMultireddit(subredditList) {
  return this.randomTitleFromSubreddit(randomChoice(subredditList));
}

module.exports = {
  randomUrlFromSubreddit,
  randomTitleFromSubreddit,
  randomImageFromSubreddit,
  randomImageOrGifFromSubreddit,
  randomImageFromMultireddit,
  randomImageOrGifFromMultireddit,
  randomTitleFromMultireddit
};
