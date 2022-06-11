var reddit = require("./sources/reddit");
const wikipedia = require("./sources/wikipedia");

import { randomChoice } from "./utils/randUtils";

export async function landscape(): Promise<string> {
  return reddit.randomImageFromSubreddit("earthporn");
}

export async function background(): Promise<string> {
  return reddit.randomImageFromMultireddit([
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
    "spaceporn",
  ]);
}

export async function animal(): Promise<string> {
  return reddit.randomImageFromMultireddit(["aww", "doggos", "cats"]);
}

export async function gif(): Promise<string> {
  return reddit.randomImageOrGifFromMultireddit(["gifs", "highqualitygifs"]);
}

export async function interesting(): Promise<string> {
  return reddit.randomImageOrGifFromMultireddit([
    "crappydesign",
    "design",
    "graffiti",
  ]);
}

export async function graph(): Promise<string> {
  return reddit.randomImageOrGifFromMultireddit([
    "dataisbeautiful",
    "dataisugly",
    "data_irl",
    "mapporn",
    "wordcloud",
    "redactedcharts",
  ]);
}

export async function stockPhoto(): Promise<string> {
  return reddit.randomImageFromSubreddit(["wtfstockphotos"]);
}

export async function wiki(): Promise<string> {
  let imageUrl = null;

  while (!imageUrl) {
    let article = wikipedia.getRandomWikipediaArticle();
    try {
      imageUrl = article.originalimage.source;
    } catch (error) {
      imageUrl = null;
    }
  }

  return imageUrl;
}

export const anyRandomImage = async (): Promise<string> => {
  return randomChoice([
    landscape,
    background,
    animal,
    gif,
    interesting,
    graph,
    stockPhoto,
    wiki,
  ])();
};
