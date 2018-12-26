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
  // let slideCount = req.query.count;
  // let title = req.query.title || 'title'; // TODO || getRandomTitle();
  // let subtitle = req.query.subtitle || 'subtitle';
  slidegen.generateSlideshow()
    .then(slideshow => {
      console.log(slideshow)
      res.json({
        message: "Here are some slides",
        slides: slideshow
      });
    })
});

//------//
// POST //
//------//

// Export
module.exports.router = router;
