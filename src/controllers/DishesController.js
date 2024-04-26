const knex = require("../database/knex");
const AppError = require("../utils/AppError");


class DishesController {
    async create(request, response) {
        const { title, category, description, ingredients, price } = request.body;
    
        const checkDishExists = await knex("dishes").where('title', title).first();
    
        if (checkDishExists) {
          throw new AppError("Já existe outro prato registrado com este nome.");
        }

        const [dish_id] = await knex("dishes").insert({
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
        
        return response.status(201).json();
    } 

    async show(request, response) {
      const { dish_id } = request.params;
      const dish = await knex("dishes").where("dish_id", dish_id).first();
      const ingredients = await knex("ingredients").where("dish_id", dish_id).orderBy("name");
      
      return response.status(201).json({
        ...dish,
        ingredients
      });
    }

    async index(request, response) {
      const { title, ingredients } = request.query;

      
    }
       
    async update(request, response) {
      const { title, category, description, ingredients, price } = request.body;
      const { dish_id } = request.params;
      const datetime = new Date();
      
      await knex("dishes").where("dish_id", dish_id).update({
        title, 
        category, 
        description, 
        price,
        updated_at: datetime
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
      await knex("dishes").where("dish_id", dish_id).delete();

      return response.status(201).json();
    }
    
}

module.exports = DishesController;