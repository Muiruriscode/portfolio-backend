const Job = require("../models/hire");
const { StatusCodes } = require("http-status-codes");
const myEmail = require("../middleware/email");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};
const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ success: false, msg: `No job with id ${jobId}` });
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  myEmail(
    req.user.email,
    `job created by ${req.user.username} id ${req.user.userId} `
  );
  res
    .status(201)
    .json({ success: true, msg: "Thank you, I will get back to you" });
};

const updateJob = async (req, res) => {
  const {
    body: { name, description },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (name === "" || description === "") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, msg: "Please fill all the fields" });
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ success: false, msg: `No job with id ${jobId}` });
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ success: false, msg: `No job with id ${jobId}` });
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
};
