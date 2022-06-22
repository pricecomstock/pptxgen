import * as randImg from "../randImage";
const randString = require("../randString");
const randomChoice = require("../utils/randUtils").randomChoice;
const randomInt = require("../utils/randUtils").randomInt;
const getWeightedRandomFunction =
  require("../utils/randUtils").getWeightedRandomFunction;
const stringLists = require("../sources/stringLists");
const chartGen = require("../sources/chart/chartGen");

const randomNumBullets = getWeightedRandomFunction({
  1: 60,
  2: 38,
  3: 2,
});

async function getBullets(numBullets) {
  let bullets = [];
  for (let i = 0; i < numBullets; i++) {
    bullets.push(randString.compositeBullet());
  }
  let bulletStrings = await Promise.all(bullets);
  // console.debug(bulletStrings)
  return bulletStrings;
}

function assembleStandardSlide(title, bullets, image_url, pt, ol) {
  const plaintext = pt || Math.random < 0.2;
  const ordered = ol || false;
  const imageWidth = randomInt(35, 55);
  return {
    type: "Bullets",
    options: {
      title: title,
      bullets: bullets,
      plaintext: plaintext,
      ordered: ordered,
      maxWidth: `${87 - imageWidth}%`,
      contentImages: [
        {
          url: image_url,
          position: {
            bottom: `${randomInt(2, 12)}%`,
            right: "2%",
          },
          width: `${imageWidth}%`,
        },
      ],
    },
  };
}

function assembleChartSlide(title, bullets, chartData, pt, ol) {
  const plaintext = pt || Math.random < 0.2;
  const ordered = ol || false;
  const imageWidth = randomInt(35, 55);
  return {
    type: "Bullets",
    options: {
      title: title,
      bullets: bullets,
      plaintext: plaintext,
      ordered: ordered,
      maxWidth: `${87 - imageWidth}%`,
      chart: {
        chartType: chartData.chartType,
        chartJsData: chartData.chartJsData,
        chartJsOptions: chartData.chartJsOptions,
        position: {
          bottom: `${randomInt(2, 12)}%`,
          right: `${randomInt(2, 6)}%`,
        },
        size: chartData.size,
        width: `${imageWidth}%`,
      },
    },
  };
}

function assembleHalfImageBulletSlide(title, bullets, imageUrl, pt, ol, il) {
  const imageLeft = il || Math.random() < 0.2;
  const plaintext = pt || Math.random() < 0.2;
  const ordered = ol || Math.random() < 0.3;
  let slide = {
    type: "HalfImageBullets",
    options: {
      title: title,
      bullets: bullets,
      imageUrl: imageUrl,
      imageLeft: imageLeft,
      plaintext: plaintext,
      ordered: ordered,
    },
  };

  return slide;
}

// TODO use JS destructuring assignment to make these multi-await parameters work better?

async function generateBodySlideWithGraph() {
  return assembleStandardSlide(
    await randString.compositeTitle(),
    await getBullets(randomNumBullets()),
    await randImg.redditGraph()
  );
}

async function generateWikiImageSlide() {
  return assembleStandardSlide(
    await randString.compositeTitle(),
    await getBullets(randomNumBullets()),
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
    await randString.compositeTitle(),
    await getBullets(randomNumBullets()),
    await randImg.stockPhoto()
  );
}

async function generateChartSlide() {
  return assembleChartSlide(
    await randString.compositeTitle(),
    await getBullets(1),
    await chartGen.getRandomChart()
  );
}

async function generateAboutMeSlide() {
  const bulletCount = randomInt(2, 4);
  let bullets = [];
  for (let i = 0; i < bulletCount; i++) {
    bullets.push(randString.aboutMe());
  }
  let bulletStrings = await Promise.all(bullets);
  return {
    type: "Bullets",
    options: {
      title: randomChoice(stringLists.aboutMeTitles),
      bullets: bulletStrings,
    },
  };
}

async function generateQuoteHalfImage() {
  return {
    type: "HalfImageTitle",
    options: {
      title: await randString.compositeProfound(),
      imageUrl: await randImg.background(),
      imageLeft: Math.random() < 0.5,
    },
  };
}

async function generateExtractHalfImage() {
  return {
    type: "HalfImageTitle",
    options: {
      title: await randString.wikiExtractExcerpt(),
      imageUrl: await randImg.background(),
      imageLeft: Math.random() < 0.5,
    },
  };
}

async function generateHalfBulletSlide() {
  return assembleHalfImageBulletSlide(
    await randString.compositeTitle(),
    await getBullets(randomNumBullets()),
    await randImg.background()
  );
}

async function generateWeirdThoughtSlide() {
  return assembleHalfImageBulletSlide(
    await randString.compositeQuestion(),
    await getBullets(randomNumBullets()),
    await randImg.background(),
    true,
    false,
    true
  );
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
  generateWeirdThoughtSlide,
  generateChartSlide,
};
