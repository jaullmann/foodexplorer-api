exports.up = knex => knex.schema.createTable("users_carts", t => {
  t.integer('user_id').references('user_id').inTable('users').onDelete('CASCADE');
  t.integer('dish_id').references('dish_id').inTable('dishes').onDelete('CASCADE');
  t.integer('dish_amount').notNullable();

  t.primary(['dish_id', 'user_id'])
});

exports.down = knex => knex.schema.dropTable("users_carts");