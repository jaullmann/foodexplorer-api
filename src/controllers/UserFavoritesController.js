const knex = require("../database/knex");
const AppError = require("../utils/AppError");


class UserFavoritesController {

    async create(request, response) {
        const { user_id, dish_id } = request.body;

        try {
          await knex("user_favorites").insert({
            user_id,
            dish_id          
          });                  
          
        } catch (e) {
          if (e.code === 'SQLITE_CONSTRAINT') {
            console.error('UNIQUE constraint violation, create request ignored');
          } else {
            throw new AppError(e.message)
          }
        }        

        return response.status(201).json();
    } 

    async index(request, response) {
      const { user_id, role } = request.body;
      
      let userFavoritesQuery = knex("user_favorites as uf")
        .select("uf.user_id", "uf.dish_id", "ds.title", "ds.category", "ds.image_file")
        .innerJoin("dishes as ds", "uf.dish_id", "ds.dish_id")

      if (role === 'customer') {
        userFavoritesQuery = userFavoritesQuery
          .where("uf.user_id", user_id)
          .orderBy("ds.title")
      } else {
        userFavoritesQuery = userFavoritesQuery
        .where("uf.user_id", ">", "0")
        .orderBy("uf.user_id", "ds.title")
      }

      const userFavorites = await userFavoritesQuery

      return response.status(201).json(userFavorites);
    }
       
    async update(request, response) {
      const { title, category, description, ingredients, price } = request.body;
      const { dish_id } = request.params;      
      
      await knex("dishes")
        .where("dish_id", dish_id)
        .update({
          title, 
          category, 
          description, 
          price,
          updated_at: knex.fn.now()
      });

      await knex("ingredients").where("dish_id", dish_id).delete();

      if (ingredients) {
        const ingredientsInsert = ingredients.map(ingredient => {
          return {
            dish_id: dish_id,
            name: ingredient
          }
        });

        await knex("ingredients").insert(ingredientsInsert);
      }

      return response.status(201).json();
    }    

    async delete(request, response) {
      const { dish_id } = request.params;  
      
      const ordersWithDish = await knex("orders_details").where("dish_id", dish_id).first();      


      // check if there is any previous order with the target dish; in this case, the dish is not deleted to preserve the correct
      // detail from its linked orders
      if (ordersWithDish) {
        await knex("dishes")
          .where("dish_id", dish_id)
          .update({ removed_at: knex.fn.now() });
      } else {
        // if the dish has never been sold, then the delete procedure is performed
        await knex("dishes").where("dish_id", dish_id).delete();
      }     

      return response.status(201).json();
    }    

}

module.exports = UserFavoritesController;