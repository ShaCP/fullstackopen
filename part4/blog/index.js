import { config, logger, middleware } from "./utils/index.js";
import express from "express";
import postsRouter from "./controllers/posts.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/posts", postsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
