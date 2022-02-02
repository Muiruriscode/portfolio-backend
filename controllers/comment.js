const Comment = require("../models/comment");
const myEmail = require("../middleware/email");

const comment = async (req, res) => {
  const { name, email, subject, comment } = req.body;
  if (!name || !email || !comment || !subject) {
    return res
      .status(200)
      .json({ success: false, msg: `Please enter all the fields` });
  }
  await Comment.create({ ...req.body });
  myEmail(email, `comment from ${email}`);
  res.status(200).json({
    success: true,
    msg: `Thank you ${name} for your comment`,
  });
};
const home = async (req, res) => {
  res.status(200).send("<h1>Home</h1>");
};
module.exports = { comment, home };
