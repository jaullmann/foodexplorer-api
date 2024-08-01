exports.up = knex => knex.schema.createTable("users", t => {
  t.increments("user_id");
  t.string('name', 80).notNullable();
  t.string('email', 40).notNullable();
  t.string('password', 20).notNullable();

  t.enum('role', ['admin', 'sales', 'customer'], { useNative: true, enumName: "roles" })
    .notNullable().default('customer');

  t.timestamp("created_at").default(knex.fn.now());
  t.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("users");