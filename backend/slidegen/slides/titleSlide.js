const randImg = require("../randImage");
const randString = require("../randString");
const randomChoice = require("../utils/randUtils").randomChoice;
const stringLists = require("../sources/stringLists");

// const sample = {
//   type: "Title",
//   options: {
//     title: "Test props title",
//     subtitle: "from test kitchen",
//     image: "https://i.redd.it/j4wdc7bc1f621.jpg"
//   }
// };

const titleSlideFunctions = {
  assembleTitleSlide(title, subtitle, imageUrl) {
    return {
      type: "Title",
      options: {
        title,
        subtitle,
        imageUrl,
      },
    };
  },
  async generateTitleSlide(title, subtitle) {
    return this.assembleTitleSlide(title, subtitle, await randImg.background());
  },
  async generateFullRandomTitleSlide() {
    return await this.generateTitleSlide(
      await randString.wikiTitle(),
      await randString.wikiDescription()
    );
  },
  async generateTitleSlideForPresenter(presenter) {
    return await this.generateTitleSlide(
      await randString.compositeTopic(),
      "by " + presenter
    );
  },
  async generateEndSlide(questions) {
    return {
      type: "Title",
      options: {
        title: randomChoice(stringLists.endTitles),
        subtitle: questions ? randomChoice(stringLists.questionPrompts) : "",
        imageUrl: await randImg.background(),
      },
    };
  },
};

module.exports = titleSlideFunctions;
