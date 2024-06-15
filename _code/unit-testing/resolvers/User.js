const db = require("./../db.js");

const User = {
  posts(parent) {
    return db.posts.filter((post) => {
      return post.author === parent.id;
    });
  },
};

module.exports = User;
