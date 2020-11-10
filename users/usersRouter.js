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
    console.log(user);
    res.json(addedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = Router;
