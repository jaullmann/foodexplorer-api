exports.up = knex => knex.schema.createTable("dishes", t => {
  t.increments("dish_id");
  t.string('title', 40).notNullable();
  t.text('description', 300).notNullable();
  t.string('category', 20).default("refeição").notNullable();
  t.string('image_file');
  t.float('price', precision=2).notNullable();
  t.timestamp('created_at').default(knex.fn.now());
  t.timestamp('updated_at').default(knex.fn.now());
  t.timestamp('removed_at');
});

exports.down = knex => knex.schema.dropTable("dishes");