const apiRouter = require("express").Router();
const { usersRouter } = require("../routes/users-router");

apiRouter.use("/users", usersRouter);

const path = "not-a-path";

apiRouter.route(`/${path}`).get((req, res, next) => {
  res.status(404).json({ msg: `Sorry, path: ${path}, has not been found :(` });
});

module.exports = apiRouter;
