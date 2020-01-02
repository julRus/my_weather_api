exports.up = function(knex) {
  return knex.schema.createTable("my_weather_users", usersTable => {
    usersTable
      .string("username")
      .notNullable()
      .primary()
      .unique();
    usersTable.string("firstname").notNullable();
    usersTable.string("lastname").notNullable();
    usersTable.string("email").notNullable();
    usersTable.string("password").notNullable();
    usersTable.string("img_url").notNullable();
    usersTable.timestamp("joined_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("my_weather_users");
};
