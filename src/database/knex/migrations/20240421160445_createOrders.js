exports.up = knex => knex.schema.createTable("orders", t => {
  t.increments("order_id");
  t.integer('user_id').notNullable();
  
  t.enum('payment_method', ['crédito', 'débito', 'pix', 'dinheiro'], { useNative: true, enumName: "payment_methods" })
    .notNullable().default('crédito');

  t.enum('status', ['pendente', 'preparando', 'entregue', 'cancelado'], { useNative: true, enumName: "status" })
  .notNullable().default('pendente');
  t.timestamp("ordered_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("orders");
