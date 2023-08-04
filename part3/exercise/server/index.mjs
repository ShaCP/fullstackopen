import 'dotenv/config';
import express, { static as _static, json } from "express";
import morgan, { token } from "morgan";
import cors from "cors";
import mongoose from 'mongoose';
const { set, connect, Schema, model, connection } = mongoose;

function connectToDb() {
    const dbPass = process.env.DBPASS;
    const url =
        `mongodb+srv://fullstack:${dbPass}@cluster0.b4lstcf.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

    set('strictQuery', false);
    connect(url);

    const personSchema = new Schema({
        name: String,
        number: String
    });

    const Person = model('Person', personSchema);

    return Person;
}

const Person = connectToDb();

const app = express();

app.use(_static('build'));
app.use(cors());
app.use(json());
token("body", (req) => JSON.stringify(req.body));

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

app.get("/api/persons", async (request, response) => {
    // return response.json(phonebook);
    const people = await Person.find({});
    connection.close();
    return response.json(people);
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


//----

// if (process.argv.length < 3) {
//     console.log('give password as argument');
//     process.exit(1);
// }

// const password = process.argv[2];
// const name = process.argv[3];
// const number = process.argv[4];

// const url =
//     `mongodb+srv://fullstack:${password}@cluster0.b4lstcf.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

// set('strictQuery', false);
// connect(url);

// const personSchema = new Schema({
//     name: String,
//     number: String
// });

// const Person = model('Person', personSchema);

// if (name && number) {
//     const person = new Person({
//         name,
//         number,
//     });

//     const result = await person.save();
//     const { name: _name, number: _number } = result;
//     console.log(`added ${_name} number ${_number} to phonebook`);

// } else {
//     const result = await Person.find({});
//     result.forEach(person => {
//         console.log(person);
//     });
// }

// connection.close();