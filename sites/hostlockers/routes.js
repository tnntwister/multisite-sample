const express = require("express");
const router = express.Router();

router.get("/testh", (req, res) => {
  res.send("GET request to the homepage");
});

router.put("/:id");

module.exports = router;
