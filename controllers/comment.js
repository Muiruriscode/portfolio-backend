const Comment = require("../models/comment");
const { BadRequestError } = require("../errors");

const comment = async (req, res) => {
  const { name, email, subject, comment } = req.body;
  if (!name || !email || !comment || !subject) {
    return res
      .status(200)
      .json({ success: false, msg: `Please enter all the fields` });
  }
  const singleComment = await Comment.create({ ...req.body });
  res.status(200).json({
    success: true,
    msg: `Thank you ${name} for your comment`,
  });
};
module.exports = { comment };
