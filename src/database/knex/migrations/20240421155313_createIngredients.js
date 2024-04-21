exports.up = knex => knex.schema.createTable("ingredients", t => {
  t.increments("ingredient_id");
  t.integer('dish_id').references('dish_id').inTable('dishes').onDelete('CASCADE');
  t.string('name', 20).notNullable();
});

exports.down = knex => knex.schema.dropTable("ingredients");