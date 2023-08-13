import { config, logger } from "./utils/index.js";
import supertest from "supertest";
import app from "./app.js";

const api = supertest(app);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
