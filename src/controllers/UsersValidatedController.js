const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UsersValidatedController {
  async index(request, response) {    
    const { user } = request;

    const checkUserExists = await knex("users").where({ user_id: user.user_id });    

    if (checkUserExists.length === 0) {
      throw new AppError("Unauthorized", 401);
    }

    return response.status(200).json();
  }
}

module.exports = UsersValidatedController;