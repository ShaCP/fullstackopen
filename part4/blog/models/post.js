import mongoose from "mongoose";
import config from "../utils/config.js";
import logger from "../utils/logger.js";
const { set, connect, Schema, model } = mongoose;

async function generateModel() {
  const url = config.MONGODB_URI;

  // https://mongoosejs.com/docs/faq.html#enable_debugging
  set("debug", true);
  // https://mongoosejs.com/docs/guide.html#strict
  set("strictQuery", false);

  logger.info("connecting to", url);

  try {
    await connect(url);
    logger.info("connected to MongoDB");
  } catch (error) {
    logger.error("error connecting to MongoDB:", error.message);
  }

  const postSchema = new Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  });

  postSchema.index({ title: 1, author: 1, url: 1 }, { unique: true });

  postSchema.set("toJSON", {
    // the first argument of transform is the document being serialized, and the second is the object into which the document is serialized
    transform: (document, { _id, __v, ...ret }) => {
      ret.id = _id.toString();
      return ret;
    }
  });

  const post = model("Post", postSchema);

  return post;
}

const Post = await generateModel();
export default Post;
