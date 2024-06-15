const uuid = require("uuid");
const db = require("./../db.js");
const graphql = require("graphql");

const Mutation = {
  createUser(_parent, args) {
    const emailTaken = db.users.some((user) => user.email === args.data.email);

    if (emailTaken) {
      throw new graphql.GraphQLError("Email taken");
    }

    const user = {
      id: uuid.v4(),
      name: args.data.name,
      email: args.data.email,
      age: args.data.age,
    };

    db.users.push(user);

    return user;
  },
  deleteUser(_parent, args) {
    const userIndex = db.users.findIndex((user) => user.id === args.id);

    if (userIndex === -1) {
      throw new graphql.GraphQLError("User not found")();
    }

    const deletedUsers = db.users.splice(userIndex, 1);

    db.posts = db.posts.filter((post) => {
      const match = post.author === args.id;

      return !match;
    });

    return deletedUsers[0];
  },
  updateUser(_parent, args) {
    const { id, data } = args;
    const user = db.users.find((user) => user.id === id);

    if (!user) {
      throw new graphql.GraphQLError("User not found");
    }

    if (typeof data.email === "string") {
      const emailTaken = db.users.some((user) => user.email === data.email);

      if (emailTaken) {
        throw new graphql.GraphQLError("Email taken");
      }

      user.email = data.email;
    }

    if (typeof data.name === "string") {
      user.name = data.name;
    }

    if (typeof data.age !== "undefined") {
      user.age = data.age;
    }

    return user;
  },
};

module.exports = Mutation;
