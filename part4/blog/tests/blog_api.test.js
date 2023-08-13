import supertest from "supertest";
import app from "../app.js";
import db from "./db.js";
import Post from "../models/post.js";

const api = supertest(app);

// you can run a single test like this:
// npm test -- -t 'when list has only one blog, equals the likes of that'

// you can run a single test file like this:
// npm test -- tests/blog_api.test.js

// The provided parameter can refer to the name of the test or the describe block.
// The parameter can also contain just a part of the name.
// The following command will run all of the tests that contain posts in their name:
// npm test -- -t posts

// beforeAll(async () => {
//   await connect();
// });

const getInitialPosts = () => [
  {
    title: "Theory of Relativity",
    author: "Albert Einstein",
    url: "https://www.einstein.com/relativity",
    likes: 15
  },
  {
    title: "The Tasimeter",
    author: "Thomas Edison",
    url: "https://www.edison.com/tasimeter",
    likes: 5
  }
];

const addPosts = async () => {
  try {
    const posts = getInitialPosts().map((obj) => {
      return new Post(obj);
    });
    await Post.insertMany(posts);
  } catch (error) {
    console.log(error);
  }
};

beforeEach(async () => {
  addPosts();
});

afterEach(async () => {
  await db.clearDatabase();
});

afterAll(async () => {
  await db.closeDatabase();
});

test("all posts are returned", async () => {
  const response = await api.get("/api/posts");

  expect(response.body).toHaveLength(2);
});

test("a specific post is within the returned posts", async () => {
  const response = await api.get("/api/posts");

  const titles = response.body.map((r) => r.title);

  expect(titles).toContain("The Tasimeter");
});

test("posts are returned as json", async () => {
  await api
    .get("/api/posts")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("a valid post can be added", async () => {
  const newPost = {
    title: "My first post",
    author: "Shafick Cure",
    url: "https://www.shafick.com",
    likes: 788
  };

  await api
    .post("/api/posts")
    .send(newPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/posts");

  const titles = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(getInitialPosts().length + 1);
  expect(titles).toContain("My first post");
});
