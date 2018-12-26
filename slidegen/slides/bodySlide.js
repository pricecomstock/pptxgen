const randImg = require("../randImage");
const randomChoice = require('../randomChoice')

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
  }
};

module.exports = bodySlideFunctions;
