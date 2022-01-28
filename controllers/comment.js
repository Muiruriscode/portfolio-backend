const commentModel = require("../models/comment");

const comment = async (req, res) => {
  const { name, email, subject, comment } = req.body;
  console.log(name, email, subject, comment);
  if (!name || !email || !comment || !subject) {
    return res
      .status(200)
      .json({ success: false, msg: `Please enter all the fields` });
  }
  const singleComment = commentModel.create(req.body);
  res.status(200).json({
    success: true,
    msg: `Thank you ${name} for your comment`,
    data: { singleComment },
  });
};
module.exports = { comment };
