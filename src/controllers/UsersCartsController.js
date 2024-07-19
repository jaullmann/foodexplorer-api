const knex = require("../database/knex");
const AppError = require("../utils/AppError");


class UsersCartsController {

    async create(request, response) {
        const { dish_id, dish_amount } = request.body;
        const { user_id } = request.user; 

        try {
          await knex("users_carts").insert({
            user_id,
            dish_id,
            dish_amount         
          });            
          
        } catch (e) {
          if (e.code === 'SQLITE_CONSTRAINT') {
            console.log('Dish already on user cart; amount incremented');

            const prevAmount = await knex("users_carts")
              .select("dish_amount")
              .where("user_id", user_id)
              .andWhere("dish_id", dish_id)
              .first()                          
              
            await knex("users_carts")
              .where("user_id", user_id)
              .andWhere("dish_id", dish_id)
              .update({ 
                dish_amount: prevAmount.dish_amount + dish_amount 
              });            
          } else {
            throw new AppError(e.message);
          }
        }        

        return response.status(201).json();
    } 

    async index(request, response) {
      const { user_id, role } = request.user;
      
      let usersCartQuery = knex("users_carts as uc")
        .select("uc.user_id", "uc.dish_id", "uc.dish_amount", "ds.title", "ds.category", "ds.price as dish_price", "ds.image_file")
        .innerJoin("dishes as ds", "uc.dish_id", "ds.dish_id");

      if (role === 'customer') {
        usersCartQuery = usersCartQuery
          .where("uc.user_id", user_id)
          .orderBy("ds.title");
      } else {
        usersCartQuery = usersCartQuery
        .where("uc.user_id", ">", "0")
        .orderBy("uc.user_id", "ds.title");
      }

      const usersCart = await usersCartQuery;

      return response.status(201).json(usersCart);
    }
       
    async update(request, response) {
      const { dishes_id, dishes_amount } = request.body;
      const { user_id } = request.user; 

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
      const { dish_id } = request.body;
      const { user_id } = request.user;   
      
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