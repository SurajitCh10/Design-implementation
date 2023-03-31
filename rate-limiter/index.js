import express from "express";
import apiRouter from "./routes/index.js";

const app = express();
const PORT = 3000;

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

//default route
app.use((req, res) => {
  res.status(404).send({
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log("server running on port " + PORT);
});
