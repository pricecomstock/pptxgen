const randomChoice = require('../utils/randomChoice')

const axios = require('axios').create({
  baseURL: 'https://reddit.com/',
  timeout: 3000,
})

const redditFunctions = {
  async randomUrlFromSubreddit(subreddit, testRE) {
    let url = ""
    let response = {}
    while (! testRE.test(url)) {// not an image url, retry
      try {
        response = await axios.get(`r/${subreddit}/random.json`)
        
        let data = response.data
        if (Array.isArray(response.data)) {
          data = data[0]
        }

        // console.log(data)

        // Find the children with a valid image url
        const validChildren = data.data.children.filter( child => {
          return testRE.test(child.data.url)
        })

        if (validChildren && validChildren.length !== 0) {
          let validChild = randomChoice(validChildren)
          try {
            url = validChild.data.url;
          } catch(err) {
            console.error("Error getting data from validChildren", validChildren)
          }
          // console.log(url)
        }

      } catch(err) {
        console.error("Loading from reddit failed", err)
        // console.log(response)
        url = ""
      }
    }
    return url
  },
  async randomImageFromSubreddit(subreddit) {
    const validImageUrlRE = /\.(jpg|png)$/;
    return this.randomUrlFromSubreddit(subreddit, validImageUrlRE)
  },
  async randomImageOrGifFromSubreddit(subreddit) {
    const validImageUrlRE = /\.(jpg|png|gif)$/;
    return this.randomUrlFromSubreddit(subreddit, validImageUrlRE)
  },
  async randomImageFromMultireddit(subredditList) {
    return this.randomImageFromSubreddit(randomChoice(subredditList))
  },
  async randomImageOrGifFromMultireddit(subredditList) {
    return this.randomImageOrGifFromSubreddit(randomChoice(subredditList))
  }
}



module.exports = redditFunctions;