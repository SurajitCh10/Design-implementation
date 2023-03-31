import express from "express";
import mongoose from "mongoose";

const app = express();

mongoose.connect("mongodb://localhost:27017/count_visits", {
  useNewUrlParser: true,
});

const visitorSchema = new mongoose.Schema({
  name: String,
  count: Number,
});

const Visitor = mongoose.model("Visitor", visitorSchema);

app.get("/", async (req, res) => {
  const visitors = await Visitor.findOne({ name: "localhost" });

  if (visitors == null) {
    const beginCount = new Visitor({
      name: "localhost",
      count: 1,
    });

    beginCount.save();
    res.send(`<h2>Counter` + 1 + "</h2>");
    console.log("First visitor");
  } else {
    visitors.count += 1;
    visitors.save();
    res.send(`<h2>Counter` + visitors.count + "</h2>");
    console.log("visitor arrived", visitors.count);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
