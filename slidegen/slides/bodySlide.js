const randImg = require("../randImage");
const randString = require("../randString");
const randomChoice = require('../utils/randomChoice')
const randomInt = require('../utils/randomInt')
const stringLists = require('../sources/stringLists')

const bodySlideFunctions = {
  async generateBodySlideWithGraph() {
    return {
      type: "Bullets",
      options: {
        title: "TODO Random title",
        bullets: [
          "TODO some points",
          "Go here"
        ],
        plaintext: Math.random() < 0.5, // random true false
        maxWidth: "45%",
        contentImages:[
          {
            url: await randImg.graph(),
            position: {
              bottom: "5%",
              right: "5%"
            },
            width: "50%"
          }
        ]
      }
    };
  },
  async generateAboutMeSlide() {
    const minBullets = 2;
    const maxBullets = 4;
    const bulletCount = randomInt(minBullets, maxBullets);
    let bullets = []
    for (let i = 0; i < bulletCount; i++) {
      bullets.push(randString.wikiDescription())
    }
    let bulletStrings = await Promise.all(bullets)

    return {
      type: "Bullets",
      options: {
        title: randomChoice(stringLists.aboutMeTitles),
        bullets: bulletStrings
      }
    }
  }
};

module.exports = bodySlideFunctions;
