const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

mongoose.connect(
  "mongodb+srv://ayrton:ayrton@cluster0-xgqu3.gcp.mongodb.net/database?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(express.json());
app.use(routes);

app.listen(2222);
