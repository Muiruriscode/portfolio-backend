const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please click on the categories to select one"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  subject: {
    type: String,
    required: [true, "Please enter subject"],
  },
  comment: {
    type: String,
    required: [true, "Please enter your comments"],
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
