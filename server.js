const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const bodyParser = require("body-parser");
// const routes = require("./routes");
require("dotenv").config();

// let Event = require("./models/Event");

app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

// app.get("/api/config", (req, res) => {
//   res.json({ success: true });
// });

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*"),
    (req, res) => {
      res.sendFile(path.join(__dirname, "./client/build/index.html"));
    };
}

// app.use(routes);

mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/john-sean-games",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to the database");
  })
  .catch((err) => {
    console.log("unable to connect to the database");
    console.log(err);
  });
const connection = mongoose.connection;

app.listen(PORT, () => {
  console.log(`Epxress server running on http://localhost:${PORT}`);
});
