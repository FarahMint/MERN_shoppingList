const express = require("express"); // backend framework
const mongoose = require("mongoose"); // ORM to interact with mongoDB
// const bodyParser = require("body-parser");
const path = require("path");
const items = require("./routes/api/items");
const config = require("config");

// - -> any request that go to api/items/*(anything) -> I want that to go to that file

//————INITIALIZE EXPRESS
const app = express();

//————BODYPARSER MIDDLEWARE
app.use(express.json());

//  ——————————DB CONFIG
// require key files the are in the config folder - all we want is the mongoURI
// const db = require("./config/keys").mongoURI;
const db = config.get("mongoURI");

// ————CONNECT TO MONGODB

mongoose
  .connect(process.env.MONGODB_URI || db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//— — —>  Use Routes :
app.use("/api/items", items);
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
//anything that goes to api/items should refer to the items var
//===>[ which is the file mentioned above  -> const items =require("./routes/api/items") ]

//Serve static folder if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    // load index.html
    // go to client/build/index.html
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//After connection to mongoDB need to be able to run server
//create var for port we are going to use - ->
const port = process.env.PORT || 5000;
//then want app to listen to that port  ->
app.listen(port, () => console.log(`Server started on ${port}`));
