const express = require("express");
const cors = require("cors");
require("dotenv").config();
const URI = process.env.URI;
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");

mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  (err) => {
    if (!err) {
      console.log("Connect Just success");
    }
  }
);

const app = express();

app.use(cors());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.json());

app.get("/todos/get-all", (req, res, next) => {
  res.status(200).json({ data: "hello" });
});

app.post("/todos/add-todo", async (req, res, next) => {
  console.log(req.body);

  mongoose.res.status(200).json({ status: "add todo successfully" });
});

app.listen(PORT, () => console.log(`App is running at ${PORT} `));
