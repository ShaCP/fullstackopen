import mongoose from "mongoose";
import "dotenv/config";
import { Person } from "./models/person.mjs";
const { set, connect, connection } = mongoose;

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

// const password = process.argv[2];
const name = process.argv[2];
const number = process.argv[3];

const url = process.env.MONGODB_URI;

set("strictQuery", false);
connect(url);

if (name && number) {
  const person = new Person({
    name,
    number
  });

  const result = await person.save();
  const { name: _name, number: _number } = result;
  console.log(`added ${_name} number ${_number} to phonebook`);
} else {
  const result = await Person.find({});
  console.log("phonebook:");
  result.forEach((person) => {
    console.log(person);
  });
}

connection.close();
