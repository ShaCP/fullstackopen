import Post from "../models/post.js";

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

const nonExistingId = async () => {
  const post = new Post({
    title: "willremovethissoon",
    author: "willremovethissoon"
  });
  await post.save();
  await post.deleteOne();

  // we are saving it without doing a post req so we need to do this
  return post._id.toString();
};

const postsInDb = async () => {
  const posts = await Post.find({});
  // we do this to make posts like how they are in the response
  return posts.map((post) => post.toJSON());
};

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

export default {
  getInitialPosts,
  nonExistingId,
  postsInDb,
  addPosts
};
