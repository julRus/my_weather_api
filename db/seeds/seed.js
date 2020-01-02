const { userData } = require("../data");

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const userInsertion = knex("my_weather_users")
        .insert(userData)
        .returning("*");
      return Promise.all([userInsertion]).then(([userTable]) => {});
    });
};
