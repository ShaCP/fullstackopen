
import mongoose from "mongoose";
const { set, connect, Schema, model, connection } = mongoose;

async function generateModel() {
  const dbPass = process.env.DBPASS;
  const url = `mongodb+srv://fullstack:${dbPass}@cluster0.b4lstcf.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

  set("strictQuery", false);

  try {
    await connect(url);
  } catch (error) {
    console.log("error connecting to MongoDB:", error.message);
  }

  const personSchema = new Schema({
    name: String,
    number: String
  });

  personSchema.set("toJSON", {
    transform: (document, { _id, __v, ...ret }) => {
      ret.id = _id.toString();
      return ret;
    }
  });

  const Person = model("Person", personSchema);

  return Person;
}

export const Person = await generateModel();