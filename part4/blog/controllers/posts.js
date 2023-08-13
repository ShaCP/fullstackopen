import express from "express";
import Post from "../models/post.js";
const postsRouter = express.Router();

postsRouter.get("/", async (request, response, next) => {
  try {
    const posts = await Post.find({});
    response.json(posts);
  } catch (error) {
    next(error);
  }
});

postsRouter.get("/:id", async (request, response, next) => {
  try {
    const posts = await Post.findById(request.params.id);
    response.json(posts);
  } catch (error) {
    next(error);
  }
});

postsRouter.post("/", async (request, response, next) => {
  try {
    const post = new Post(request.body);
    const result = await post.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

postsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Post.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

postsRouter.put("/:id", async (request, response, next) => {
  try {
    const post = request.body;
    const result = await Post.findByIdAndUpdate(request.params.id, post, {
      new: true
    });
    response.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export default postsRouter;
