const express = require("express");
const router = express.Router();

const { comment, home } = require("../controllers/comment");

router.route("/comment").post(comment);
router.route("/").get(home);

module.exports = router;
