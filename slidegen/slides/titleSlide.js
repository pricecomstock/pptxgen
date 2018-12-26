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
  generateTitleSlide(title, subtitle) {
    return {
      type: "Title",
      options: {
        title,
        subtitle,
        imageUrl: randImg.landscape()
      }
    };
  }
};

module.exports = titleSlideFunctions;
