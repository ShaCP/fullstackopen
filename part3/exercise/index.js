// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const express = require('express');
const app = express();

app.use(express.json());

let phonebook = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

app.get('/api/persons', (request, response) => {
    response.json(phonebook);
});

const notFound = (response, error) => {
    let response$ = response.status(404);
    if (error) {
        response$ = response.json({ error });
    }

    return response$.end();
};

app.get('/api/persons/:id', (request, response) => {
    if (request.params.id) {
        const id = Number(request.params.id);

        if (isNaN(id)) {
            return notFound('Id is not a number');
        }

        const person = phonebook.find(person => person.id === id);

        if (person) {
            return response.json(person);
        }
    }

    return notFound();
});

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = phonebook.find(person => person.id === id);

    if (person) {
        response.json(person);
    }

    response.status(404).end();
});

app.get('/info', (request, response) => {
    const date = new Date();
    response.send(`<p>Phonebook has info for ${phonebook.length} people</p><p>${date}</p>`);
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});