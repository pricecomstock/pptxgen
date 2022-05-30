var express = require("express");
const { PresentationOptions } = require("../slidegen/presentationOptions");

const slidegen = require("../slidegen/slidegen");

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
  const options = new PresentationOptions(req.query);

  slidegen.generateSlideshow(options).then((slideshow) => {
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
