import { expect, describe, test, beforeEach } from "@jest/globals";
import listHelper from "../utils/list_helper.js";

// you can run a single test like this:
// npm test -- -t 'when list has only one blog, equals the likes of that'

describe("dummy", () => {
  test("dummy returns one", () => {
    // arrange
    const posts = [];

    // act
    const result = listHelper.dummy(posts);

    // assert
    expect(result).toBe(1);
  });
});

// arrange
const samplePosts = {
  getPosts: () => [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }
  ],
  get many() {
    return this.getPosts();
  },
  get single() {
    return [this.getPosts()[0]];
  },
  get mostLiked() {
    return this.getPosts()[2];
  }
};

describe("total likes", () => {
  test("of a list with several posts is the sum of the likes of all posts", () => {
    // arrange
    const posts = samplePosts.many;

    // act
    const result = listHelper.totalLikes(posts);

    // assert
    expect(result).toBe(36);
  });

  test("of an empty list is 0", () => {
    // arrange
    const posts = [];

    // act
    const result = listHelper.totalLikes(posts);

    // assert
    expect(result).toBe(0);
  });

  test("of a list with one post is the same as the likes of that one post", () => {
    // arrange
    const posts = samplePosts.single;
    const numberOfLikes = posts[0].likes;

    // act
    const result = listHelper.totalLikes(posts);

    // assert
    expect(result).toBe(numberOfLikes);
  });
});

describe("favorite post", () => {
  test("is the one with most likes", () => {
    // arrange
    const posts = samplePosts.many;
    const postWithMostLikes = samplePosts.mostLiked;

    // act
    const result = listHelper.favoritePost(posts);

    // assert
    expect(result).toEqual(postWithMostLikes);
  });
});

describe("most posts", () => {
  test("returns author with most posts and their number of posts", () => {
    // arrange
    const posts = samplePosts.many;
    const authorWithMostPosts = "Robert C. Martin";
    const numberOfPosts = 3;

    // act
    const result = listHelper.mostPosts(posts);

    // assert
    expect(result.author).toBe(authorWithMostPosts);
    expect(result.posts).toBe(numberOfPosts);
  });
});

describe("most likes", () => {
  test("returns author with most likes and their number of likes", () => {
    // arrange
    const posts = samplePosts.many;
    const authorWithMostLikes = "Edsger W. Dijkstra";
    const numberOfLikes = 17;

    // act
    const result = listHelper.mostLikes(posts);

    // assert
    expect(result.author).toBe(authorWithMostLikes);
    expect(result.likes).toBe(numberOfLikes);
  });
});
