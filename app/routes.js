const router = require("express").Router();
const authenticate = require("../middleware/authenticate");

router.get("/", (req, res) => {
  res.status(200).send({
    message: "Hello World",
  });
});

router.use("/api/v1", require("../routes/index"));

router.get("/private", authenticate, (req, res) => {
  res.status(200).json({
    message: "I am a private route",
  });
});

router.get("/public", async (req, res) => {
  res.status(200).json({
    message: "I am a public route",
  });
});

/** Check Api health */
router.get("/health", (req, res) => {
  res.send("ok");
});

module.exports = router;
