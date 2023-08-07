import "dotenv/config";
import express from "express";
import cors from "cors";
import { Person } from "./models/person.mjs";
import middleware from "./middleware/index.mjs";

const app = express();

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.errorHandler);

middleware.morgan.token("body", (req) => JSON.stringify(req.body));

app.use(
  middleware.morgan(
    "RESPONSE: Method: :method -- Path: :url -- Status: :status -- Length: :res[content-length] -- Response Time: :response-time ms -- Body: :body"
  )
);

app.get("/api/persons", async (request, response) => {
  const people = await Person.find({});
  return response.json(people);
});

app.get("/api/persons/:id", async (request, response, next) => {
  let person = null;
  try {
    person = await Person.findById(request.params.id);

    if (person) {
      return response.json(person);
    }

    return response.status(404).end();
  } catch (error) {
    return next(error);
  }
});

app.delete("/api/persons/:id", async (request, response, next) => {
  try {
    await Person.findByIdAndRemove(request.params.id);
    return response.status(204).end();
  } catch (error) {
    return next(error);
  }
});

app.post("/api/persons", async (request, response) => {
  const {
    body: { number, name }
  } = request;

  if (!number || !name) {
    return response.status(400).json({
      error: "name or number missing"
    });
  }

  const personFound = await Person.findOne({ name });

  if (personFound) {
    return response.status(400).json({
      error: "name must be unique"
    });
  }

  const person = new Person({
    name,
    number
  });

  const result = await person.save();
  return response.status(201).json(result);
});

app.put("/api/persons/:id", async (request, response) => {
  const { number } = request.body;

  try {
    const personUpdated = await Person.findByIdAndUpdate(
      request.params.id,
      { number },
      { new: true }
    );

    return response.json(personUpdated);
  } catch (error) {
    next(error);
  }
});

app.get("/info", (request, response) => {
  const date = new Date();
  return response.send(
    `<p>Phonebook has info for ${phonebook.length} people</p><p>${date}</p>`
  );
});

// We load this after all the other routes, because it runs only if none of the previous routes handled the request.
app.use(middleware.unknownEndpoint);

// Now we load the error handler middleware, which is the last middleware loaded.
app.use(middleware.errorHandler);

// If we were to load it earlier

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
