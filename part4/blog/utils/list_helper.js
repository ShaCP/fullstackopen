const dummy = (posts) => {
  return 1;
};

const totalLikes = (posts) => {
  const reducer = (totalLikes, { likes }) => {
    return (totalLikes += likes);
  };

  const total = posts.reduce(reducer, 0);

  return total;
};

const favoritePost = (posts) => {
  let mostLikes = 0;
  let mostLiked = null;

  posts.forEach((post) => {
    if (post.likes > mostLikes) {
      mostLikes = post.likes;
      mostLiked = post;
    }
  });

  return mostLiked;
};

const mostPosts = (posts) => {
  const postCountPerAuthor = {};

  posts.forEach((post) => {
    postCountPerAuthor[post.author] = postCountPerAuthor[post.author]
      ? ++postCountPerAuthor[post.author]
      : 1;
  });

  const authors = Object.keys(postCountPerAuthor);
  const postCounts = Object.values(postCountPerAuthor);
  const max = Math.max(...postCounts);
  const authorWithMostPosts = authors.find(
    (author) => postCountPerAuthor[author] === max
  );

  return {
    author: authorWithMostPosts,
    posts: max
  };
};

const mostLikes = (posts) => {
  const likeCountPerAuthor = {};

  posts.forEach(({ author, likes }) => {
    const currentCount = likeCountPerAuthor[author];
    likeCountPerAuthor[author] = (currentCount ?? 0) + likes;
  });

  const authors = Object.keys(likeCountPerAuthor);
  const likeCounts = Object.values(likeCountPerAuthor);
  const max = Math.max(...likeCounts);
  const authorWithMostLikes = authors.find(
    (author) => likeCountPerAuthor[author] === max
  );

  return {
    author: authorWithMostLikes,
    likes: max
  };
};

export default {
  dummy,
  favoritePost,
  totalLikes,
  mostPosts,
  mostLikes
};
