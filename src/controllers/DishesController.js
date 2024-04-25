const knex = require("../database/knex");
const AppError = require("../utils/AppError");


class DishesController {
    async create(request, response) {
        const { title, category, description, ingredients, price } = request.body;
    
        const checkDishExists = await knex("dishes").where('title', title).first();
    
        if (checkDishExists) {
          throw new AppError("Já existe outro prato cadastrado com este nome.");
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
    
}

module.exports = DishesController;