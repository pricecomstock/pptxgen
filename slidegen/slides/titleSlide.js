const randImg = require("../randImage");
const randString = require("../randString")

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
        imageUrl
      }
    };
  },
  async generateTitleSlide(title, subtitle) {
    return this.assembleTitleSlide(title, subtitle, await randImg.background());
  },
  async generateFullRandomTitleSlide() {
    return await this.generateTitleSlide(
      await randString.wikiTitle(),
      await randString.wikiDescription(),
    )
  }
};

module.exports = titleSlideFunctions;
