const {
  fetchUsers,
  createUser,
  fetchUserByUsername
} = require("../models/users");

exports.getUsers = (req, res, next) => {
  fetchUsers().then(users => {
    res.status(200).send({ users });
  });
};

exports.postUser = (req, res, next) => {
  const { username, firstname, lastname, email, password, img_url } = req.body;
  createUser(username, firstname, lastname, email, password, img_url).then(
    user => {
      res.status(201).send({ user });
    }
  );
};

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username).then(user => {
    res.status(200).send({ user });
  });
};
