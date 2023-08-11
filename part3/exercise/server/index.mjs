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

app.post("/api/persons", async (request, response, next) => {
  const {
    body: { number, name }
  } = request;

  const person = new Person({
    name,
    number
  });

  try {
    const result = await person.save();
    return response.status(201).json(result);
  } catch (error) {
    return next(error);
  }
});

app.put("/api/persons/:id", async (request, response, next) => {
  const { number } = request.body;

  if (number === undefined) {
    return response.status(400).json({ error: "Number is missing" });
  }

  try {
    const personUpdated = await Person.findByIdAndUpdate(
      request.params.id,
      { number },
      // context: 'query' is no longer needed, it's the default behavior
      { new: true, runValidators: true }
    );

    return response.json(personUpdated);
  } catch (error) {
    return next(error);
  }
});

app.get("/info", async (request, response) => {
  const date = new Date();
  const count = await Person.count();
  return response.send(
    `<p>Phonebook has info for ${count} people</p><p>${date}</p>`
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
