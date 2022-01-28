const express = require("express");
const router = express.Router();

const { comment } = require("../controllers/comment");

router.route("/comment").post(comment);

module.exports = router;
