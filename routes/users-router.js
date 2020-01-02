const usersRouter = require("express").Router();
const { getUsers, postUser } = require("../controllers/users");

usersRouter
  .route("/")
  .get(getUsers)
  .post(postUser);

module.exports = { usersRouter };
