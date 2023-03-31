const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const redis = require("redis");

const app = express();

const client = redis.createClient(6379);
client.on("error", (err) => {
  console.log(err);
});

app.get("/photos", (req, res) => {
  const photosRedisKey = "user:photos";
  return client.get(photosRedisKey, (err, photos) => {
    if (photos) {
      //photos exists in cache
      return res.json({ source: "cache", data: JSON.stringify(photos) });
    } else {
      //if no photo in cache
      fetch("https://jsonplaceholder.typicode.com/photos")
        .then((res) => res.json())
        .then((photos) => {
          //save to redis & expire in 3600 seconds
          client.setex(photosRedisKey, 3600, JSON.stringify(photos));
          return res.json({ source: "api", data: photos });
        })
        .catch((error) => {
          console.log(error);
          return res.json(error.toString());
        });
    }
  });
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
