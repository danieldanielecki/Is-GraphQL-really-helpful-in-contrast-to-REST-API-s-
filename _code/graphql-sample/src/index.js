import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";
import { useDisableIntrospection } from "@envelop/disable-introspection";
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import Subscription from "./resolvers/Subscription.js";
import User from "./resolvers/User.js";
import Post from "./resolvers/Post.js";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync(
      path.join(__dirname, "./", "src", "schema.graphql"),
      "utf8"
    ),
    resolvers: {
      Query,
      Mutation,
      Subscription,
      User,
      Post,
    },
  }),
  // plugins: [useDisableIntrospection()],
  // plugins: [
  //   useDisableIntrospection({
  //     isDisabled: (request) =>
  //       request.headers.get("x-allow-introspection") !== "secret-access-key",
  //   }),
  // ],
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});

export { server as default };
