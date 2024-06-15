const graphql = require("graphql");
const graphqlYoga = require("graphql-yoga");
const executorHttp = require("@graphql-tools/executor-http");
const Query = require("./../resolvers/Query.js");
const Mutation = require("./../resolvers/Mutation.js");
const Subscription = require("./../resolvers/Subscription.js");
const User = require("./../resolvers/User.js");
const Post = require("./../resolvers/Post.js");
const fs = require("fs");
const path = require("path");

const yoga = graphqlYoga.createYoga({
  schema: graphqlYoga.createSchema({
    typeDefs: fs.readFileSync(
      path.join(__dirname, "..", "./", "src", "schema.graphql"),
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
});

const executor = executorHttp.buildHTTPExecutor({
  fetch: yoga.fetch,
});

it("should run a dummy query", async () => {
  const result = await executor({
    document: graphql.parse(/* GraphQL */ `
      query {
        dummy {
          id
          name
          email
        }
      }
    `),
  });

  console.log("dummy query: ", JSON.stringify(result));

  // toEqual/toStrictEqual fixes toBe's: "Received: serializes to the same string" (https://stackoverflow.com/questions/56839801/jest-js-error-received-serializes-to-the-same-string)
  expect(result.data?.dummy).toEqual({
    id: "1234",
    name: "Test",
    email: "foo@google.com",
  });
});

it("should run a createUser mutation", async () => {
  const result = await executor({
    document: graphql.parse(/* GraphQL */ `
      mutation {
        createUser(
          data: { name: "Daniel", email: "foo@example.com", age: 25 }
        ) {
          id
          email
          age
        }
      }
    `),
  });

  console.log("createUser mutation: ", JSON.stringify(result));

  // Will not work, because ID is always different with every mutation.
  // expect(result.data?.createUser).toEqual({
  //   id: "306a699b-b1a6-4d3a-a4af-4b17dd53c659",
  //   email: "foo@example.com",
  //   age: 25,
  // });

  expect(result.data?.createUser.email).toEqual("foo@example.com");
  expect(result.data?.createUser.age).toEqual(25);
});

it("should run a count subscription", async () => {
  const result = await executor({
    document: graphql.parse(/* GraphQL */ `
      subscription {
        count
      }
    `),
  });

  let iterationCounter = 0;
  for await (const value of result) {
    console.log("count subscription: ", JSON.stringify(value));

    if (iterationCounter === 0) {
      expect(value.data?.count).toEqual(1);
      iterationCounter++;
    } else if (iterationCounter === 1) {
      expect(value.data?.count).toEqual(2);
      break;
    } else {
      throw new Error("Expected only two iterations");
    }
  }
});
