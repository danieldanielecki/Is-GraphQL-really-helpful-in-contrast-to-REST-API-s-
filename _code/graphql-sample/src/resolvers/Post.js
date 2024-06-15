import db from "../db.js";

const Post = {
  author(parent) {
    return db.users.find((user) => {
      return user.id === parent.author;
    });
  },
};

export { Post as default };
