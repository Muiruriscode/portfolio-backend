const mongoose = require("mongoose");

const hireSchema = mongoose.Schema({
  category: {
    type: String,
    required: [true, "Please click on the categories to select one"],
  },
  description: {
    type: String,
    required: [true, "Please describe the website"],
  },
  price: {
    type: String,
    required: [true, "Please enter thre price"],
  },
  myPackage: {
    type: String,
    required: [true, "please select category"],
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "please provide user"],
  },
});

module.exports = mongoose.model("job", hireSchema);
