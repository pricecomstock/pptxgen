const axios = require('axios').create({
  baseURL: 'https://reddit.com/',
  timeout: 2000,
})

const redditFunctions = {
  async randomImageFromSubreddit(subreddit) {
    const response = await axios.get(`r/${subreddit}/random.json`)
    // console.log(response.data[0].data.children[0].data.url)
    return response.data[0].data.children[0].data.url
  }
  // async randomImageFromMultireddit(subredditList) {
  //   const response = await axios.get(`r/${subredditList.join('+')}/random.json`)
  // }
}



module.exports = redditFunctions;