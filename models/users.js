const connection = require("../db/connection");

exports.fetchUsers = () => {
  return connection("my_weather_users")
    .returning("*")
    .then(res => {
      return res;
    });
};

exports.createUser = (user, first, last, e, pass, img) => {
  return connection("my_weather_users")
    .insert({
      username: user,
      firstname: first,
      lastname: last,
      email: e,
      password: pass,
      img_url: img
    })
    .returning("*")
    .then(res => {
      return res[0];
    });
};
