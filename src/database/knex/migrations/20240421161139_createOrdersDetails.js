exports.up = knex => knex.schema.createTable("orders_details", t => {
  t.increments("order_detail_id");
  t.integer('order_id').references('order_id').inTable('orders').onDelete('CASCADE');
  t.integer('dish_id').notNullable();  
  t.integer('dish_amount').notNullable();
  t.float('dish_price_paid', precision=2).notNullable();
});

exports.down = knex => knex.schema.dropTable("orders_details");