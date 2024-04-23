const knex = require("../database/knex");
const AppError = require("../utils/AppError");


class DishesController {
    async create(request, response) {
        const { name, email, password } = request.body;
    
        const checkUserExists = await knex("users").where('email', email);
    
        if (checkUserExists.length > 0) {
          throw new AppError("Este e-mail já está cadastrado.");
        }
    }   


}

module.exports = DishesController;