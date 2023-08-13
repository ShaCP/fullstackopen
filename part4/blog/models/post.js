import mongoose from "mongoose";
const { Schema, model } = mongoose;

async function generateModel() {
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
