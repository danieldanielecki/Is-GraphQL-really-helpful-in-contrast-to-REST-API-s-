import { createPubSub } from "graphql-yoga";

const pubSub = createPubSub();
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

export { Subscription as default };
