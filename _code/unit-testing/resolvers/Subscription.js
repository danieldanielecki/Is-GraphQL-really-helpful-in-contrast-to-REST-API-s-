const graphqlYoga = require("graphql-yoga");

const pubSub = graphqlYoga.createPubSub();
const Subscription = {
  count: {
    subscribe() {
      let count = 0;

      setInterval(() => {
        count++;
        pubSub.publish("count", {
          count,
        });
      }, 1000);

      return pubSub.subscribe("count");
    },
  },
};

module.exports = Subscription;
