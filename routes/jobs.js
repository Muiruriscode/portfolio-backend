const express = require("express");

const router = express.Router();
const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
} = require("../controllers/jobs");

router.route("/job").post(createJob).get(getAllJobs);

router.route("/job/:id").get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;
