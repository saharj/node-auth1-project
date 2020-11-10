const express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("./usersModel");

const Router = express.Router();

Router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashed = bcrypt.hashSync(password, 10);
    // we will insert a record WITHOUT the raw password but the hash instead
    const user = { username, password: hashed };
    const addedUser = await Users.add(user);
    // send back the record to the client
    res.json(addedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

Router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username });

    if (user && bcrypt.compare(password, user.password)) {
      res.json({ message: "Successful login" });
    } else {
      res.status(401).json({ message: "Bad credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

Router.get("/users", (req, res) => {
  Users.find()
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json({ message: "Couldn't get users" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong" });
    });
});

module.exports = Router;
