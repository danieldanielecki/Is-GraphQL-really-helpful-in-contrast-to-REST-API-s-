import db from "../db.js";

const User = {
  posts(parent) {
    return db.posts.filter((post) => {
      return post.author === parent.id;
    });
  },
};

export { User as default };
