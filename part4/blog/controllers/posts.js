import express from "express";
import Post from "../models/post.js";
const postsRouter = express.Router();

postsRouter.get("/", async (request, response, next) => {
  const posts = await Post.find({});
  response.json(posts);
});

postsRouter.get("/:id", async (request, response, next) => {
  const posts = await Post.findById(request.params.id);
  response.json(posts);
});

postsRouter.post("/", async (request, response, next) => {
  const post = new Post(request.body);
  const result = await post.save();
  response.status(201).json(result);
});

postsRouter.delete("/:id", async (request, response, next) => {
  await Post.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

postsRouter.put("/:id", async (request, response, next) => {
  const post = request.body;
  const result = await Post.findByIdAndUpdate(request.params.id, post, {
    new: true
  });
  response.status(200).json(result);
});

export default postsRouter;
