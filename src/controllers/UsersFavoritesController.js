const knex = require("../database/knex");
const AppError = require("../utils/AppError");


class UsersFavoritesController {

    async create(request, response) {
        const { user_id, dish_id } = request.body;

        try {
          await knex("users_favorites").insert({
            user_id,
            dish_id          
          });                  
          
        } catch (e) {
          if (e.code === 'SQLITE_CONSTRAINT') {
            console.error('UNIQUE constraint violation; create request ignored');
          } else {
            throw new AppError(e.message);
          }
        }        

        return response.status(201).json();
    } 

    async index(request, response) {
      const { user_id, role } = request.body;
      
      let usersFavoritesQuery = knex("users_favorites as uf")
        .select("uf.user_id", "uf.dish_id", "ds.title", "ds.category", "ds.image_file")
        .innerJoin("dishes as ds", "uf.dish_id", "ds.dish_id");

      if (role === 'customer') {
        usersFavoritesQuery = usersFavoritesQuery
          .where("uf.user_id", user_id)
          .orderBy("ds.title");
      } else {
        usersFavoritesQuery = usersFavoritesQuery
        .where("uf.user_id", ">", "0")
        .orderBy("uf.user_id", "ds.title");
      }

      const usersFavorites = await usersFavoritesQuery;

      return response.status(201).json(usersFavorites);
    }
       
    async update(request, response) {
      const { user_id, dishes_id } = request.body;

      await knex("users_favorites").where("user_id", user_id).delete();

      if (dishes_id) {
        const dishesInsert = dishes_id.map(dish => {
          return {
            user_id: user_id,
            dish_id: dish
          }
        })

        await knex("users_favorites").insert(dishesInsert);
      }

      return response.status(201).json();
    }    

    async delete(request, response) {
      const { user_id, dish_id } = request.body;  
      
      await knex("users_favorites")
        .where("user_id", user_id)
        .andWhere("dish_id", dish_id)
        .delete();

      return response.status(201).json();
    }    

}

module.exports = UsersFavoritesController;