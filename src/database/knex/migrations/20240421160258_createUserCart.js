exports.up = knex => knex.schema.createTable("user_cart", t => {
  t.integer('user_id').references('user_id').inTable('users').onDelete('CASCADE');
  t.integer('dish_id').references('dish_id').inTable('dishes').onDelete('CASCADE');
  t.integer('dish_amount').notNullable();
});

exports.down = knex => knex.schema.dropTable("user_cart");