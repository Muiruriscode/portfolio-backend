require("dotenv").config();
require("express-async-errors");
const express = require("express");
const authRouter = require("./routes/auth");
const commentRouter = require("./routes/comment");
const jobsRouter = require("./routes/jobs");

const authenticateUser = require("./middleware/auth");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const connectDB = require("./db/connect");

const app = express();

app.use(express.json());
app.use(errorHandlerMiddleware);

app.use("/api/v1/", commentRouter);
app.use("/api/v1/", authRouter);
app.use("/api/v1/", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
