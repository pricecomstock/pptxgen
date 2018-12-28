const randImg = require("../randImage");
const randString = require("../randString");
const randomChoice = require('../utils/randUtils').randomChoice
const randomInt = require('../utils/randUtils').randomInt
const normInt = require('../utils/randUtils').normInt
const stringLists = require('../sources/stringLists')

async function getBullets(numBullets) {
  let bullets = []
  for (let i=0; i<numBullets; i++) {
    bullets.push(randString.compositeBullet())
  }
  let bulletStrings = await Promise.all(bullets)
  // console.debug(bulletStrings)
  return bulletStrings;
}

function assembleStandardSlide(title, bullets, image_url, pt, ol) {
  const plaintext = pt || Math.random < 0.2;
  const ordered = ol || false;
  const imageWidth = randomInt(25,45)
  return {
    type: "Bullets",
    options: {
      title: title,
      bullets: bullets,
      plaintext: plaintext,
      ordered: ordered,
      maxWidth: `${87 - imageWidth}%`,
      contentImages:[
        {
          url: image_url,
          position: {
            bottom: "3%",
            right: "3%"
          },
          width: `${imageWidth}%`
        }
      ]
    }
  };
}

function assembleHalfImageBulletSlide(title, bullets, imageUrl, pt, ol, il) {
  const imageLeft = il || Math.random() < 0.2
  const plaintext = pt || Math.random() < 0.2
  const ordered = ol || Math.random() < 0.3
  return {
    type: "HalfImageBullets",
    options: {
      title: title,
      bullets: bullets,
      imageUrl: imageUrl,
      imageLeft: imageLeft,
      plaintext: plaintext,
      ordered: ordered
    }
  }
}

async function generateBodySlideWithGraph() {
  return assembleStandardSlide(
      await randString.compositeTopic(),
      await getBullets(randomInt(2, 3)),
      await randImg.graph()
    );
}

async function generateWikiImageSlide() {
  return assembleStandardSlide(
    await randString.wikiTitle(),
    await getBullets(randomInt(2, 3)),
    await randImg.wiki()
  );
}

async function generateStrategySlide() {
  return assembleStandardSlide(
    randomChoice(stringLists.strategyTitles),
    [randString.shortJargon(), randString.shortJargon()],
    await randImg.wiki(),
    false,
    true
  );
}

async function generateStockPhotoSlide() {
  return assembleStandardSlide(
    await randString.compositeTopic(),
    await getBullets(randomInt(2,3)),
    await randImg.stockPhoto()
  );
}

async function generateAboutMeSlide() {
  const bulletCount = randomInt(2, 4);
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

async function generateQuoteHalfImage() {
  return {
    type: "HalfImageTitle",
    options: {
      title: await randString.compositeProfound(),
      imageUrl: await randImg.background(),
      imageLeft: Math.random() < 0.5
    }
  }
}

async function generateExtractHalfImage() {
  return {
    type: "HalfImageTitle",
    options: {
      title: await randString.wikiExtractExcerpt(),
      imageUrl: await randImg.background(),
      imageLeft: Math.random() < 0.5
    }
  }
}

async function generateHalfBulletSlide() {
  assembleHalfImageBulletSlide(
    await randString.compositeTopic(),
    await getBullets(randomInt(2,3)),
    await randImg.background()
  )
}

async function generateWeirdThoughtSlide() {
  assembleHalfImageBulletSlide(
    await randString.compositeQuestion(),
    [await randString.redditPhrases()],
    await randImg.background(),
    true,
    false,
    true
  )
}

module.exports = {
  assembleStandardSlide,
  assembleHalfImageBulletSlide,
  generateBodySlideWithGraph,
  generateWikiImageSlide,
  generateStrategySlide,
  generateStockPhotoSlide,
  generateAboutMeSlide,
  generateQuoteHalfImage,
  generateExtractHalfImage,
  generateHalfBulletSlide,
  generateWeirdThoughtSlide
};
