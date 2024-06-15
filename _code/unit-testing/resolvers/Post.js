const db = require("./../db.js");

const Post = {
  author(parent) {
    return db.users.find((user) => {
      return user.id === parent.author;
    });
  },
};

module.exports = Post;
