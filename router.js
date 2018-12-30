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
  let slideCount = req.query.count || 10;
  let presenter = req.query.presenter || '';
  let questions = req.query.questions || false;
  // console.log(req.query)
  // console.log("Generating Title Slide with", title, subtitle)
  slidegen.generateSlideshow(presenter, slideCount).then(slideshow => {
    // console.log(slideshow);
    res.json({
      message: "Here are some slides",
      slides: slideshow
    });
  });
});

//------//
// POST //
//------//

// Export
module.exports.router = router;
