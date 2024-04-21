exports.up = knex => knex.schema.createTable("user_favorites", t => {
  t.integer('user_id').references('user_id').inTable('users').onDelete('CASCADE');
  t.integer('dish_id').references('dish_id').inTable('dishes').onDelete('CASCADE');
});

exports.down = knex => knex.schema.dropTable("user_favorites");