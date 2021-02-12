const db = require("../data/db-config");

function find() {
  return db("users").select("id", "username").orderBy("id");
}

function findBy(filter) {
  return db("users").where(filter);
}

function findById(id) {
  return db("users").where({ id }).first();
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");
    return findById(id);
  } catch (err) {
    Promise.reject(new Error(err.message));
  }
}

module.exports = { findById, add, findBy, find };
