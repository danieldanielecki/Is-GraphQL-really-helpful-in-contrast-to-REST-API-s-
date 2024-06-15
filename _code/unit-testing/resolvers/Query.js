const db = require("./../db.js");

const Query = {
  dummy() {
    return {
      id: "1234",
      name: "Test",
      email: "foo@google.com",
    };
  },
  users() {
    return db.users;
  },
  posts() {
    return db.posts;
  },
};

module.exports = Query;
