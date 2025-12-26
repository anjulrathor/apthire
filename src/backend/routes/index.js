const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("APT-HIRE backend is ok");
});

module.exports = router;
