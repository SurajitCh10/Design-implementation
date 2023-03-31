const redis = require("redis");
const publisher = redis.createClient();

publisher.publish(
  "notification",
  "{'message':'Hello world from publisher'}",
  function () {
    console.log("message sent");
    process.exit(0);
  }
);
