const randImg = require("../randImage");

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
    return this.assembleTitleSlide(title, subtitle, await randImg.landscape());
  },
  async generateFullRandomTitleSlide() {
    return await this.generateTitleSlide(
      "TODO Make Random String",
      "TODO Another One",
    )
  }
};

module.exports = titleSlideFunctions;
