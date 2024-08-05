exports.up = knex => knex.schema.createTable("orders", t => {
  t.increments("order_id");
  t.integer('user_id').notNullable();  
  t.string('payment_method', 15).notNullable().default('credito');
  t.string('status', 30).notNullable().default('pendente');
  t.timestamp("ordered_at").defaultTo(null);
  t.timestamp("updated_at").defaultTo(null);
});

exports.down = knex => knex.schema.dropTable("orders");
