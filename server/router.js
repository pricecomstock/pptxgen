var express = require("express");
const joi = require("joi");

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
router.get("/slides", async (req, res) => {
  const querySpec = joi.object().keys({
    slideCount: joi
      .number()
      .max(8)
      .default(6),
    presenterName: joi
      .string()
      .optional()
      .max(100)
      .allow("", null)
      .default(""),
    questionPrompt: joi.boolean().default(true),
  });

  const { value: slideShowSpec } = querySpec.validate(req.query);

  const slideshow = await slidegen.generateSlideshow(slideShowSpec);
  res.json({
    message: "Here are some slides",
    slides: slideshow.slides,
    theme: slideshow.theme,
  });
});

//------//
// POST //
//------//

// Export
module.exports.router = router;
