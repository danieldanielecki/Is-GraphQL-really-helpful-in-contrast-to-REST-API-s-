import { v4 as uuidv4 } from "uuid";
import db from "../db.js";
import { GraphQLError } from "graphql";

const Mutation = {
  createUser(_parent, args) {
    const emailTaken = db.users.some((user) => user.email === args.data.email);

    if (emailTaken) {
      throw new GraphQLError("Email taken");
    }

    const user = {
      id: uuidv4(),
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
      throw new GraphQLError("User not found")();
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
      throw new GraphQLError("User not found");
    }

    if (typeof data.email === "string") {
      const emailTaken = db.users.some((user) => user.email === data.email);

      if (emailTaken) {
        throw new GraphQLError("Email taken");
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

export { Mutation as default };
