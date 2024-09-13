const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejsmate = require("ejs-mate");
const Task = require("./routes/task");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("ejs", ejsmate);

const dbUrl = "mongodb://127.0.0.1:27017/todo_app";
main()
  .then(() => {
    console.log("Connected to the DataBase");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(dbUrl);
}

app.use("/", Task);

app.all("*", (req, res, next) => {
  res.send("404 Page Not Found");
});

let port = 8080;
app.listen(port, () => {
  console.log(`Server Start at ${port}`);
});
