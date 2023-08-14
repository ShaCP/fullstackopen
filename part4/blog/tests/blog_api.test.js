import supertest from "supertest";
import app from "../app.js";
import db from "./db.js";
import helper from "./test_helper";

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

beforeEach(async () => {
  helper.addPosts();
});

afterEach(async () => {
  await db.clearDatabase();
});

test("posts are returned as json", async () => {
  await api
    .get("/api/posts")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all posts are returned", async () => {
  const response = await api.get("/api/posts");

  expect(response.body).toHaveLength(helper.getInitialPosts().length);
});

test("a specific post is within the returned posts", async () => {
  const response = await api.get("/api/posts");

  const titles = response.body.map((r) => r.title);

  expect(titles).toContain("The Tasimeter");
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

  const postsAtEnd = await helper.postsInDb();
  expect(postsAtEnd).toHaveLength(helper.getInitialPosts().length + 1);

  const titles = postsAtEnd.map((r) => r.title);
  expect(titles).toContain("My first post");
});

test("post without author is not added", async () => {
  const newPost = {
    title: "My first post",
    url: "https://www.hello.com",
    likes: 788
  };

  await api.post("/api/posts").send(newPost).expect(400);

  const postsAtEnd = await helper.postsInDb();

  expect(postsAtEnd).toHaveLength(helper.getInitialPosts().length);
});

test("post without title is not added", async () => {
  const newPost = {
    author: "Bob Smith",
    url: "https://www.hello.com",
    likes: 788
  };

  await api.post("/api/posts").send(newPost).expect(400);

  const postsAtEnd = await helper.postsInDb();

  expect(postsAtEnd).toHaveLength(helper.getInitialPosts().length);
});

test("a specific post can be viewed", async () => {
  const postsAtStart = await helper.postsInDb();

  const postToView = postsAtStart[0];

  const resultPost = await api
    .get(`/api/posts/${postToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(resultPost.body).toEqual(postToView);
});

test("a post can be removed", async () => {
  const postsAtStart = await helper.postsInDb();

  const postToRemove = postsAtStart[0];

  await api.delete(`/api/posts/${postToRemove.id}`).expect(204);

  const postsAtEnd = await helper.postsInDb();
  expect(postsAtEnd).toHaveLength(helper.getInitialPosts().length - 1);

  const titles = postsAtEnd.map((r) => r.content);
  expect(titles).not.toContain(postToRemove.title);
});

afterAll(async () => {
  await db.closeDatabase();
});
