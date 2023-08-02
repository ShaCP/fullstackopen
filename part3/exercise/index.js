const express = require("express");
const middleware = require("./middleware");
const personController = require("./controllers/personController");
const infoController = require("./controllers/infoController");

const app = express();

app.use(express.json());

/* data end points */

app.get("/api/persons", personController.getAll);

app.get("/api/persons/:id", personController.getById);

app.post("/api/persons", middleware.uniqueName, personController.add);

app.delete("/api/persons/:id", personController.deleteById);

/* info end points */

app.get("/info", infoController.getInfo);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
