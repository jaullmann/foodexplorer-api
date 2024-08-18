const knex = require("../database/knex");
const AppError = require("../utils/AppError");


class DishesController {

    async create(request, response) {
        const { title, category, description, ingredients, price } = request.body;
        const { role } = request.user;

        if (role !== 'admin') {
          throw new AppError("Unauthorized", 401);
        }
    
        const checkDishExists = await knex("dishes").where('title', title).first();
    
        if (checkDishExists) {
          throw new AppError("Já existe outro prato registrado com este nome.");
        }
        
        const [ dish_id ] = await knex("dishes").insert({
          title,
          category,
          description, 
          price
        })

        if (ingredients.length > 0) {
          const ingredientsInsert = ingredients.map(ingredient => {
            return {
              dish_id,
              name: ingredient
            }
          });
          await knex("ingredients").insert(ingredientsInsert);
        }
        
        return response.status(201).json({ dish_id });
    } 

    async show(request, response) {
      const { dish_id } = request.params;
      const dish = await knex("dishes").where("dish_id", dish_id).first();

      if (!dish) {
        return response.status(201).json()
      }

      const ingredients = await knex("ingredients")
        .select("name")
        .where({"dish_id": dish_id})
        .orderBy("name")
        .pluck("name");
      
      return response.status(201).json({
        ...dish,
        ingredients
      });
    }

    async index(request, response) {
      const key = request.query?.search_key ?? "";
      const words = key.split(/\s+/); 

      let dishes = [];
      const dishIds = new Set();
    
      for (const word of words) {
        const results = await knex("dishes as ds")
          .distinct("ds.*")
          .innerJoin("ingredients as ig", "ds.dish_id", "ig.dish_id")
          .where(builder => {
            builder.whereLike("ds.title", `%${word.toLowerCase()}%`)
              .orWhereLike("ds.description", `%${word.toLowerCase()}%`)
              .orWhereLike("ig.name", `%${word.toLowerCase()}%`);
          })
          .whereNull("ds.removed_at") // filter applied to prevent returning dishes that have already been removed
          .orderBy("ds.title")
          .groupBy("ds.dish_id")
          .select("ds.*");
    
        results.forEach(dish => {
          if (!dishIds.has(dish.dish_id)) {
            dishIds.add(dish.dish_id);
            dishes.push(dish);
          }
        });
      }
      
      const dishesWithIngredients = await Promise.all(dishes.map(async dish => {
        const ingredients = await knex("ingredients")
          .select("name")
          .where("dish_id", dish.dish_id)
          .pluck("name");
                
        return { ...dish, ingredients };
      }));      
      
      return response.status(201).json(dishesWithIngredients);
    }
       
    async update(request, response) {
      const { title, category, description, ingredients, price, image_file } = request.body;
      const { dish_id } = request.params;
      const { role } = request.user;

      if (role !== 'admin') {
        throw new AppError("Unauthorized", 401);
      }     
            
      await knex("dishes")
        .where("dish_id", dish_id)
        .update({
          title, 
          category, 
          description, 
          price,
          updated_at: knex.fn.now(),
          image_file
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
      const { role } = request.user;

      if (role !== 'admin') {
        throw new AppError("Unauthorized", 401);
      }  
      
      const ordersWithDish = await knex("orders_details").where("dish_id", dish_id).first();     

      // check if there is any previous order with the target dish; in this case, the dish won't be deleted to preserve the correct
      // detail from its linked orders
      if (ordersWithDish) {
        await knex("dishes")
          .where("dish_id", dish_id)
          .update({ removed_at: knex.fn.now() });
      } else {
        // if the dish has never been sold, then the delete procedure is fully performed
        await knex("dishes").where("dish_id", dish_id).delete();
      }     

      return response.status(201).json();
    }    

} 

module.exports = DishesController;