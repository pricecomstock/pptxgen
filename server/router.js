var express = require("express");

const slidegen = require("./slidegen/slidegen");

var router = express.Router();
router.use(express.json());

// Base route (easy connectivity test)
router.get("/", function(req, res) {
  res.json({ message: "hooray! welcome to our api!" });
});

//-----//
// GET //
//-----//
router.get("/slides", (req, res) => {
  // console.log(req.query)
  let slideCount = req.query.count || 10;
  let presenter = req.query.presenter || "";

  let questions = false;
  if (req.query.questions) {
    questions = req.query.questions == "true";
  }
  // console.log(req.query)
  // console.log("Generating Title Slide with", title, subtitle)
  slidegen
    .generateSlideshow(presenter, slideCount, questions)
    .then((slideshow) => {
      // console.log(slideshow);
      res.json({
        message: "Here are some slides",
        slides: slideshow.slides,
        theme: slideshow.theme,
      });
    });
});

//------//
// POST //
//------//

// Export
module.exports.router = router;
