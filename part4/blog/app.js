import { middleware, config, logger } from "./utils/index.js";
import testDb from "./tests/db.js";
import express from "express";
import postsRouter from "./controllers/posts.js";
import cors from "cors";
import mongoose from "mongoose";
const { set, connect } = mongoose;

const app = express();

const url = config.MONGODB_URI;

// https://mongoosejs.com/docs/faq.html#enable_debugging
set("debug", true);
// https://mongoosejs.com/docs/guide.html#strict
set("strictQuery", false);

logger.info("connecting to", url);

try {
  if (process.env.NODE_ENV === "test") {
    await testDb.connect();
  } else {
    await connect(url);
  }
  logger.info("connected to MongoDB");
} catch (error) {
  logger.error("error connecting to MongoDB:", error.message);
}

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/posts", postsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
