const randImg = require("../randImage");
const randString = require("../randString");
const randomChoice = require('../utils/randUtils').randomChoice
const randomInt = require('../utils/randUtils').randomInt
const stringLists = require('../sources/stringLists')

const bodySlideFunctions = {
  async generateBodySlideWithGraph() {
    return {
      type: "Bullets",
      options: {
        title: await randString.wikiTitle(),
        bullets: [
          randString.jargon(),
          randString.realName()
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
    const maxBullets = 3;
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
  },
  async generateWikiImageSlide() {
    const imageWidth = randomInt(25,60)
    return {
      type: "Bullets",
      options: {
        title: await randString.wikiTitle(),
        bullets: [
          randString.quote(),
          "wiki"
        ],
        plaintext: Math.random() < 0.5, // random true false
        maxWidth: `${95 - imageWidth}%`,
        contentImages:[
          {
            url: await randImg.wiki(),
            position: {
              bottom: "5%",
              right: "5%"
            },
            width: `${imageWidth}%`
          }
        ]
      }
    };
  },
  async generateStrategySlide() {
    const imageWidth = randomInt(20,35)
    return {
      type: "Bullets",
      options: {
        title: randomChoice(stringLists.strategyTitles),
        bullets: [
          randString.jargon(),
          randString.jargon(),
        ],
        maxWidth: `${95 - imageWidth}%`,
        contentImages:[
          {
            url: await randImg.graph(),
            position: {
              bottom: "5%",
              right: "5%"
            },
            width: `${imageWidth}%`
          }
        ]
      }
    };
  },
  async generateStockPhotoSlide() {
    const imageWidth = randomInt(25,60)
    return {
      type: "Bullets",
      options: {
        title: await randString.wikiDescription(),
        bullets: [
          randString.jargon(),
          randString.quote(),
          "wtfstockphotos"
        ],
        plaintext: Math.random() < 0.5, // random true false
        maxWidth: `${95 - imageWidth}%`,
        contentImages:[
          {
            url: await randImg.stockPhoto(),
            position: {
              bottom: "5%",
              right: "5%"
            },
            width: `${imageWidth}%`
          }
        ]
      }
    };
  },
  async generateQuoteHalfImage() {
    return {
      type: "HalfImageTitle",
      options: {
        title: randString.quote(),
        imageUrl: await randImg.background(),
        imageLeft: Math.random() < 0.5
      }
    }
  },
  async generateExtractHalfImage() {
    return {
      type: "HalfImageTitle",
      options: {
        title: await randString.quote(),
        imageUrl: await randImg.background(),
        imageLeft: Math.random() < 0.5
      }
    }
  }
};

module.exports = bodySlideFunctions;
