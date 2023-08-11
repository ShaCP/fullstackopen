import mongoose from "mongoose";
const { set, connect, Schema, model } = mongoose;

async function generateModel() {
  const url = process.env.MONGODB_URI;

  // https://mongoosejs.com/docs/faq.html#enable_debugging
  set("debug", true);
  // https://mongoosejs.com/docs/guide.html#strict
  set("strictQuery", false);

  try {
    await connect(url);
  } catch (error) {
    console.log("error connecting to MongoDB:", error.message);
  }

  const personSchema = new Schema({
    name: {
      type: String,
      minLength: 3,
      require: true
    },
    number: {
      type: String,
      minLength: 8,
      validate: {
        validator: (v) => {
          return /^\d{2,3}-\d+$/.test(v);
        }
      }
    }
  });

  personSchema.set("toJSON", {
    // the first argument of transform is the document being serialized, and the second is the object into which the document is serialized
    transform: (document, { _id, __v, ...ret }) => {
      ret.id = _id.toString();
      return ret;
    }
  });

  const Person = model("Person", personSchema);

  return Person;
}

export const Person = await generateModel();
