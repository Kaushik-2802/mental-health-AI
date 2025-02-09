const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://tejasrinivassjps:HSlGQ55UW5viDJI4@cluster0.h3fsh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const messagesRouter = require("./routes/messages");
app.use("/api/messages", messagesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
