const knex = require("../database/knex");
const AppError = require("../utils/AppError");


class UsersCartsController {

    async create(request, response) {
        const { user_id, dish_id, dish_amount } = request.body;

        try {
          await knex("users_carts").insert({
            user_id,
            dish_id,
            dish_amount         
          });                  
          
        } catch (e) {
          if (e.code === 'SQLITE_CONSTRAINT') {
            console.error('UNIQUE constraint violation; dish_amount updated');
            await knex("users_carts")
              .where("user_id", user_id)
              .andWhere("dish_id", dish_id)
              .update({ dish_amount });            
          } else {
            throw new AppError(e.message);
          }
        }        

        return response.status(201).json();
    } 

    async index(request, response) {
      const { user_id, role } = request.body;
      
      let usersCartsQuery = knex("users_carts as uc")
        .select("uc.user_id", "uc.dish_id", "uc.dish_amount", "ds.title", "ds.category", "ds.image_file")
        .innerJoin("dishes as ds", "uc.dish_id", "ds.dish_id");

      if (role === 'customer') {
        usersCartsQuery = usersCartsQuery
          .where("uc.user_id", user_id)
          .orderBy("ds.title");
      } else {
        usersCartsQuery = usersCartsQuery
        .where("uc.user_id", ">", "0")
        .orderBy("uc.user_id", "ds.title");
      }

      const usersCarts = await usersCartsQuery;

      return response.status(201).json(usersCarts);
    }
       
    async update(request, response) {
      const { user_id, dishes_id, dishes_amount } = request.body;

      await knex("users_carts").where("user_id", user_id).delete();

      if (dishes_id) {
        const dishesWithAmountsInsert = dishes_id.map((dish_id, index) => {
          return {
            user_id: user_id,
            dish_id: dish_id,
            dish_amount: dishes_amount[index]
          }
        })

        await knex("users_carts").insert(dishesWithAmountsInsert);
      }

      return response.status(201).json();
    }    

    async delete(request, response) {
      const { user_id, dish_id } = request.body;  
      
      if (dish_id) {
        await knex("users_carts")
          .where("user_id", user_id)
          .andWhere("dish_id", dish_id)
          .delete();
      } else {
        await knex("users_carts")
          .where("user_id", user_id)
          .delete();
      }      

      return response.status(201).json();
    }    

}

module.exports = UsersCartsController;