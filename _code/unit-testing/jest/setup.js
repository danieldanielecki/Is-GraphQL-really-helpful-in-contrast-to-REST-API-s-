import server from "./../../graphql-basics/src/index.js";

export default async () => {
  global.httpServer = await server;
};
