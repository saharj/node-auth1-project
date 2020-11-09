const express = require("express");

// const SchemeRouter = require("./data/helpers/schemaRouter");

const server = express();

server.use(express.json());
// server.use("/api/recipes", SchemeRouter);

server.get("/", (req, res) => {
  res.send(`
      <h2>Let's write some middleware!</h2>
      <p>Here we are...</p>
      `);
});

module.exports = server;
