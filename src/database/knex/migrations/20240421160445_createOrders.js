exports.up = knex => knex.schema.createTable("orders", t => {
  t.increments("order_id");
  t.integer('user_id').notNullable();
  
  t.enum('payment_method', ['credit', 'debit', 'pix', 'cash'], { useNative: true, enumName: "payment_methods" })
    .notNullable().default('credit');

  t.string("status", 15).default('pendente').notNullable();
  t.timestamp("ordered_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("orders");
