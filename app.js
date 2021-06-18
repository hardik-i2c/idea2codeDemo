require("dotenv/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");

const port = process.env.PROT || 8080;

// use cors and bodyparser

// For allow all the url
app.use(cors());

// For allow json  ata
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// connection with database

mongoose
  .connect(process.env.URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected with database.");
  })
  .catch((err) => {
    console.log(err);
  });

// init routers
const demoRouter = require("./routes/demo");

app.use("/public", express.static(`${__dirname}/public`));

// Use init routers
app.use(demoRouter);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () =>
  console.log(`Server is lising on http://127.0.0.1:${port}`)
);
