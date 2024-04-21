exports.up = knex => knex.schema.createTable("orders", t => {
  t.increments("order_id");
  t.integer('user_id').notNullable();
  t.string("payment_method", 10).default('card').notNullable();
  t.string("status", 15).default('pendente').notNullable();
  t.timestamp("ordered_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("orders");
