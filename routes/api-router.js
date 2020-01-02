const apiRouter = require("express").Router();
const { usersRouter } = require("../routes/users-router");

apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
