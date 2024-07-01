import server from "./../../graphql-sample/src/index.js";

export default async () => {
  global.httpServer = await server;
};
