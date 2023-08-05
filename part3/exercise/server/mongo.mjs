import mongoose from "mongoose";
const { set, connect, Schema, model, connection } = mongoose;

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url =
    `mongodb+srv://fullstack:${password}@cluster0.b4lstcf.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

set('strictQuery', false);
connect(url);

const personSchema = new Schema({
    name: String,
    number: String
});

const Person = model('Person', personSchema);

if (name && number) {
    const person = new Person({
        name,
        number,
    });

    const result = await person.save();
    const { name: _name, number: _number } = result;
    console.log(`added ${_name} number ${_number} to phonebook`);

} else {
    const result = await Person.find({});
    result.forEach(person => {
        console.log(person);
    });
}

connection.close();