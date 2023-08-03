require('dotenv').config()
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");


const app = express();

app.use(express.static('build'))
app.use(cors());
app.use(express.json());
morgan.token("body", (req) => JSON.stringify(req.body));

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
];

app.get("/api/persons", (request, response) => {
  return response.json(phonebook);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  const person = phonebook.find((person) => person.id === id);

  if (person) {
    return response.json(person);
  }

  return response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  phonebook = phonebook.filter((person) => person.id !== id);

  return response.status(204).end();
});

const generateId = () => {
  const ids = phonebook.map((p) => p.id);
  let id = 0;

  if (ids.length === 0) {
    return id;
  }

  do {
    id = Math.ceil(Math.random() * 1000);
  } while (ids.includes(id));

  return id;
};

app.post("/api/persons", (request, response) => {
  const {
    body: { number, name }
  } = request;

  if (!number || !name) {
    return response.status(400).json({
      error: "name or number missing"
    });
  }

  const nameFound = phonebook.find((person) => person.name === name);

  if (nameFound) {
    return response.status(400).json({
      error: "name must be unique"
    });
  }

  const person = {
    id: generateId(),
    name,
    number
  };

  phonebook = phonebook.concat(person);

  return response.status(201).json(person);
});

app.get("/info", (request, response) => {
  const date = new Date();
  return response.send(
    `<p>Phonebook has info for ${phonebook.length} people</p><p>${date}</p>`
  );
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
