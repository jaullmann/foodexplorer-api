exports.up = knex => knex.schema.createTable("users", t => {
  t.increments("user_id");
  t.string('name', 50).notNullable();
  t.string('email', 40).notNullable();
  t.string('password', 20).notNullable();
  t.string('role', 50).default("user");
  t.timestamp("created_at").default(knex.fn.now());
  t.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("users");