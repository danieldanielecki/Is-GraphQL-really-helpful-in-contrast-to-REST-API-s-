import db from "../db.js";

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

export { Query as default };
